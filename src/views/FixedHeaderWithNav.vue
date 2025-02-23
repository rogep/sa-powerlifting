<template>
  <header class="dark:bg-surface-900 navigation p-4 fixed top-0 left-0 w-full z-10">
    <div class="flex items-center justify-between">
      <!-- Left Side: Title & Caret -->
      <div class="flex items-center">
        <h1 class="headline-5 bold large dark:text-white">
          {{ title }} </h1>
        <div @click="toggleNav" class="cursor-pointer ml-4">
          <div :class="['transform transition-transform duration-300', displayNav ? '-rotate-180' : 'rotate-0 mt-[3px]']">
            <i class="pi pi-caret-left"></i>
          </div>
        </div>
      </div>

      <!-- Right Side: Sun & GitHub Icons -->
      <div class="flex items-center space-x-4 pr-2">
        <i @click="toggleDark()" :class="['pi cursor-pointer text-[20px]', isDark ? 'pi-sun' : 'pi-moon']"></i>
        <a href="https://github.com/rogep" target="_blank" rel="noopener noreferrer">
          <i class="cursor-pointer pi pi-github text-[20px] mt-[3px]"></i>
        </a>
      </div>
    </div>
  </header>

  <LeftNav class="dark:bg-surface-900 navigation" :isNavVisible="displayNav" :menuItems="menuItems"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDark, useToggle } from "@vueuse/core";
import Header from "./Header.vue";
import LeftNav from "./LeftNav.vue";

interface Props {
  title: string
  isNavVisible: boolean
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: 'update:displayNav', value: boolean): void;
}>();

const displayNav = ref<boolean>(true);
const isDark = useDark();
const toggleDark = useToggle(isDark);

function toggleNav() {
  displayNav.value = !displayNav.value;
  emit('update:displayNav', displayNav.value);
}

const menuItems = [
  { icon: 'chart-bar', text: 'Results' },
  // { icon: 'home', text: 'Gyms' },
  // { icon: 'user', text: 'Coaches' },
  // { icon: 'trophy', text: 'Competitions' },
  { icon: 'calculator', text: 'Calculators' },
  { icon: 'android', text: 'AI Assist (BETA)' }
];
</script>
