import uuid from "uuid/v1";
import _ from "underscore";

const PlayerState = {
  Stopped: 0,
  Ready: 1
};

/**
 * Representing a Player object.
 * @param {object} playerData - Object containing player information as: name,
 * @returns {void}
 */
class Player {
  constructor(playerData) {
    const that = this,
      playerId = uuid();

    that.name = playerData.name;
    that.pawns = [];
    that.movedPawns = [];
    that.state = PlayerState.Stopped;
    that.turnCommitCallback = null;

    /**
     * @returns {uuid} gets unique player id
     */
    that.getPlayerId = function() {
      return playerId;
    };
  }

  /**
   * Allows to set set of pawns.
   * @param {array} pawnsSet - represent an array of pawns of type Pawn
   * @return {void}
   */
  setPawns(pawnsSet) {
    const that = this;

    that.movedPawns = [];
    // eslint-disable-next-line no-magic-numbers
    if (that.pawns.length === 0) {
      that.pawns = pawnsSet.slice();
    } else {
      that.pawns = pawnsSet;
      _(that.pawns, pawn => {
        if (pawn.col !== pawn.oldCol || pawn.row !== pawn.oldRow) {
          that.movedPawns.push(pawn);
        }
      });
    }
  }

  /**
   * Call startTurn method when new turn begins and subscribe a commit callback
   * @param {function} turnCommitCallback A callback to notify game that turn is commmitted
   * @returns {void}
   * n
   */
  startTurn(turnCommitCallback) {
    const that = this;

    let isInvalid = false;

    that.state = PlayerState.Ready;
    that.turnCommitCallback = turnCommitCallback;
    that.movedPawns = [];
    _(that.pawns, pawn => {
      isInvalid = pawn.col === null || pawn.row === null;
      if (!isInvalid) {
        pawn.resetState();
      }

      return isInvalid;
    });
  }

  /**
   * Call endTurn when the turn is over and Game can be notified.
   * @return {void}
   */
  // eslint-disable-next-line padded-blocks
  endTurn() {

    /*
     * TODO Implement: this.pawns = this.pawns +/- this.movedPawns;
     * or maybe there should be an update callback to set pawnsSet after conducted move
     */
    this.state = PlayerState.Stopped;
    if (this.turnCommitCallback) {
      this.turnCommitCallback();
    }
  }

  /**
   * Determines whether player is done with the current turn
   * @returns {boolean} true - when player's turn is done, false - when it's not
   */
  isReady() {
    return this.state === PlayerState.Stopped;
  }
}

export default Player;
