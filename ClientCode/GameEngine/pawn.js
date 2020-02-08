import uuid from "uuid/v1";
import _ from "underscore";

/**
 * A class representing a Pawn object.
 * @param {object} pawnData - Object containing pawn information as: type, col, oldCol,
 * row, oldRow, pawnId (optional), selected
 * @returns {void}
 */
class Pawn {
    constructor(pawnData) {
        const pawnId = pawnData.pawnId || uuid(),
         that = this;

        that.type = pawnData.type;
        that.col = pawnData.col;
        that.oldCol = pawnData.col;
        that.row = pawnData.row;
        that.oldRow = pawnData.row;
        that.player = null;
        that.selected = false;

        /**
         * @returns {uuid} gets unique pawn id
         */
        that.getPawnId = function () {
            return pawnId;
        };
    }

    /**
     * Assign pawn to provided player
     * @param {player} player Player instance
     * @returns {void}
     */
    setPlayer(player) {
        const that = this;

        that.player = player;
    }

    /**
     * Get assigned player for pawn
     * @returns {player} returns assigned player
     */
    getPlayer() {
        const that = this;

        return that.player;
    }

    updatePosition(newCol, newRow) {
        const that = this;

        that.oldCol = that.col;
        that.oldRow = that.row;
        that.col = newCol;
        that.row = newRow;

        if ((that.col === null || that.row === null) && that.player) {
            that.player.setPawns(_(that.player.pawns, that));
        }
    }
}

export default Pawn;
