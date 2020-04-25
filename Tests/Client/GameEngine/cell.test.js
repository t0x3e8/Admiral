/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* eslint-disable prefer-destructuring */
/* global describe, it */

import { expect } from "chai";
import Cell from "../../../ClientCode/GameEngine/cell.js";
import GameBoard from "../../../ClientCode/GameEngine/gameboard.js";

describe("CELL requirements", () => {
  it("GIVEN a Cell has been created THEN default settings should be set", () => {
    const cellData = {
      type: 1,
      colIndex: 2,
      rowIndex: 4,
      board: new GameBoard()
    },
    cell = new Cell(cellData);

    expect(cell).not.be.null;
    expect(cell.type).to.be.equal(cellData.type);
    expect(cell.col).to.be.equal(cellData.colIndex);
    expect(cell.row).to.be.equal(cellData.rowIndex);
    expect(cell.pawn).to.be.null;
    expect(cell.inRange).to.be.false
    expect(cell.board).to.be.equal(cellData.board);
  });

  it("GIVEN that Board's cells are initialized THEN it should be possible to determine neighbour-cells.", () => {
    const board = new GameBoard(),
      cellTopLeft = board.cells[0][0],
      cellBottomRight = board.cells[17][11],
      cellBottomLeft = board.cells[17][0],
      cellTopRigth = board.cells[0][11],
      cellMiddle = board.cells[9][5];

    expect(cellTopLeft.getAdjacentCells(board).length).to.be.equal(3);
    expect(cellBottomRight.getAdjacentCells(board).length).to.be.equal(3);
    expect(cellBottomLeft.getAdjacentCells(board).length).to.be.equal(3);
    expect(cellTopRigth.getAdjacentCells(board).length).to.be.equal(3);
    expect(cellMiddle.getAdjacentCells(board).length).to.be.equal(8);
  });
});
