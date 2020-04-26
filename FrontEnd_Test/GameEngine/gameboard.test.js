/* eslint-disable implicit-arrow-linebreak */
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

import { createGameResponseData } from "./serverResponses.js";
import { PawnType } from "../../FrontEnd/GameEngine/gameEnums";
import { expect } from "chai";
import GameBoard from "../../FrontEnd/GameEngine/gameboard.js";
import Pawn from "../../FrontEnd/GameEngine/pawn.js";
import _ from "underscore";
import settings from "../../FrontEnd/GameEngine/settings.js";

describe("GAMEBOARD requirements", () => {
  it("GIVEN that a Board is created THEN it should have number of Row & Col matching Settings AND boardId to be null", () => {
    const board = new GameBoard(),
      { numberOfColumns, numberOfRows } = settings.board;

    expect(board.cells.length).to.be.equal(numberOfRows);
    expect(board.cells[0].length).to.be.equal(numberOfColumns);
    expect(board.boardId).to.be.null;
  });

  it("GIVEN that a Board is created THEN all Cells properties should match map from Settings and defaults", () => {
    const board = new GameBoard(),
      boardCells = _.flatten(board.cells),
      { map } = settings.board,
      mapSettingsCells = _.flatten(map);

    expect(boardCells.length).to.be.equal(mapSettingsCells.length);
    for (let i = 0; i < boardCells.length; i += 1) {
      expect(boardCells[i].type).to.be.equal(mapSettingsCells[i]);
      expect(boardCells[i].pawn).to.be.null;
      expect(boardCells[i].inRange).to.be.false;
    }
  });

  it(
    "GIVEN that a Board is created " +
      "WHEN a Pawn is assigned to the Board " +
      "THEN a Cell should update its information.",
    () => {
      const board = new GameBoard(),
        pawn = new Pawn(PawnType.SUBMARINE),
        colIndex = 10,
        rowIndex = 10,
        boardCell = board.cells[rowIndex][colIndex];

      board.assignPawn(boardCell, pawn);

      expect(boardCell.pawn).to.not.be.null;
      expect(pawn.col).to.be.equal(boardCell.col);
      expect(pawn.row).to.be.equal(boardCell.row);
      expect(pawn.oldCol).to.be.equal(0);
      expect(pawn.oldRow).to.be.equal(0);
    }
  );

  it(
    "Given arranged Pawns (ships) in the port " +
      "THEN Board should return the list of all Pawns with information about type and position",
    () => {
      const board = new GameBoard(),
        pawn1 = new Pawn(PawnType.SUBMARINE),
        pawn2 = new Pawn(PawnType.BATTLESHIP);

      let pawnsOnBoard = [];

      board.assignPawn(board.cells[1][1], pawn1);
      board.assignPawn(board.cells[5][5], pawn2);
      pawnsOnBoard = board.toPawnArray();

      expect(pawnsOnBoard.length).to.be.equal(2);

      for (let i = 0; i < pawnsOnBoard.length; i += 1) {
        const cell = board.cells[pawnsOnBoard[i].row][pawnsOnBoard[i].col];

        expect(pawnsOnBoard[i].type).to.not.be.eq(0);
        expect(pawnsOnBoard[i].col).to.be.equal(cell.col);
        expect(pawnsOnBoard[i].row).to.be.equal(cell.row);
      }
    }
  );

  it(
    "GIVEN that Board is created " +
      "AND a Pawn has been selected by an user " +
      "THEN it should be possible to determine the selected Pawn",
    () => {
      const board = new GameBoard(),
        pawnSubmarine = new Pawn(PawnType.SUBMARINE);

      let selectedPawn = null;

      board.assignPawn(board.cells[5][5], pawnSubmarine);
      board.select({
        col: 5,
        row: 5
      });
      selectedPawn = board.getSelected();

      expect(board.cells[5][5]).to.not.be.empty;
      expect(board.cells[5][5].pawn).to.not.be.null;
      expect(selectedPawn).to.not.be.to.null;
      expect(selectedPawn.col).to.be.equal(5);
      expect(selectedPawn.row).to.be.equal(5);
      expect(selectedPawn.oldCol).to.be.equal(0);
      expect(selectedPawn.oldRow).to.be.equal(0);
      expect(selectedPawn.type).to.be.equal(pawnSubmarine.type);
    }
  );

  it(
    "GIVEN that Board is created " +
      "WHEN Cell or Pawn is clicked " +
      "THEN it should be possible see the range of possible moves",
    () => {
      const board = new GameBoard(),
        pawnSubmarine = new Pawn(PawnType.SUBMARINE),
        pawnBattleship = new Pawn(PawnType.BATTLESHIP);

      board.assignPawn(board.cells[5][5], pawnSubmarine);
      board.assignPawn(board.cells[5][4], pawnBattleship);
      board.select({
        col: 5,
        row: 5
      });
      board.rangeCells(pawnSubmarine);

      expect(board.cells[5][5]).to.not.be.empty;
      expect(board.cells[5][5].pawn).to.not.be.null;
      expect(board.cells[3][3].inRange).to.be.true;
      expect(board.cells[5][4].inRange).to.be.false;
    }
  );

  it(
    "GIVEN that Board is created " +
      "AND Cell or Pawn is selected " +
      "THEN it should be possible clean the range of previous selection",
    () => {
      const board = new GameBoard(),
        pawnSubmarine = new Pawn(PawnType.SUBMARINE);

      board.assignPawn(board.cells[1][1], pawnSubmarine);
      board.select({
        col: 1,
        row: 1
      });
      board.rangeCells(pawnSubmarine);

      expect(pawnSubmarine.range, "This test requires the Range at least 2").to.gte(2);
      expect(board.cells[1][1]).to.not.be.empty;
      expect(board.cells[1][1].pawn).to.not.be.null;
      expect(board.cells[0][0].inRange).to.be.true;
    }
  );

  it(
    "GIVEN a Board with one Pawn is assigned to a random Cell (Origin) " +
      "WHEN I want to move the Pawn to new Cell (Destination) " +
      "THEN both Cells (Origin and Destination) should update their status",
    () => {
      const board = new GameBoard(),
        pawnSubmarine = new Pawn(PawnType.SUBMARINE);

      expect(pawnSubmarine.range, "This test requires the Range at least 2").to.gte(2);

      board.assignPawn(board.cells[1][1], pawnSubmarine);
      expect(board.cells[1][1].pawn).to.not.be.null;
      expect(board.cells[1][2].pawn).to.be.null;

      board.move(board.cells[1][1], board.cells[1][2]);
      expect(board.cells[1][1].pawn).to.be.null;
      expect(board.cells[1][2].pawn).to.not.be.null;
    }
  );

  it("GIVEN a Player with Pawns from PortSetup THEN Board should provide possibility to add pawns to the board", () => {
    const board = new GameBoard(),
      pawns = createGameResponseData.pawns;

    expect(board.toPawnArray().length).to.be.equal(0);

    board.setPawns(pawns);
    expect(board.toPawnArray().length).to.be.equal(pawns.length);
  });
});
