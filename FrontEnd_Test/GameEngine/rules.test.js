/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import Cell from "../../FrontEnd/GameEngine/cell.js";
import { CellType, PawnType } from "../../FrontEnd/GameEngine/gameEnums";
import Rules from "../../FrontEnd/GameEngine/Utils/Rules.js";
import Pawn from "../../FrontEnd/GameEngine/pawn.js";
import Board from "../../FrontEnd/GameEngine/board.js";

/* global describe, it */

/*
 * GIVEN (context),
 * AND (further context),
 * WHEN (action/event),
 * AND (further action/event),
 * THEN (outcome)
 * AND (further outcome)
 */

describe("RULES to calculate cell's range requirements", () => {
  it(
    "GIVEN a Pawn needs to determine its range " +
      "WHEN type of Cell is SEA and type of Adjacent Cell is PORT " +
      "OR type of Cell is PORT and type of Adjacent Cell is SEA " +
      "THEN Rule should return negative result",
    () => {
      const seaCell = new Cell({ type: CellType.SEA }),
        port1Cell = new Cell({ type: CellType.PLAYER_ONE_PORT }),
        port2Cell = new Cell({ type: CellType.PLAYER_TWO_PORT }),
        neutralCell = new Cell({ type: CellType.NEUTRAL }),
        entrance1Cell = new Cell({ type: CellType.PLAYER_ONE_ENTRANCE }),
        entrance2Cell = new Cell({ type: CellType.PLAYER_TWO_ENTRANCE });

      expect(Rules.isPairOfSeaAndPort(seaCell, seaCell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(seaCell, port1Cell)).to.be.true;
      expect(Rules.isPairOfSeaAndPort(seaCell, port2Cell)).to.be.true;
      expect(Rules.isPairOfSeaAndPort(seaCell, neutralCell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(seaCell, entrance1Cell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(seaCell, entrance2Cell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port1Cell, seaCell)).to.be.true;
      expect(Rules.isPairOfSeaAndPort(port1Cell, port1Cell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port1Cell, port2Cell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port1Cell, neutralCell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port1Cell, entrance1Cell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port1Cell, entrance2Cell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port2Cell, seaCell)).to.be.true;
      expect(Rules.isPairOfSeaAndPort(port2Cell, port1Cell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port2Cell, port2Cell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port2Cell, neutralCell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port2Cell, entrance1Cell)).to.be.false;
      expect(Rules.isPairOfSeaAndPort(port2Cell, entrance2Cell)).to.be.false;
    }
  );

  it(
    "GIVEN a Pawn needs to determine its range " +
      "WHEN Cell has been already visited (by other path range) " +
      "THEN Rule should return negative result",
    () => {
      const cell = new Cell({ type: CellType.SEA });

      cell.inRange = true;
      expect(Rules.isCellInRange(cell)).to.be.true;

      cell.inRange = false;
      expect(Rules.isCellInRange(cell)).to.be.false;
    }
  );

  it(
    "GIVEN a Pawn needs to determine its range " +
      "WHEN Cell has a Pawn assigned to it " +
      "THEN Rule should return tru or false depending on the pawn presence",
    () => {
      const board = new Board();

      expect(Rules.isEnemyPawnInCell(board.cells[0][0])).to.be.false;
      expect(Rules.isPawnInCell(board.cells[0][0])).to.be.false;

      board.assignPawn(board.cells[0][0], new Pawn(PawnType.BATTLESHIP));
      expect(Rules.isEnemyPawnInCell(board.cells[0][0])).to.be.false;
      expect(Rules.isPawnInCell(board.cells[0][0])).to.be.true;

      board.assignPawn(board.cells[0][0], new Pawn(PawnType.SUBMARINE));
      expect(Rules.isEnemyPawnInCell(board.cells[0][0])).to.be.false;
      expect(Rules.isPawnInCell(board.cells[0][0])).to.be.true;

      board.assignPawn(board.cells[0][0], new Pawn(PawnType.ENEMY));
      expect(Rules.isEnemyPawnInCell(board.cells[0][0])).to.be.true;
      expect(Rules.isPawnInCell(board.cells[0][0])).to.be.true;
    }
  );
});
