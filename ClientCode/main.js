import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import App from './Components/App.vue';
import Dashboard from './Components/Dashboard.vue';
import About from './Components/About.vue';

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
