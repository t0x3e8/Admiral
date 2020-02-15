import uuid from "uuid/v1";

/**
 * Representing History of the Game
 * @returns {void}
 */
class History {
  constructor() {
    const historyId = uuid();

    this.records = [];

    /**
     * @returns {uuid} gets unique history id
     */
    this.getHistoryId = function() {
      return historyId;
    };
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
}

export default History;
