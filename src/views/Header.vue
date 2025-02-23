<template>
    <header class="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-10">
      <div class="flex items-center justify-between">
        <!-- Left Side: Title & Caret -->
        <div class="flex items-center">
          <h1 class="headline-5 bold large">{{ title }}</h1>
          <div @click="toggleNav" class="cursor-pointer ml-4">
            <div :class="['transform transition-transform duration-300', displayNav ? '-rotate-180' : 'rotate-0']">
              <i class="pi pi-caret-left"></i>
            </div>
          </div>
        </div>

        <!-- Right Side: Sun & GitHub Icons -->
        <div class="flex items-center space-x-4 pr-2">
          <i @click="toggleDarkMode" :class="['pi cursor-pointer text-[20px]', isDarkMode ? 'pi-sun' : 'pi-moon']"></i>
          <a href="https://github.com/rogep" target="_blank" rel="noopener noreferrer">
            <i class="cursor-pointer pi pi-github text-[20px]"></i>
          </a>
        </div>
      </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface HeaderProps {
  title: string
}

const props = defineProps<HeaderProps>();
const emit = defineEmits<{
  (event: 'update:displayNav', value: boolean): void;
}>();

const displayNav = ref<boolean>(true);
const isDarkMode = ref<boolean>(true);

function toggleDarkMode() {
  isdarkmode.value = !isDarkMode.value;
}

function toggleNav() {
  displayNav.value = !displayNav.value;
  emit('update:displayNav', displayNav.value);
}
</script>
