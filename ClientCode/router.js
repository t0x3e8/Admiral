import VueRouter from "vue-router";
import About from "./Views/About.vue";
import Game from "./Views/Game.vue";
import SignUp from "./Views/SignUp.vue";
import GameSetup from "./Views/GameSetup.vue";
import auth from "./auth.js";

export default {
  createRouter() {
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
      const isAuthorized = auth.isAuthorized();

      if (to.name === "signup" && isAuthorized) {
        return next({name: "setup"});
      }

      if (to.meta.requiresAuth) {
        if (!isAuthorized) {
          return next({ name: "signup" })
        }
      }

      return next();
    })

    return router;
  }
};
