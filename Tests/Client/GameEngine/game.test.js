/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* global describe, it */

import { expect } from "chai";
import Game from "./../../../ClientCode/GameEngine/game.js"

describe("GAME requirements", () => {
  it("GIVEN I have created a new game " +
    "THEN Game should have unique ID, History, and at least one player", () => {
        const game = new Game();

        expect(game.getGameId(), "Unique ID must be generated").to.not.be.empty;
        expect(game.history, "The History must be initiated").to.not.be.null;
        expect(game.board, "The Board must be initiated").to.not.be.null;
        expect(game.players.length, "At creation players not assigned").to.be.equal(0);
    });
});
