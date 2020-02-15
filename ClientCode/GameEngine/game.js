/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

import uuid from "uuid/v1";
import Board from "./board.js";
import History from "./history.js";
import { GameState } from "./gameEnums.js";

/**
 * A class representing a Game object.
 * @returns {void}
 */
class Game {
  constructor() {
    const gameId = uuid();

    let state = GameState.NotStarted,
      gameResult = 0;

    this.board = null;
    this.history = null;
    this.players = [];

    /**
     * SetState method manages the game state which can be: NotStarted:0, Started:1, Waiting:2, Turn:3, Ended:4
     * @param {GameState} newState parameter representing the new game state
     * @return {void}
     */
    this.setState = function (newState) {
      state = newState;
      if (state === GameState.Started) {
        this.emit("gameStarting");
        // Initialize History and Board. Let players know that turn started and wait.
        this.history = new History();
        this.history.pushTurn(this.players[0], this.players[1]);
        this.board = new Board();
        this.board.init(this.players[0], this.players[1]);
        this.setState(GameState.Waiting);
        // That.emit('gameStarted');
      } else if (state === GameState.Waiting) {
        // eslint-disable-next-line no-warning-comments
        // TODO: Set timer to send an email notification after a while
        this.notifyPlayers();
        this.emit("gameWaiting");
      } else if (state === GameState.Turn) {
        this.emit("gameTurnProcessing");
        // Let Board to process the turn and save output in the history
        this.history.pushTurn(this.players[0], this.players[1]);
        gameResult = this.board.processTurn(this.players[0], this.players[1]);
        if (gameResult === 0) {
          this.setState(GameState.Waiting);
        } else {
          this.setState(GameState.Ended);
        }
        this.emit("gameTurnProcessed");
      } else if (state === GameState.Ended) {
        this.history.end(gameResult, () => {
          if (gameResult === 1) {
            this.players[0].getPlayerId();
          } else {
            this.players[1].getPlayerId();
          }
        });
        this.emit("gameEnded");
      }
    };

    /**
     * Method to be called when player's turn has ended and a player wants to commit its move.
     * @returns {void}
     */
    this.commitTurn = function () {
      const isTurnCommitted = this.players[0].isReady() && this.players[1].isReady();

      if (isTurnCommitted) {
        this.setState(GameState.Turn);
      }
    };

    /**
     * @returns {uuid} gets unique game id
     */
    this.getGameId = function () {
      return gameId;
    };

    /**
     * @returns {uuid} gets current game state
     */
    this.getState = function () {
      return state;
    };
  }

  /**
   * Game will subscribe player.
   * @param {object} player - should represent Player object
   * @return {void}
   */
  join(player) {
    const that = this;

    that.players.push(player);
  }

  /**
   * A method which allows to start a new game when all requirements are fullfilled. A history of the game is created.
   * @param {function} exec - callback function when game is started
   * @return {void}
   */
  start() {
    const that = this;

    if (that.players.length === 2) {
      that.setState(GameState.Started);
    }
  }

  /**
   * Subscribed players are notified and startTurn is called.
   * @return {void}
   */
  notifyPlayers() {
    const that = this,
      commitTurnCallback = that.commitTurn;

    that.players.forEach(player => {
      player.startTurn(commitTurnCallback);
    });
  }
}

export default Game;
