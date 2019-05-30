import VueRouter from 'vue-router';
import Dashboard from './Components/Dashboard.vue';
import About from './Components/About.vue';

export default {
  createRouter() {
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


return router;
  }
};
