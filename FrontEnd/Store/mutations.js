import { SET_PLAYER, GET_ALL_GAMES, UPDATE_ACTIVE_GAME } from "./mutationsTypes.js";
import Game from "./../GameEngine/game.js";
import _ from "underscore";
import Player from "../GameEngine/player.js";

export default {
  [SET_PLAYER](state, autheniticatedPlayer) {
    state.player = autheniticatedPlayer;
  },

  [GET_ALL_GAMES](state, gamesCollection) {
    state.games = gamesCollection;
  },
  [UPDATE_ACTIVE_GAME](state, gameData) {
    console.log(gameData);
    if (!_.isEmpty(gameData)) {
      const game = new Game(gameData.gameId);

      _.forEach(gameData.players, (playerData) => {
        const player = new Player({
          id: playerData.id,
          name: playerData.name
        });

        game.join(player, playerData.pawns);
      });

      state.activeGame = game;
    }
  }
};
