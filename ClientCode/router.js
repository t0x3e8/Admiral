import VueRouter from 'vue-router';
import Game from './Components/Game.vue';
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
          path: '/game',
          component: Game
        }
      ]
    });

    return router;
  }
};
