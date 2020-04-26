/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */

import Rules from "./Utils/Rules.js";
import _ from "underscore";
import Board from "./board.js";
import Pawn from "./pawn.js";
import settings from "./settings.js";

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * cells of ports and the neutral cells. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class GameBoard extends Board {
  /**
   * Each pawn is assigned to a representative cell by its col and row properties.
   * @param {*} pawnsData Array of pawns with col and row set
   * @returns {void}
   */
  setPawns(pawnsData) {
    _.forEach(pawnsData, (pawnData) => {
        const pawn = new Pawn(pawnData.type);

        if (this.cells[pawn.row][pawn.col].pawn !== null) {
          throw new Error("Pawn already exist")
        }

        pawn.update(pawnData);
        this.assignPawn(this.cells[pawn.row][pawn.col], pawn);
    })
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
      selectedCell = _.find(
        allCells,
        (cell) => cell.pawn && cell.pawn.selected
      );

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
        if (
          Rules.isCellInRange(adjacentCell) ||
          Rules.hasCellAssignedPawn(adjacentCell) ||
          Rules.isPairOfSeaAndPort(adjacentCell, cell)
        ) {
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
    const { numberOfColumns, numberOfRows } = settings.board;

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
    const { pawn } = this.cells[originCell.row][originCell.col];

    originCell.pawn = null;
    this.assignPawn(destinationCell, pawn);
  }
}

export default GameBoard;
