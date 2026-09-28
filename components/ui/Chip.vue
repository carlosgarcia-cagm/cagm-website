<template>
  <span
    :class="[
      'inline-flex items-center font-medium transition-colors duration-200',
      chipClasses
    ]"
    :style="chipStyle">
    <slot />
  </span>
</template>

<script lang="ts" setup>
interface Props {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'custom'
  color?: string
  background?: string
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  color: undefined,
  background: undefined,
  size: 'md',
  rounded: 'full'
})

const chipClasses = computed(() => {
  const variants = {
    default: 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    custom: ''
  }

  if (props.variant === 'custom' && props.color && props.background) {
    return `${getSizeClasses()} ${getRoundedClasses()}`
  }

  return `${variants[props.variant]} ${getSizeClasses()} ${getRoundedClasses()}`
})

const getSizeClasses = () => {
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5'
  }
  return sizes[props.size]
}

const getRoundedClasses = () => {
  const rounded = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
  return rounded[props.rounded]
}

const chipStyle = computed(() => {
  if (props.variant === 'custom' && props.color && props.background) {
    return {
      color: props.color,
      backgroundColor: props.background
    }
  }
  return {}
})
</script>
