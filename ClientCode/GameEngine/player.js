import uuid from "uuid/v1";

/**
 * Representing a Player object.
 * @param {object} playerData - Object containing player information as: name,
 * @returns {void}
 */
class Player {
  constructor(playerData) {
    const playerId = uuid();

    this.name = playerData.name;
    this.pawns = [];
    this.movedPawns = [];
    this.turnCommitCallback = null;

    /**
     * @returns {uuid} gets unique player id
     */
    this.getPlayerId = function () {
      return playerId;
    };
  }
}

export default Player;
