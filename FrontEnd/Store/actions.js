import { SIGN_UP_PLAYER, SIGN_OUT_PLAYER, GET_ALL_GAMES, UPDATE_ACTIVE_GAME } from "./mutationsTypes.js";
import DataService from "./dataService.js";

export default {
  async signUpPlayer({ commit }, payload) {
    const response = await DataService.authenticatePlayer(payload.playerName);

    if (response !== null) {
      const authenticatedPlayer = {
        name: response.data.name,
        id: response.data.id,
        token: response.data.token
      };

      commit(SIGN_UP_PLAYER, authenticatedPlayer);
    }
  },

  signOutPlayer({commit}) {
    commit(SIGN_OUT_PLAYER);
  },

  async getGames({ commit }) {
    const dataService = new DataService(),
      responseData = await dataService.getAllGames();

    if (responseData !== null) {
      commit(GET_ALL_GAMES, responseData);
    }
  },

  async createGame({ dispatch, state }, payload) {
    const dataService = new DataService(),
    gameData = await dataService.addGame(payload.gameName, payload.pawns, state.player);

    if (gameData !== null) {
      await dispatch("openGame", { gameId: gameData.game.id });
    }
  },

  async joinGame({ dispatch, state }, payload) {
    const dataService = new DataService(),
      gameData = await dataService.joinGame(payload.gameId, payload.pawns, state.player);

    if (gameData !== null) {
      await dispatch("openGame", { gameId: gameData.game.id });
    }
  },

  async openGame({ commit, state }, payload) {
    const dataService = new DataService(),
      gameData = await dataService.getGameIncludingPawns(payload?.gameId ?? state.recentOpenedGameId);

    if (gameData !== null) {
      commit(UPDATE_ACTIVE_GAME, gameData);
    }
  }
};
