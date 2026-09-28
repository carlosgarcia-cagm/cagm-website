#!/usr/bin/env bash
# Install Playwright browsers for the current version.
#
# On Linux (CI): delegates to `playwright install`, which works out of the box.
# On macOS: downloads with curl and extracts with Python to avoid a macOS 15+
# Gatekeeper bug where node.js's extraction hangs indefinitely on unsigned ARM64
# binaries. After extraction the binary is ad-hoc signed so future launches don't
# trigger OCSP verification.
#
# Usage: bun run install:browsers
set -euo pipefail

PLAYWRIGHT="node_modules/.bin/playwright"

if [[ "$(uname)" != "Darwin" ]]; then
  "$PLAYWRIGHT" install --with-deps chromium-headless-shell
  exit 0
fi

echo "macOS detected — using curl + Python extraction to avoid Gatekeeper hang"

# Ask playwright for the download URL and install path for the current version.
DRY_RUN=$("$PLAYWRIGHT" install --dry-run chromium-headless-shell 2>&1)

DOWNLOAD_URL=$(echo "$DRY_RUN" | grep "Download url:" | head -1 | awk '{print $NF}')
INSTALL_PATH=$(echo "$DRY_RUN" | grep "Install location:" | head -1 | awk '{print $NF}')

if [[ -z "$DOWNLOAD_URL" || -z "$INSTALL_PATH" ]]; then
  echo "Could not determine download URL or install path from playwright." >&2
  echo "Output was:" >&2
  echo "$DRY_RUN" >&2
  exit 1
fi

ZIP_FILE=$(mktemp /tmp/pw-headless-shell-XXXXXX.zip)
trap 'rm -f "$ZIP_FILE"' EXIT

echo "Downloading: $DOWNLOAD_URL"
curl -L --progress-bar "$DOWNLOAD_URL" -o "$ZIP_FILE"

echo "Extracting to: $INSTALL_PATH"
rm -rf "$INSTALL_PATH"
mkdir -p "$INSTALL_PATH"

python3 - "$ZIP_FILE" "$INSTALL_PATH" <<'PYEOF'
import sys, zipfile, os, stat

zip_path, dest = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(zip_path, 'r') as z:
    for member in z.namelist():
        z.extract(member, dest)
        info = z.getinfo(member)
        perm = (info.external_attr >> 16) & 0xFFFF
        if perm:
            os.chmod(os.path.join(dest, member), perm)
print(f"Extracted {len(z.namelist())} files")
PYEOF

# Ad-hoc sign all executables so Gatekeeper doesn't block future launches.
echo "Signing binaries..."
find "$INSTALL_PATH" -type f -perm +111 | while read -r bin; do
  codesign --sign - --force "$bin" 2>/dev/null || true
done

echo "Done. Playwright browsers ready at $INSTALL_PATH"
