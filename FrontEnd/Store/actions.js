import { SET_PLAYER, GET_ALL_GAMES, UPDATE_ACTIVE_GAME } from "./mutationsTypes.js";
import dataSvc from "./dataService.js";
import _ from "underscore";

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
  },

  async createGame({ dispatch, state }, payload) {
    const responseData = await dataSvc.addGame(payload.gameName, payload.pawns, state.player);

    if (responseData !== null) {
      await dispatch("setGame", { gameId: responseData.game.id });
    }
  },

  async joinGame({ dispatch, state }, payload) {
    const responseData = await dataSvc.joinGame(payload.gameId, payload.pawns, state.player);

    if (responseData !== null) {
      await dispatch("setGame", { gameId: payload.gameId });
    }
  },

  async setGame({ commit }, payload) {
    const responseData = await dataSvc.getGame(payload.gameId);

    if (!_.isEmpty(responseData)) {
      commit(UPDATE_ACTIVE_GAME, responseData);
    }
  }
};
