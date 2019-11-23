import uuid from 'uuid/v1';

/**
 * A class representing a Cell object.
 * @param {object} cellData - Object containing cell information as: type, columnIndex, rowIndex,
 * @returns {void}
 */
class Cell {
  constructor(cellData) {
    const that = this,
      cellId = uuid();

    that.type = cellData.type;
    that.colIndex = cellData.columnIndex;
    that.rowIndex = cellData.rowIndex;
    that.pawn = null;

    /**
     * @returns {uuid} gets unique cell id
     */
    that.getCellId = function () {
      return cellId;
    };
  }

  assignPawn(pawn) {
    const that = this;

    that.pawn = pawn;
    pawn.updatePosition(that.colIndex, that.rowIndex);
  }
}

export default Cell;
