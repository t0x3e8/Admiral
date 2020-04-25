/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* global describe, it */

import { expect } from "chai";
import Player from "../../../ClientCode/GameEngine/player";
import { createGameResponseData } from "./serverResponses.js";

describe("PLAYER requirements", () => {
  it("GIVEN a Player object has been created THEN it should have id and name", () => {
      const [firstPlayerData] = createGameResponseData.players,
        player = new Player(firstPlayerData);

      expect(player, "Player cannot be null").to.not.be.null;
      expect(player.playerId, "An unique ID must be created for Player object").to.be.equal(firstPlayerData.id);
      expect(player.name, "The Player name should be specified").to.be.equal(firstPlayerData.name);
    });
});
