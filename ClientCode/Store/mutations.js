import { SET_PLAYER } from "./mutationsTypes.js";

export default {
  [SET_PLAYER](state, autheniticatedPlayer) {
    state.player = autheniticatedPlayer;
    }
  }
