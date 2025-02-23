<template>
  <div class="flex h-screen">
    <FixedHeaderWithNav title="SA POWERLIFTING" :isNavVisible="displayNav" v-model:displayNav="displayNav"/>
    <div class="flex-1">
      <router-view :displayNav="displayNav"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FixedHeaderWithNav from './FixedHeaderWithNav.vue';

const displayNav = ref(true);
</script>
