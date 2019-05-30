import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import './main.styl';
import routerFactory from './router.js';
import VueRouter from 'vue-router';
import App from './Components/App.vue';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.config.productionTip = false;
const router = routerFactory.createRouter();

// eslint-disable-next-line no-new
new Vue({
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  el: '#app',
  router,
  render: h => h(App)
});
