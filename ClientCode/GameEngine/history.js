import uuid from 'uuid/v1';

/**
 * Representing History object
 * @returns {void}
 */
class History {
  constructor() {
    const that = this,
      historyId = uuid();

    that.records = [];

    /**
     * @returns {uuid} gets unique history id
     */
    that.getHistoryId = function() {
      return historyId;
    };
  }

  /**
   * Should be called when there is no more turns in the game and history can be called.
   * @param {number} result 0 - unresolved, 1 - player 1 wins, 2 - player 2 wins
   * @param {uuid} playerId uuid of winning player
   * @return {void}
   */
  end(result, playerId) {
    const that = this;

    that.records.push({
      result,
      player: playerId
    });
  }

  /**
   * Should be called to record a turn setup
   * @param {Player} player1 Player number 1
   * @param {Player} player2 Player number 2
   * @returns {void}
   */
  pushTurn(player1, player2) {
    const that = this;

    let record = null;

    if (player1 && player2) {
      record = that.createRecord(player1, player2);
      that.records.push(record);
    }
  }

  /**
   * Gets the specific turn records
   * @param {number} turnNumber Number of the turn, when the first turn is 1
   * @return {object} Specific turn
   */
  getTurn(turnNumber) {
    const that = this;

    // eslint-disable-next-line no-magic-numbers
    return that.records[turnNumber - 1];
  }

  /**
   * Helper method to create record
   * @param {Player} player1 Player number 1
   * @param {Player} player2 Player number 2
   * @return {object} new record
   */
  // eslint-disable-next-line class-methods-use-this
  createRecord(player1, player2) {
    return {
      player1,
      player2
    };
  }
}

export default History;
