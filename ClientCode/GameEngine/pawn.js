import uuid from "uuid/v1";
import settings from "./settings.js";
import { find } from "underscore";

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
        that.range = find(settings.pawns, element => element.typeId === that.type).range;

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
        this.oldCol = this.col;
        this.oldRow = this.row;
        this.col = newCol;
        this.row = newRow;

        if ((this.col === null || this.row === null) && this.player) {
            this.player.setPawns((this.player.pawns, this));
        }
    }
}

export default Pawn;
