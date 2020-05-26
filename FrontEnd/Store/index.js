// Provides promise in case if browser does not support (IE). Used by Vuex
import "es6-promise/auto";
import Vuex from "vuex";
import Vue from "vue";
import state from "./state.js";
import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";
import persistedstate from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [
    persistedstate({
      paths: ["player", "recentOpenedGameId"]
    })
  ]
});
