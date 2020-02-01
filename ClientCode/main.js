import Vue from "vue";
import routerFactory from "./router.js";
import VueRouter from "vue-router";
import App from "./Views/App.vue";
import BootstrapVue from "bootstrap-vue"
import "./Assets/scss/custom.scss"
import "./assets/graphics/favicon.ico"
import store from "./Store/index.js"

const router = routerFactory.createRouter()

Vue.use(BootstrapVue)
Vue.use(VueRouter)

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
