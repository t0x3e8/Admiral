/* eslint-disable no-magic-numbers */
/* eslint-disable prefer-destructuring */
/* global describe, it */

import { expect } from "chai";
import Board from "../../../ClientCode/GameEngine/board.js";
import Pawn from "../../../ClientCode/GameEngine/pawn.js";
import History from "../../../ClientCode/GameEngine/history.js";
import { PawnType } from "../../../ClientCode/GameEngine/gameEnums";

describe("History requirements", () => {
  it("GIVEN I have Board with one Pawn " +
    "WHEN I move that Pawn from one Cell to another " +
    "THEN I want to record the move AND be able to track it", () => {
      const board = new Board(),
        pawnSubmarine = new Pawn({
          type: PawnType.SUBMARINE,
          range: 2
        });

      board.cells[5][5].assignPawn(pawnSubmarine);

        

    });
});
