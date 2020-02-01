/* eslint-disable no-magic-numbers */

import uuid from "uuid/v1"
import settings from "./settings.js"
import Cell from "./cell.js"
import Pawn from "./pawn.js"
import Utils from "./utils.js"

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {
  constructor() {
    const that = this,
      boardId = uuid()

    that.cells = Board.initializeCells()
    this.initializePawns()

    /**
     * @returns {uuid} gets unique board id
     */
    that.getBoardId = function () {
      return boardId
    }
  }

  /**
   * Initialized the intance of Board with an array of cells. The map of the cells is based on settings.js
   * @returns {array} Returns 2-dimentional array of cells
   */
  static initializeCells() {
    const { map, numberOfColumns, numberOfRows } = settings.board,
      cells = []

    let colPosition = 0,
      rowPosition = 0,
      cellType = 0,
      row = []

    for (rowPosition = 0; rowPosition < numberOfRows; rowPosition += 1) {
      row = []
      for (colPosition = 0; colPosition < numberOfColumns; colPosition += 1) {
        cellType = map[rowPosition][colPosition]
        row[colPosition] = new Cell({
          type: cellType,
          columnIndex: colPosition,
          rowIndex: rowPosition
        })
      }
      cells[rowPosition] = row
    }

    return cells;
  }

  /**
   * Initialized the intance of Board with the random placement of pawns.
   * @returns {void}
   */
  initializePawns() {
    const pawnsMap = settings.pawns

    let pawnCount = 0,
      fleetSizeCount = 0

    for (pawnCount; pawnCount < pawnsMap.length; pawnCount += 1) {
      for (fleetSizeCount = 0; fleetSizeCount < pawnsMap[pawnCount].fleetSize; fleetSizeCount += 1) {
        const newPawn = new Pawn({
          type: pawnsMap[pawnCount].typeId
        })

        this.cells[Utils.getRandom(18)][Utils.getRandom(12)].assignPawn(newPawn);
      }
    }
  }
}

export default Board
