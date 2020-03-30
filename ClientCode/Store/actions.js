import { SET_PLAYER, GET_ALL_GAMES } from "./mutationsTypes.js";
import dataSvc from "./dataService.js";

export default {
  async setPlayer({ commit }, payload) {
    const response = await dataSvc.authenticatePlayer(payload.playerName);

    if (response !== null) {
      const authenticatedPlayer = {
        name: response.data.name,
        id: response.data.id,
        token: response.data.token
      };

      commit(SET_PLAYER, authenticatedPlayer);
    }
  },

  async getGames({ commit }) {
    const responseData = await dataSvc.getAllGames();

    if (responseData !== null) {
      commit(GET_ALL_GAMES, responseData);
    }
  }
};
