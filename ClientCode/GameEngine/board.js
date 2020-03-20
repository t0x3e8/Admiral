/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */

import uuid from "uuid/v1"
import settings from "./settings.js"
import Cell from "./cell.js"
import Rules from "./Utils/Rules.js"
import _ from "underscore";
import { CellType, PawnType } from "./gameEnums.js";
import BoardHelper from "./Utils/BoardHelper.js";
import Pawn from "./pawn.js";

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {

  /**
   * Constructs the Board object
   * @param {boolean} portMode configure Board object with settings like: portMode
   */
  constructor(portMode) {
    const boardId = uuid();

    this.cells = [];
    this.portMode = portMode ?? false;

    this.initializeCells();
    if (portMode) {
      this.displayPortCells();
      this.initializePawns();
    }

    /**
     * @returns {uuid} gets unique board id
     */
    this.getBoardId = function () {
      return boardId
    }
  }

  /**
   * Initialized the intance of Board with an array of cells. The map of the cells is based on settings.js
   * @returns {array} Returns 2-dimentional array of cells
   * @param {boolean} portMode determines whether full Board should be initialized or only Player's port
   */
  initializeCells() {
    const {
      map,
      numberOfColumns,
      numberOfRows
    } = settings.board;

    let colPosition = 0,
      rowPosition = 0,
      cellType = 0,
      row = []

    for (rowPosition = 0; rowPosition < numberOfRows; rowPosition += 1) {
      row = []
      for (colPosition = 0; colPosition < numberOfColumns; colPosition += 1) {
        cellType = map[rowPosition][colPosition];
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
    const allPawns = _.filter(BoardHelper.getAllPawns(),
                              pawn => pawn.type !== PawnType.MINE &&
                              pawn.type !== PawnType.BATTERY),
          portCells = _.shuffle(_.flatten(this.cells).filter(cell => cell.type === CellType.PLAYER_TWO_PORT ||
                                                                     cell.type === CellType.PLAYER_TWO_ENTRANCE)),
          batteryCells = _.flatten(this.cells).filter(cell => cell.type === CellType.PLAYER_TWO_BATTERY)

    batteryCells.forEach(cell => {
      cell.pawn = new Pawn({
        type: PawnType.BATTERY
      })
    })

    allPawns.forEach(pawn => {
      this.assignPawn(portCells.pop(), pawn);
    })
  }

  /**
   * Changes the full board view into only port view
   * @returns {void}
   */
  displayPortCells() {
    // ToDo: Hardcoded, as the cells are limitted to the last 6 rows. In future it needs more dynamic approach.
    this.cells = _.last(this.cells, 6);
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
   * The function selects cells that are within the Pawn's range.
   * The selected cells change the inRange property to true.
   * The algorithm used: Breadth First Search
   * @param {pawn} pawn The pawn for which selection is conducted
   * @returns {void}
   */
  rangeCells(pawn) {
    if (!pawn || pawn.range === 0) {
      return;
    }

    const queue = [];

    let currentDepth = 1,
      elementsToDepthIncrease = 1,
      nextElementsToDepthIncrease = 0,
      cell = this.cells[pawn.row][pawn.col],
      adjacentCells = [],
      i = 0;

    queue.push(cell);

    while (queue.length > 0) {
      cell = queue.shift(1);
      adjacentCells = cell.getAdjacentCells();

      nextElementsToDepthIncrease += adjacentCells.length;

      // eslint-disable-next-line no-loop-func
      for (i = 0; i < adjacentCells.length; i += 1) {
        const adjacentCell = adjacentCells[i];

        /*
         * Adjacent Cell cannot be alredy "inRange" meaning not being already visited,
         * Adjacent Cell cannot have a Pawn assigned
         * Adjacent Cell and Main Cell cannot be pair of Sea and Port
         */
        if (Rules.isCellInRange(adjacentCell) ||
          Rules.hasCellAssignedPawn(adjacentCell) ||
          Rules.isPairOfSeaAndPort(adjacentCell, cell)) {
          nextElementsToDepthIncrease -= 1;
        } else {
          adjacentCell.inRange = true;
          queue.push(adjacentCell);
        }
      }

      elementsToDepthIncrease -= 1;
      if (elementsToDepthIncrease === 0) {
        currentDepth += 1;
        if (currentDepth > pawn.range) {
          return;
        }

        elementsToDepthIncrease = nextElementsToDepthIncrease;
        nextElementsToDepthIncrease = 0;
      }
    }
  }

  /**
   * Cleans the range of the selection
   * @returns {void}
   */
  cleanRange() {
    const {
      numberOfColumns,
      numberOfRows
    } = settings.board;

    for (let r = 0; r < numberOfRows; r += 1) {
      for (let c = 0; c < numberOfColumns; c += 1) {
        this.cells[r][c].inRange = false;
      }
    }
  }

  /**
   * Function move the pawn from the origin cell to destination cell
   * @param {Cell} originCell must contain assigned pawn
   * @param {Cell} destinationCell it's an empty cell to which the pawn will be assigned
   * @returns {void}
   */
  move(originCell, destinationCell) {
    const { pawn } = this.cells[originCell.rowIndex][originCell.colIndex];

    originCell.pawn = null;
    this.assignPawn(destinationCell, pawn);
  }

  /**
   * Function assigned a specified pawn to the cell
   * @param {Cell} cell to which the pawn will be assigned
   * @param {Pawn} pawn which represents the ship
   */
  // eslint-disable-next-line class-methods-use-this
  assignPawn(cell, pawn) {
    cell.pawn = pawn;
    pawn.updatePosition(cell.colIndex, cell.rowIndex);
  }
}

export default Board
