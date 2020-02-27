/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
/* global describe, it */

import { expect } from "chai";
import History from "../../../ClientCode/GameEngine/history";

describe("History requirements", () => {
  it("GIVEN I have History created " +
    "THEN I want it to have unique ID,", () => {
      const history = new History();

      expect(history, "History cannot be null").to.not.be.null;
      expect(history.getHistoryId(), "An unique ID must be created for History object").to.not.be.empty;
      expect(history.records.length, "The records array must be init.").to.be.equal(0);
    });
});
