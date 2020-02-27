/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* global describe, it */

import { expect } from "chai";
import Player from "../../../ClientCode/GameEngine/player";

describe("Player requirements", () => {
  it("GIVEN I have Player object created " +
    "THEN I want it to have unique ID, and the name of the player", () => {
      const playerName = "TestPlayer",
        player = new Player({
          name: playerName
        });

      expect(player, "Player cannot be null").to.not.be.null;
      expect(player.getPlayerId(), "An unique ID must be created for Player object").to.not.be.empty;
      expect(player.name, "The Player name should be specified").to.be.equal(playerName);
      expect(player.pawns.length, "Player's pawns are not specified yet").to.be.equal(0);
    });
});
