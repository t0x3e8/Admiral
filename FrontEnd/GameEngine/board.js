/* eslint-disable no-magic-numbers */
import settings from "./settings.js";
import Cell from "./cell.js";
import _ from "underscore";

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {
  /**
   * Constructs the Board object
   */
  constructor() {
    this.cells = [];
    this.boardId = null;

    this.initializeCells();
  }

  /**
   * Initialized the intance of Board with an array of cells. The map of the cells is based on settings.js
   * @returns {array} Returns 2-dimentional array of cells
   * @param {boolean} portMode determines whether full Board should be initialized or only Player's port
   */
  initializeCells() {
    const { map, numberOfColumns, numberOfRows } = settings.board;

    let colPosition = 0,
      rowPosition = 0,
      cellType = 0,
      row = [];

    for (rowPosition = 0; rowPosition < numberOfRows; rowPosition += 1) {
      row = [];
      for (colPosition = 0; colPosition < numberOfColumns; colPosition += 1) {
        cellType = map[rowPosition][colPosition];
        row[colPosition] = new Cell({
          type: cellType,
          colIndex: colPosition,
          rowIndex: rowPosition,
          board: this
        });
      }
      this.cells[rowPosition] = row;
    }
  }

  /**
   * Function assigned a specified pawn to the cell
   * @param {Cell} cell to which the pawn will be assigned
   * @param {Pawn} pawn which represents the ship
   */
  // eslint-disable-next-line class-methods-use-this
  assignPawn(cell, pawn) {
    cell.pawn = pawn;
    pawn.updatePosition(cell.col, cell.row);
  }

  /**
   * Function returns the array of all pawns on the board
   * @returns {[pawn]} An array of pawns on the board
   */
  toPawnArray() {
    const cellsWithPawns = _.filter(
      _.flatten(this.cells),
      (cell) => cell.pawn !== null
    );

    return _.map(cellsWithPawns, (cell) => cell.pawn);
  }

  /**
   * Function returns the array of all board pawns misplaced (rotated) by 180 degrees
   * @returns {[pawn]} An array of rotated pawns on the board
   */
  toRotatedPawnsArray() {
    const pawns = this.toPawnArray(),
      { numberOfColumns, numberOfRows } = settings.board,
      lengthToIndex = 1;

    return _.map(pawns, (pawn) => {
      pawn.col = numberOfColumns - lengthToIndex - pawn.col;
      pawn.row = numberOfRows - lengthToIndex - pawn.row;

      return pawn;
    });
  }
}

export default Board;
