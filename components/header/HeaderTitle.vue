<template>
  <NuxtLink :to="localePath('/')" class="flex items-center gap-3 shrink-0">
    <img src="/logo.png" alt="" class="h-10 w-10 rounded-full" width="40" height="40" />
    <span class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
      {{ PROFILE.name }}
    </span>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { PROFILE } from '~/utils/profile'

const localePath = useLocalePath()
</script>
