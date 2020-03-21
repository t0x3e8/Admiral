/* eslint-disable max-statements */
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
    that.getCellId = function() {
      return cellId;
    };
  }

  /**
   * The function creates arrat of adjacent (neighboring) cells.
   * Adjacent cells are those that are located directly on the X and Y axes.
   * @returns {array} The array containing adjacent cells
   */
  getAdjacentCells() {
    const adjacentCells = [],
      row = this.rowIndex,
      col = this.colIndex,
      offset = 1;

    // R-1, C
    if (this.board.cells[row - offset]) {
      adjacentCells.push(this.board.cells[row - offset][col]);
    }
    // R-1, C-1
    if (this.board.cells[row - offset] && this.board.cells[row - offset][col - offset]) {
      adjacentCells.push(this.board.cells[row - offset][col - offset]);
    }
    // R+1, C
    if (this.board.cells[row + offset]) {
      adjacentCells.push(this.board.cells[row + offset][col]);
    }
    // R-1, C+1
    if (this.board.cells[row - offset] && this.board.cells[row - offset][col + offset]) {
      adjacentCells.push(this.board.cells[row - offset][col + offset]);
    }
    // R, C-1
    if (this.board.cells[row][col - offset]) {
      adjacentCells.push(this.board.cells[row][col - offset]);
    }
    // R+1, C-1
    if (this.board.cells[row + offset] && this.board.cells[row + offset][col - offset]) {
      adjacentCells.push(this.board.cells[row + offset][col - offset]);
    }
    // R, C+1
    if (this.board.cells[row][col + offset]) {
      adjacentCells.push(this.board.cells[row][col + offset]);
    }
    // R+1, C+1
    if (this.board.cells[row + offset] && this.board.cells[row + offset][col + offset]) {
      adjacentCells.push(this.board.cells[row + offset][col + offset]);
    }

    return adjacentCells;
  }
}

export default Cell;
