/* eslint-disable no-magic-numbers */

import uuid from 'uuid/v1';
import settings from './settings.js';
import Cell from './cell.js';

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {
  constructor() {
    const that = this,
      boardId = uuid();

    that.cells = Board.createBoardCells();

    /**
     * @returns {uuid} gets unique board id
     */
    that.getBoardId = function() {
      return boardId;
    };
  }

  /**
   * Create a board of array of cells, basedby reading settings.js
   * @returns {array} Returns 2-dimentional array of cells
   */
  static createBoardCells() {
    const {map} = settings.board,
      {numberOfColumns} = settings.board,
      {numberOfRows} = settings.board,
      cells = [];
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
          columnIndex: colPosition,
          rowIndex: rowPosition
        });
      }
      cells[rowPosition] = row;
    }

    return cells;
  }
}

export default Board;
