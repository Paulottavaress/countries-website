import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';

import "primevue/resources/themes/bootstrap4-dark-blue/theme.css";     
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";


const app = createApp(App);
app.use(store);
app.use(router);
app.use(PrimeVue);
app.mount('#app');