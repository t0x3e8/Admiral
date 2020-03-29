import Vue from "vue";
import App from "./Views/App.vue";
import BootstrapVue from "bootstrap-vue";
import "./Assets/scss/custom.scss";
import "./Assets/graphics/favicon.ico";
import store from "./Store/index";
import router from "./router.js";

Vue.use(BootstrapVue)

// eslint-disable-next-line no-new
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
