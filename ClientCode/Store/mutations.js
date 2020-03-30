import { SET_PLAYER, GET_ALL_GAMES } from "./mutationsTypes.js";

export default {
  [SET_PLAYER](state, autheniticatedPlayer) {
    state.player = autheniticatedPlayer;
    },

    [GET_ALL_GAMES](state, gamesCollection) {
      state.games = gamesCollection;
    }
  }
