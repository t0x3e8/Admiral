/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

import uuid from "uuid/v1";
import Board from "./board.js";
import History from "./history.js";

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
  }
}

export default Game;
