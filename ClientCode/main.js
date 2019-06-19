import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import './main.styl';
import routerFactory from './router.js';
import VueRouter from 'vue-router';
import App from './Components/App.vue';

Vue.use(VueRouter);
Vue.use(Vuetify, {
  options: {
    customProperties: true
  },
  theme: {
    light: {
      primary: '#03a9f4',
      secondary: '#3f51b5',
      accent: '#9c27b0',
      error: '#ff5722',
      warning: '#ffc107',
      info: '#607d8b',
      success: '#8bc34a'
    }
  }
});
Vue.config.productionTip = false;
const router = routerFactory.createRouter();

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
