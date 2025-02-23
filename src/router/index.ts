import { createRouter, createWebHistory } from 'vue-router';

import Results from '../views/Results.vue';
import Form from '../views/Form.vue';
import Calculator from '../views/Calculator.vue';

const routes = [
  { path: '/', redirect: '/results' },
  { path: '/results', component: Results },
  { path: '/form', component: Form },
  { path: '/calculator', component: Calculator },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
