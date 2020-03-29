import VueRouter from "vue-router";
import Vue from "vue";
import About from "./Views/About.vue";
import Game from "./Views/Game.vue";
import SignUp from "./Views/SignUp.vue";
import GameSetup from "./Views/GameSetup.vue";
import store from "./Store/index.js"

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    {
      path: "/about",
      component: About
    },
    {
      path: "/game",
      component: Game,
      name: "game",
      meta: { requiresAuth: true }
    },
    {
      path: "/signup",
      component: SignUp,
      name: "signup"
    },
    {
      path: "/",
      component: GameSetup,
      name: "setup",
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthorized = store.getters.isPlayerAuthorized;

  if (to.name === "signup" && isAuthorized) {
    return next({ name: "setup" });
  }

  if (to.meta.requiresAuth) {
    if (!isAuthorized) {
      return next({ name: "signup" });
    }
  }

  return next();
});

export default router;
