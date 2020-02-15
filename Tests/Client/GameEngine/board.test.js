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

import { expect } from "chai";
import Board from "../../../ClientCode/GameEngine/board.js";
import Pawn from "../../../ClientCode/GameEngine/pawn.js";
import { CellType, PawnType } from "../../../ClientCode/GameEngine/gameEnums";

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
      expect(cell.inRange).to.be.false;
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
      expect(pawn.range).to.be.greaterThan(0);
    });

  it("GIVEN that a Board is initialized " +
    "WHEN a player calls for random allocation of pawns " +
    "THEN all cells in player's port should have pawn assigned randomly", () => {
      const board = new Board();

      expect(board.cells.length).greaterThan(0);
    });

  it("GIVEN that Board is initialized " +
    "AND a Pawn has be selected by user " +
    "THEN it should be possible to determine the selected Pawn", () => {
      const board = new Board(),
        pawnSubmarine = new Pawn({
          type: PawnType.SUBMARINE
        });

      let selectedPawn = null;

      board.cells[5][5].assignPawn(pawnSubmarine);
      board.select({ col: 5, row: 5 });
      selectedPawn = board.getSelected();

      expect(board.cells[5][5]).to.not.be.empty;
      expect(board.cells[5][5].pawn).to.not.be.null;
      expect(selectedPawn).to.not.be.to.null;
      expect(selectedPawn.col).to.be.equal(5);
      expect(selectedPawn.row).to.be.equal(5);
      expect(selectedPawn.range).to.be.greaterThan(0);
      expect(selectedPawn.type).to.be.equal(pawnSubmarine.type);
    });

  it("GIVEN that a Board is initialized " +
    "THEN it should have cells and ID assigned.", () => {
      const board = new Board();

      expect(board.getBoardId()).to.not.be.empty;
      expect(board.cells[1][1]).to.not.be.empty;
    });

  it("GIVEN that Board is initialized " +
    "WHEN Cell or Pawn is clicked " +
    "THEN it should be possible see the range of possible moves", () => {
      const board = new Board(),
        pawnSubmarine = new Pawn({
          type: PawnType.SUBMARINE
        }),
        pawnBattleship = new Pawn({
          type: PawnType.BATTLESHIP
        });

      board.cells[5][5].assignPawn(pawnSubmarine);
      board.cells[5][4].assignPawn(pawnBattleship);
      board.select({ col: 5, row: 5 });
      board.rangeCells(pawnSubmarine);

      expect(board.cells[5][5]).to.not.be.empty;
      expect(board.cells[5][5].pawn).to.not.be.null;
      expect(board.cells[3][3].inRange).to.be.true;
      expect(board.cells[5][4].inRange).to.be.false;
    });

  it("GIVEN that Board is initialized " +
    "AND Cell or Pawn is clicked " +
    "THEN it should be possible clean the range of previous selection", () => {
      const board = new Board(),
        pawnSubmarine = new Pawn({
          type: PawnType.SUBMARINE,
          range: 2
        });

      board.cells[1][1].assignPawn(pawnSubmarine);
      board.select({ col: 1, row: 1 });
      board.rangeCells(pawnSubmarine);

      expect(board.cells[1][1]).to.not.be.empty;
      expect(board.cells[1][1].pawn).to.not.be.null;
      expect(board.cells[0][0].inRange).to.be.true;
    });

  it("GIVEN I have a Board with Cells and one Pawn assigned to a random Cell (Origin) " +
    "WHEN I want to move the Pawn to new Cell (Destination) " +
    "THEN both Cells (Origin and Destination) should update their status", () => {
      const board = new Board(),
        pawnSubmarine = new Pawn({
          type: PawnType.SUBMARINE,
          range: 2
        });

      board.cells[1][1].assignPawn(pawnSubmarine);
      expect(board.cells[1][1].pawn).to.not.be.null;
      expect(board.cells[1][2].pawn).to.be.null;

      board.cells[1][2].assignPawn(pawnSubmarine);
      expect(board.cells[1][1].pawn).to.be.null;
      expect(board.cells[1][2].pawn).to.not.be.null;
    });
});
