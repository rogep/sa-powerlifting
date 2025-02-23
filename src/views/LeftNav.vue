<template>
  <div
    :class="[
      'w-55 h-full fixed top-15 transform transition-transform duration-300',
      isNavVisible ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <nav class="p-4 mt-[50px]">
      <ul>
        <li 
          v-for="(item, index) in menuItems"
          :key="index"
          class="mb-4">
          <PrimeIcon :icon="item.icon"/>
          
          <router-link
            :to="getRoute(item.text)"
            class="header small hover:text-gray-300 dark:hover:text-gray-300 ml-2"
          >
            {{ item.text }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import PrimeIcon from "../components/PrimeIcon.vue";

const props = defineProps<{
  isNavVisible: boolean;
  menuItems: { icon: string; text: string}[];
}>();

const getRoute = (text: string): string => {
  switch (text) {
    case 'Results':
      return '/results';
    case 'Gyms':
      return '/gyms';
    case 'Coaches':
      return '/coaches';
    case 'Competitions':
      return '/competitions';
    case 'Calculators':
      return '/calculator';
    case 'AI Assist (BETA)':
      return '/form'; 
    default:
      return '/';
  }
};
</script>
