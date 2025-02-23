<template>
  <i :class="['pi', `pi-${icon}`]" aria-hidden="true"></i>
</template>

<script setup lang="ts">

const props = defineProps<{
  icon: string;
}>();
</script>
