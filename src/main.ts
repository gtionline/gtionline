import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
// @ts-ignore
import Tabs from 'vue3-tabs';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEnvelope, faUserFriends, faRoad, faUniversity, faInfoCircle, faAngleDown, faBars, faCopy,
} from '@fortawesome/free-solid-svg-icons';
import hljs from 'highlight.js/lib/core';
import latex from 'highlight.js/lib/languages/latex';
import hljsVuePlugin from '@highlightjs/vue-plugin';
// import VueHtmlToPaper from 'vue-html-to-paper';
import App from './App.vue';
import routes from './router';
import { i18n } from './scripts/i18n';

library.add(faEnvelope);
library.add(faUserFriends);
library.add(faRoad);
library.add(faUniversity);
library.add(faInfoCircle);
library.add(faAngleDown);
library.add(faBars);
library.add(faCopy);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

hljs.registerLanguage('tex', latex);

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

app.component('FontAwesomeIcon', FontAwesomeIcon);
// Vue.use(VueHtmlToPaper, options);
// app.use(options);
app.use(i18n);
app.use(Tabs);
app.use(hljsVuePlugin);

app.mount('#app');
