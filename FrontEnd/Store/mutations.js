import { SIGN_UP_PLAYER, SIGN_OUT_PLAYER, GET_ALL_GAMES, UPDATE_ACTIVE_GAME } from "./mutationsTypes.js";
import Game from "./../GameEngine/game.js";
import _ from "underscore";
import Player from "../GameEngine/player.js";

export default {
  [SIGN_UP_PLAYER](state, autheniticatedPlayer) {
    state.player = autheniticatedPlayer;
  },
  [SIGN_OUT_PLAYER](state) {
    const initState = state.initialState();

    Object.keys(initState).forEach((key) => {
      state[key] = initState[key]
    })
  },
  [GET_ALL_GAMES](state, gamesCollection) {
    state.games = gamesCollection;
  },
  [UPDATE_ACTIVE_GAME](state, gameData) {
    console.log(gameData);
    if (!_.isEmpty(gameData)) {
      const game = new Game(gameData.id);

      _.forEach(gameData.players, (playerData) => {
        const player = new Player(playerData);

        game.join(player, playerData.pawns);
      });

      state.activeGame = game;
      state.recentOpenedGameId = game.gameId;
    }
  }
};
