/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */

import uuid from "uuid/v1"
import settings from "./settings.js"
import Cell from "./cell.js"
import Pawn from "./pawn.js"
import Utils from "./utils.js"
import _ from "underscore";

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {
  constructor() {
    const that = this,
      boardId = uuid()

    that.cells = [];

    this.initializeCells();
    that.initializePawns();

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
  initializeCells() {
    const { map, numberOfColumns, numberOfRows } = settings.board;

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
          rowIndex: rowPosition,
          board: this
        })
      }
      this.cells[rowPosition] = row
    }
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

        // eslint-disable-next-line no-warning-comments
        // TODO This is only temporary!
        this.cells[Utils.getRandom(18)][Utils.getRandom(12)].assignPawn(newPawn);
      }
    }
  }

  /**
   * Select a pawn at specific cell
   * @param {*} payload - object with: col, row
   * @returns {void}
   */
  select(payload) {
    const pawnToSelect = this.cells[payload.row][payload.col].pawn;

    this.unselectAny();

    if (pawnToSelect) {
      pawnToSelect.selected = true;
    }
  }

  /**
   * Unselect any pawn if selected
   * @returns {void}
   */
  unselectAny() {
    const pawnSelected = this.getSelected();

    if (pawnSelected) {
      this.unselect({
        col: pawnSelected.col,
        row: pawnSelected.row
      });
    }
  }

  /**
   * Unselect a pawn at specific cell
   * @param {*} payload - object with: col, row
   * @returns {void}
   */
  unselect(payload) {
    const pawnToUnselect = this.cells[payload.row][payload.col].pawn;

    if (pawnToUnselect) {
      pawnToUnselect.selected = false;
    }
  }

  /**
   * Loop through all cells to find a pawn which is selected
   * @returns {pawn} or null if not found
   */
  getSelected() {
    const allCells = _.flatten(this.cells),
      selectedCell = _.find(allCells, cell => cell.pawn && cell.pawn.selected);

    if (selectedCell) {
      return selectedCell.pawn;
    }

    return null;
  }

  /**
   * Function identifies all cells in range of the pawn
   * @param {uuid} pawn Pawn for which the range should be calculate
   * @returns {void}
   */
  rangeCells(pawn) {
    const colMax = pawn.col + pawn.range,
          colMin = pawn.col - pawn.range,
          rowMax = pawn.row + pawn.range;

    let col = colMin,
        row = pawn.row - pawn.range;

    /*
     * Each field within the square range is tested, if:
     * - the field has no pawns in it, mark the field as in range,
     * - the field has a pawn, but the pawn is opponent's pawn, mark the field as in range,
     */
    for (row; row <= rowMax; row += 1) {
      if (this.cells[row]) {
        for (col; col <= colMax; col += 1) {
          if (this.cells[row][col]) {
            // eslint-disable-next-line max-depth
            if (col !== pawn.col || row !== pawn.row) {
              this.cells[row][col].inRange = true;
            }
          }
        }
        col = colMin;
      }
    }
  }

  rangeCellsBFS(pawn, maxDepth) {
    const queue = [],
          visited = [];

    let currentDepth = 0,
        elementsToDepthIncrease = 1,
        nextElementsToDepthIncrease = 0;

    queue.push(this.cells[pawn.row][pawn.col]);
    visited.push(this.cells[pawn.row][pawn.col]);

    while (queue.length > 0) {
      const cell = queue.shift(1),
            neighbours = cell.getAdjacentCells();

      nextElementsToDepthIncrease += neighbours.length;

      // eslint-disable-next-line no-plusplus
      if (--elementsToDepthIncrease === 0) {
        // eslint-disable-next-line no-plusplus
        if (++currentDepth > maxDepth) {
          return;
        }
        elementsToDepthIncrease = nextElementsToDepthIncrease;
        nextElementsToDepthIncrease = 0;
      }

      neighbours.forEach(n => {
        if (!visited.includes(n)) {
          // visited.push(n);
          n.inRange = true;
          queue.push(n);
        }
      });
    }
  }

  /**
   * Cleans the range of the selection
   * @returns {void}
   */
  cleanRange() {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.inRange = false;
      })
    });
  }
}

export default Board
