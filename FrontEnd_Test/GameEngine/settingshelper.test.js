/* global describe, it */
/* eslint-disable no-magic-numbers */

import { expect } from "chai";
import SettingsHelper from "../../FrontEnd/GameEngine/utils/settingsHelper";
import { PawnType } from "../../FrontEnd/GameEngine/gameEnums";

describe("SettingsHelper requirements", () => {
  it("GIVEN pawn type THEN a pawn settings should be returned", () => {
    const submarineType = PawnType.SUBMARINE,
        submarine = SettingsHelper.getPawnByType(submarineType);

    expect(submarine.typeId, "Type must be Submarine").to.be.equal(submarineType);
    expect(submarine.name, "The name must be Submarine").to.be.equal("Submarine");
    expect(submarine.svgName, "SVG name must be submarine.svg").to.be.equal("submarine.svg");
    expect(submarine.range, "The range must be 2").to.equal(2);
    expect(submarine.fleetSize, "Fleet size to be 4").to.be.equal(4);
  });

  it("GIVEN pawn type THEN a collection of pawns which wins agains the specified pawn to be returned", () => {
    const submarineType = PawnType.SUBMARINE,
        winsAgainstCollection = SettingsHelper.pawnsWinAgainst(submarineType);

    expect(winsAgainstCollection.length, "The length of collection must be 5").to.be.equal(5);
  });

  it("GIVEN pawn type THEN a collection of pawns which are defeated by the specified pawn to be returned", () => {
    const submarineType = PawnType.SUBMARINE,
    winsAgainstCollection = SettingsHelper.pawnsDefeatedBy(submarineType);

    expect(winsAgainstCollection.length, "The length of collection must be 7").to.be.equal(7);
  });
});
