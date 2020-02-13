import uuid from "uuid/v1";

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
    that.inRange = false;
    that.board = cellData.board;

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

  getCellNeighbours() {
    const neighbours = [],
        row = this.rowIndex,
        col = this.colIndex,
        offset = 1;

    if (this.board.cells[row - offset]) {
      neighbours.push(this.board.cells[row - offset][col]);
    }
    if (this.board.cells[row + offset]) {
      neighbours.push(this.board.cells[row + offset][col]);
    }
    if (this.board.cells[row][col - offset]) {
      neighbours.push(this.board.cells[row][col - offset]);
    }
    if (this.board.cells[row][col + offset]) {
      neighbours.push(this.board.cells[row][col + offset]);
    }

    return neighbours;
  }
}

export default Cell;
