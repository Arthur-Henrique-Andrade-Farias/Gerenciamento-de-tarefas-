import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
axios.defaults.withCredentials = true;
app.config.globalProperties.axios=axios
app.use(VueAxios, axios);
app.use(VueCookies)

app.mount('#app')
