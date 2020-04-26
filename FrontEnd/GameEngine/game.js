/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

import GameBoard from "./gameBoard.js";
import History from "./history.js";
import { HistoryType, GameState } from "./gameEnums.js";
import Player from "./player.js";
import _ from "underscore";

/**
 * A class representing a Game object.
 * @returns {void}
 */
class Game {
  constructor(gameId) {
    if (_.isNull(gameId) || _.isUndefined(gameId)) {
      throw new Error("gameId must be specified")
    }

    this.gameId = gameId;
    this.board = new GameBoard();
    this.history = new History();
    this.history.record({
      type: HistoryType.GAME_CREATED
    });
    this.players = [];
    this.state = GameState.NOT_STARTED;
  }

  /**
   * Game will subscribe player.
   * @param {object} player - should represent Player object
   * @param {object} pawnsData - players pawns
   * @return {void}
   */
  join(player, pawnsData) {
    if (this.state === GameState.NOT_STARTED) {

      this.players.push(player);
      this.board.setPawns(pawnsData);

      this.history.record({
        type: HistoryType.PLAYER_JOINS,
        playerId: Player.playerId
      });
    }
  }

  /**
   * Game will unsubscribe player.
   * @param {object} player - should represent Player object
   * @return {void}
   */
  leave(player) {
    this.players.splice(
      this.players.findIndex((o) => o.getPlayerId() === player.getPlayerId()),
      1
    );

    this.history.record({
      type: HistoryType.PLAYER_LEAVES,
      playerId: player.getPlayerId()
    });
  }
}

export default Game;
