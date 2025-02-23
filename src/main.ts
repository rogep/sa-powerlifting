import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import 'primeicons/primeicons.css';
import { createApp } from 'vue';
import App from './views/App.vue';
import router from './router';
import './assets/tailwind.css';
import './style.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, { theme: 'none' });

app.component('InputText', InputText);
app.component('Button', Button);

app.mount('#app');
