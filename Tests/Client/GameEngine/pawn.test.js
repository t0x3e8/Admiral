/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* global describe, it */

import Pawn from "../../../ClientCode/GameEngine/pawn";
import { expect } from "chai";
import settings from "../../../ClientCode/GameEngine/settings";
import { createGameResponseData } from "./serverResponses";

/*
 * GIVEN (context),
 * AND (further context),
 * WHEN (action/event),
 * AND (further action/event),
 * THEN (outcome)
 * AND (further outcome)
 */

describe("PAWNS requirements", () => {
  it("GIVEN a Pawn has no Type specified OR Type does not match settings THEN it should throw Errors", () => {
    expect(() => new Pawn()).to.throw("Pawn Type must be specified");
    expect(() => new Pawn(999999)).to.throw("No Pawn of 999999 in Settings");
  });

  it("GIVEN that the Pawn has correct Type specified THEN defaul settings should be read", () => {
    const [firstPawnSetting] = settings.pawns,
      pawn = new Pawn(firstPawnSetting.typeId);

    expect(pawn).not.to.be.null;
    expect(pawn.pawnId).to.be.null;
    expect(pawn.type).to.be.equal(firstPawnSetting.typeId);
    expect(pawn.col).to.be.equal(0);
    expect(pawn.row).to.be.equal(0);
    expect(pawn.oldCol).to.be.equal(0);
    expect(pawn.oldRow).to.be.equal(0);
    expect(pawn.playerId).to.be.null;
    expect(pawn.selected).to.be.false;
    expect(pawn.range).to.be.equal(firstPawnSetting.range);
    expect(pawn.svgName).to.be.equal(firstPawnSetting.svgName);
    expect(pawn.name).to.be.equal(firstPawnSetting.name);
  });

  it(
    "GIVEN that the Pawn Data has been received from Server " +
      "WHEN Client sent them earlier " +
      "THEN the Pawn instance should be updated accordingly",
    () => {
      const [firstPawnDataFromServer] = createGameResponseData.pawns,
        pawn = new Pawn(firstPawnDataFromServer.type);

      pawn.update(firstPawnDataFromServer);

      expect(pawn).not.to.be.null;
      expect(pawn.type).to.be.equal(firstPawnDataFromServer.type);
      expect(pawn.col).to.be.equal(firstPawnDataFromServer.col);
      expect(pawn.row).to.be.equal(firstPawnDataFromServer.row);
      expect(pawn.oldCol).to.be.equal(firstPawnDataFromServer.oldCol);
      expect(pawn.oldRow).to.be.equal(firstPawnDataFromServer.oldRow);
      expect(pawn.playerId).to.be.equal(firstPawnDataFromServer.playerId);
    }
  );

  it("GIVEN that the Pawn is already updated THEN the next attempt should throw error", () => {
    const [firstPawnDataFromServer] = createGameResponseData.pawns,
      pawn = new Pawn(firstPawnDataFromServer.type);

    expect(() => pawn.update(firstPawnDataFromServer)).to.not.throw();
    expect(() => pawn.update(firstPawnDataFromServer)).to.throw("Pawn is already updated");
  });

  it("GIVEN that the Pawn type does not match pawnData Type THEN error should be thrown", () => {
    const notMatchingPawnType = 9,
      [firstPawnDataFromServer] = createGameResponseData.pawns,
      pawn = new Pawn(notMatchingPawnType);

    expect(() => pawn.update(firstPawnDataFromServer)).to.throw("Type of Pawn don't match the pawnData");
  });

  it("GIVEN that the Pawn has changed its position THEN the Pawn position properties should reflect the change", () => {
    const [firstPawnSetting] = settings.pawns,
      pawn = new Pawn(firstPawnSetting.typeId),
      newCol = pawn.col + 2,
      newRow = pawn.row + 3,
      oldCol = pawn.col,
      oldRow = pawn.row;

    pawn.updatePosition(newCol, newRow);
    expect(pawn.col).to.be.equal(newCol);
    expect(pawn.row).to.be.equal(newRow);
    expect(pawn.oldCol).to.be.equal(oldCol);
    expect(pawn.oldRow).to.be.equal(oldRow);
  });
});
