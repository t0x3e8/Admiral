/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-statements */
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
import PortBoard from "../../../ClientCode/GameEngine/portboard.js";
import { CellType, PawnType } from "../../../ClientCode/GameEngine/gameEnums";
import settings from "../../../ClientCode/GameEngine/settings.js";
import _ from "underscore";

describe("PORTBOARD requirements", () => {
  it(
    "GIVEN a PortBoard is created THEN only 6 rows should be displayed",
    () => {
      const board = new PortBoard(),
            numberOfRows = 6;

      expect(board.cells.length).to.be.equal(numberOfRows);
    }
  );

  it(
    "GIVEN I want to play a game with custom setup of ships in the Port " +
      "THEN Board should be limited to only Port view with random assignment of all pawns except Batteries and Mines",
    () => {
      const pawnsSettings = settings.pawns,
        board = new PortBoard(),
        portBatteryCells = _.filter(_.flatten(board.cells), (cell) => cell.type === CellType.PLAYER_TWO_BATTERY),
        portCells = _.filter(
          _.flatten(board.cells),
          (cell) => cell.type === CellType.PLAYER_TWO_ENTRANCE || cell.type === CellType.PLAYER_TWO_PORT
        ),
        battleshipCells = _.filter(portCells, (cell) => cell.pawn !== null && cell.pawn.type === PawnType.BATTLESHIP),
        missileCells = _.filter(portCells, (cell) => cell.pawn !== null && cell.pawn.type === PawnType.MISSILE),
        cruiserCells = _.filter(portCells, (cell) => cell.pawn !== null && cell.pawn.type === PawnType.CRUISER),
        destroyerCells = _.filter(portCells, (cell) => cell.pawn !== null && cell.pawn.type === PawnType.DESTROYER),
        submarineCells = _.filter(portCells, (cell) => cell.pawn !== null && cell.pawn.type === PawnType.SUBMARINE),
        escortCells = _.filter(portCells, (cell) => cell.pawn !== null && cell.pawn.type === PawnType.ESCORT),
        landingShipCells = _.filter(portCells, (cell) => cell.pawn !== null && cell.pawn.type === PawnType.LANDINGSHIP),
        mineCells = _.filter(portCells, (cell) => cell.pawn !== null && cell.pawn.type === PawnType.MINE);

      expect(portBatteryCells.length).to.be.equal(4);
      portBatteryCells.forEach(
        (cell) =>
          expect(cell).to.have.property("type", CellType.PLAYER_TWO_BATTERY) &&
          expect(cell).to.have.property("pawn").that.is.not.null
      );

      expect(battleshipCells.length).to.be.equal(
        _.find(pawnsSettings, (p) => p.typeId === PawnType.BATTLESHIP).fleetSize
      );
      expect(missileCells.length).to.be.equal(_.find(pawnsSettings, (p) => p.typeId === PawnType.MISSILE).fleetSize);
      expect(cruiserCells.length).to.be.equal(_.find(pawnsSettings, (p) => p.typeId === PawnType.CRUISER).fleetSize);
      expect(destroyerCells.length).to.be.equal(
        _.find(pawnsSettings, (p) => p.typeId === PawnType.DESTROYER).fleetSize
      );
      expect(submarineCells.length).to.be.equal(
        _.find(pawnsSettings, (p) => p.typeId === PawnType.SUBMARINE).fleetSize
      );
      expect(escortCells.length).to.be.equal(_.find(pawnsSettings, (p) => p.typeId === PawnType.ESCORT).fleetSize);
      expect(landingShipCells.length).to.be.equal(
        _.find(pawnsSettings, (p) => p.typeId === PawnType.LANDINGSHIP).fleetSize
      );
      expect(mineCells).to.be.empty;
    }
  );
});
