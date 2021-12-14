import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import PrettyCheckbox from 'pretty-checkbox-vue';
import Tabs from 'vue3-tabs';
// import VueHtmlToPaper from 'vue-html-to-paper';
import App from './App.vue';
import routes from './router';
import { i18n } from './scripts/i18n';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router, i18n, render: h => h(App),
const app = createApp(App);

app.use(router);

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes',
  ],
};

// Vue.use(VueHtmlToPaper, options);
app.use(options);
app.use(PrettyCheckbox);
app.use(i18n);
app.use(Tabs);

app.mount('#app');
