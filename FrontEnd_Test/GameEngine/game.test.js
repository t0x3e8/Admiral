/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* global describe, it */

import { expect } from "chai";
import Game from "./../../FrontEnd/GameEngine/game.js";
import Player from "./../../FrontEnd/GameEngine/player.js";
import { createGameResponseData } from "./serverResponses.js";
import { GameState } from "../../FrontEnd/GameEngine/gameEnums.js";

describe("GAME requirements", () => {
  it("GIVEN I have created a new game THEN Game should have unique ID, History, and at least one player", () => {
    const gameId = "6eea7a6d-ffda-4038-aea4-6b72f701f17f",
      game = new Game(gameId);

    expect(game.gameId, "Unique ID must be generated").to.be.equal(gameId);
    expect(game.history, "The History must be initiated").to.not.be.null;
    expect(game.history.records.length, "The History must record Game-Created event").to.be.equal(1);
    expect(game.board, "The Board must be initiated").to.not.be.null;
    expect(game.players, "At creation players not assigned").to.be.empty;
    expect(game.state).to.be.equal(GameState.NOT_STARTED);
  });

  it(
    "GIVEN a new game WHEN the first Player joins " +
      "THEN Game should reflect that in the state of board, game and history",
    () => {
      const game = new Game(createGameResponseData.id),
        player = new Player(createGameResponseData.players),
        pawnsData = createGameResponseData.pawns;

      expect(game.history.getRecordNumber()).to.be.equal(1);
      game.join(player, pawnsData);

      expect(game.players.length, "Player should be added to the game").to.be.equal(1);
      expect(game.players[0].playerId).to.be.equal(player.id);
      expect(game.players[0].name).to.be.equal(player.name);
      expect(game.board.toPawnArray().length).to.be.equal(pawnsData.length);
      expect(game.history.getRecordNumber(), "History should track player join").to.be.equal(2);
    }
  );

  it(
    "GIVEN a new Game without gameId THEN an error should be thrown",
    () => {
      expect(() => new Game()).to.throw("gameId must be specified");
    }
  );
});
