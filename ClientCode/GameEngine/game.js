/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import eventEmitter from "events";
import util from "util";
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
    const that = this,
      gameId = uuid();

    let state = GameState.NotStarted,
      gameResult = 0;

    that.board = null;
    that.history = null;
    that.players = [];
    Reflect.apply(eventEmitter, that, []);

    /**
     * SetState method manages the game state which can be: NotStarted:0, Started:1, Waiting:2, Turn:3, Ended:4
     * @param {GameState} newState parameter representing the new game state
     * @return {void}
     */
    that.setState = function (newState) {
      state = newState;
      if (state === GameState.Started) {
        that.emit("gameStarting");
        // Initialize History and Board. Let players know that turn started and wait.
        that.history = new History();
        that.history.pushTurn(that.players[0], that.players[1]);
        that.board = new Board();
        that.board.init(that.players[0], that.players[1]);
        that.setState(GameState.Waiting);
        // That.emit('gameStarted');
      } else if (state === GameState.Waiting) {
        // eslint-disable-next-line no-warning-comments
        // TODO: Set timer to send an email notification after a while
        that.notifyPlayers();
        that.emit("gameWaiting");
      } else if (state === GameState.Turn) {
        that.emit("gameTurnProcessing");
        // Let Board to process the turn and save output in the history
        that.history.pushTurn(that.players[0], that.players[1]);
        gameResult = that.board.processTurn(that.players[0], that.players[1]);
        if (gameResult === 0) {
          that.setState(GameState.Waiting);
        } else {
          that.setState(GameState.Ended);
        }
        that.emit("gameTurnProcessed");
      } else if (state === GameState.Ended) {
        that.history.end(gameResult, () => {
          if (gameResult === 1) {
            that.players[0].getPlayerId();
          } else {
            that.players[1].getPlayerId();
          }
        });
        that.emit("gameEnded");
      }
    };

    /**
     * Method to be called when player's turn has ended and a player wants to commit its move.
     * @returns {void}
     */
    that.commitTurn = function () {
      const isTurnCommitted = that.players[0].isReady() && that.players[1].isReady();

      if (isTurnCommitted) {
        that.setState(GameState.Turn);
      }
    };

    /**
     * @returns {uuid} gets unique game id
     */
    that.getGameId = function () {
      return gameId;
    };

    /**
     * @returns {uuid} gets current game state
     */
    that.getState = function () {
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

util(Game, eventEmitter);

export default Game;
