import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import routerFactory from './router.js';
import VueRouter from 'vue-router';
import App from './Components/App.vue';

const opts = {
  theme: {disable: true}
},
  router = routerFactory.createRouter(),
  vuetify = new Vuetify(opts);

Vue.use(Vuetify);
Vue.use(VueRouter);

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
});
