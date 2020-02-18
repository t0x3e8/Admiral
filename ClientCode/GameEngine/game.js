/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

import uuid from "uuid/v1";
import Board from "./board.js";
import History from "./history.js";
import { HistoryType } from "./gameEnums.js";

/**
 * A class representing a Game object.
 * @returns {void}
 */
class Game {
  constructor() {
    const gameId = uuid();

    this.board = new Board();
    this.history = new History();
    this.players = [];

    /**
     * @returns {uuid} gets unique game id
     */
    this.getGameId = function () {
      return gameId;
    };
  }

  /**
   * Game will subscribe player.
   * @param {object} player - should represent Player object
   * @return {void}
   */
  join(player) {
    this.players.push(player);
    this.history.record({
      type: HistoryType.PLAYER_JOINS,
      playerId: player.getPlayerId()
    })
  }

  /**
   * Game will unsubscribe player.
   * @param {object} player - should represent Player object
   * @return {void}
   */
  leaves(player) {
    this.players.splice(this.players.findIndex(o => o.getPlayerId() === player.getPlayerId()), 1);
    this.history.record({
      type: HistoryType.PLAYER_LEAVES,
      playerId: player.getPlayerId()
    })
  }
}

export default Game;
