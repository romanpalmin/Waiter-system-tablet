import Vue from 'vue';
import Framework7 from 'framework7';
import Framework7Vue from 'framework7-vue';
import Vuex from 'vuex';

// Import Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css';
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css';
import AppStyles from './css/app.css';

// Init Vue Plugin
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(Framework7Vue);
Vue.use(VueAxios, axios);


import Routes from './routes.js';
import App from './app';
import store from './store';

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  store,
  framework7: {
    root: '#app',
    routes: Routes,
  },
  // Register App Component
  components: {
    app: App
  }
});
