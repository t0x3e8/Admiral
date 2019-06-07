/* eslint-disable no-magic-numbers */

import uuid from 'uuid/v1';
import settings from './settings.js';
import Field from './field.js';

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * fields of ports and the neutral fields. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {
  constructor() {
    const that = this,
      boardId = uuid();

    that.fields = Board.createBoardFields();

    /**
     * @returns {uuid} gets unique board id
     */
    that.getBoardId = function() {
      return boardId;
    };
  }

  /**
   * Create a board of array of fields, basedby reading settings.js
   * @returns {array} Returns 2-dimentional array of fields
   */
  static createBoardFields() {
    const {map} = settings.board,
      {numberOfColumns} = settings.board,
      {numberOfRows} = settings.board,
      fields = [];
    let colPosition = 0,
      rowPosition = 0,
      fieldType = 0,
      row = [];

    for (colPosition = 0; colPosition < numberOfColumns; colPosition += 1) {
      row = [];
      for (rowPosition = 0; rowPosition < numberOfRows; rowPosition += 1) {
        fieldType = map[colPosition][rowPosition];
        row[rowPosition] = new Field({
          type: fieldType,
          columnIndex: colPosition,
          rowIndex: rowPosition
        });
      }
      fields[colPosition] = row;
    }

    return fields;
  }
}

export default Board;
