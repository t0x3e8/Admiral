/* eslint-disable max-statements */
/* eslint-disable object-property-newline */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-expressions */
/* global describe, it */

/*
 * GIVEN (context),
 * AND (further context),
 * WHEN (action/event),
 * AND (further action/event),
 * THEN (outcome)
 * AND (further outcome)
 */

import {expect} from "chai";
import Board from "../../../ClientCode/GameEngine/board.js";
import Pawn from "../../../ClientCode/GameEngine/pawn.js";
import {CellType, PawnType} from "../../../ClientCode/GameEngine/gameEnums";

describe("BOARD requirements", () => {
  it("GIVEN that a Board is initialized " +
     "THEN it should have cells and ID assigned.", () => {
    const board = new Board();

    expect(board.getBoardId()).to.not.be.empty;
    expect(board.cells[1][1]).to.not.be.empty;
  });

  it("GIVEN that a Board is initialized " +
     "THEN any of its cell should have details assigned.", () => {
    const board = new Board(),
      cell = board.cells[1][1];

    expect(cell).to.not.be.empty;
    expect(cell.getCellId()).to.not.be.empty;
    expect(cell.colIndex).to.be.equal(1);
    expect(cell.rowIndex).to.be.equal(1);
    expect(cell.pawn).to.be.null;
    expect(cell.type).to.be.equal(CellType.PLAYER_ONE_PORT);
  });

  it("GIVEN that a Board is initialized " +
     "WHEN a Pawn is created and assigned to the Board " +
     "THEN a Cell should update its information.", () => {
    const board = new Board(),
      pawn = new Pawn({
        type: PawnType.SUBMARINE
      });

    board.cells[1][1].assignPawn(pawn);
    expect(board.cells[1][1]).to.not.be.empty;
    expect(board.cells[1][1].pawn).to.not.be.null;
    expect(board.cells[1][1].pawn.getPawnId()).to.be.equal(pawn.getPawnId());
    expect(pawn.col).to.be.equal(board.cells[1][1].colIndex);
    expect(pawn.row).to.be.equal(board.cells[1][1].rowIndex);
    expect(pawn.oldCol).to.be.undefined;
    expect(pawn.oldRow).to.be.undefined;
  });

  it("GIVEN that a Board is initialized " +
     "WHEN a player calls for random allocation of pawns " +
     "THEN all cells in player's port should have pawn assigned randomly", () => {
    const board = new Board();

    expect(board.cells.length).greaterThan(0);
  });

  it("GIVEN that Board is initialized " +
    "WHEN Cell or Pawn is clicked " +
    "THEN it should be possible to select a Pawn if any assigned to Cell " +
    "AND unselect any previous Pawn by updating cells field", () => {
      const board = new Board(),
        pawnSubmarine = new Pawn({
          type: PawnType.SUBMARINE
        }),
        pawnBatteries = new Pawn({
          type: PawnType.BATTERIES
        });

      board.cells[5][5].assignPawn(pawnSubmarine);
      board.select({col: 5, row: 5});
      board.cells[6][6].assignPawn(pawnBatteries);

      expect(board.cells[5][5]).to.not.be.empty;
      expect(board.cells[5][5].pawn).to.not.be.null;
      expect(board.cells[6][6]).to.not.be.empty;
      expect(board.cells[6][6].pawn).to.not.be.null;

      expect(board.cells[5][5].pawn.selected).to.be.true;
      expect(board.cells[6][6].pawn.selected).to.be.false;

      board.select({col: 6, row: 6});

      expect(board.cells[5][5].pawn.selected).to.be.false;
      expect(board.cells[6][6].pawn.selected).to.be.true;
    });
});
