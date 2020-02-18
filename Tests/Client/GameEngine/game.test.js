/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* global describe, it */

import { expect } from "chai";
import Game from "./../../../ClientCode/GameEngine/game.js"
import Player from "./../../../ClientCode/GameEngine/player"

describe("GAME requirements", () => {
  it("GIVEN I have created a new game " +
    "THEN Game should have unique ID, History, and at least one player", () => {
      const game = new Game();

      expect(game.getGameId(), "Unique ID must be generated").to.not.be.empty;
      expect(game.history, "The History must be initiated").to.not.be.null;
      expect(game.board, "The Board must be initiated").to.not.be.null;
      expect(game.players.length, "At creation players not assigned").to.be.equal(0);
    });

  it("GIVEN I have create a new game " +
    "WHEN a Player joins the game AND a Player leaves the game" +
    "THEN I want these to be stored in History", () => {
      const game = new Game(),
        playerName = "TestUser",
        player = new Player({
          name: playerName
        });

      game.join(player);

      expect(game.players.length, "Player should be added to the game").to.be.equal(1);
      expect(game.players[0].name, "Player name should be as specified.").to.be.equal(playerName);
    })
});
