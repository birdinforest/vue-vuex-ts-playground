import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import { FontAwesomeIcon } from '../plugins/font-awesome';

/**
 * To resolve the issue of vue devtools, disable stable version (for vue2), enable beta version (for vue3).
 * Maybe have to relaunch the browser.
 * https://github.com/vuejs/vue-devtools/issues/1244
 */
createApp(App)
  .use(store)
  .use(router)
  .component('fa', FontAwesomeIcon)
  .mount('#app');
