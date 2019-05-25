import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './Components/App.vue';
import Dashboard from './Components/Dashboard.vue';
import About from './Components/About.vue';
import Vuetify from 'vuetify';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/dashboard',
      component: Dashboard
    }
  ]
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
