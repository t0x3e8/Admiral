/* eslint-disable no-magic-numbers */
/* global describe, it */

import { expect } from 'chai';
import Utils from '../../../ClientCode/GameEngine/Utils.js';

describe('Test covarage of utils methods', () => {
  it('GIVEN that a Utils is initialized ' +
    'THEN it should be possible to generate random number from 0 to {max}', () => {
      let result = -1,
        i = 0

      for (i; i < 20; i += 1) {
        result = Utils.getRandom(100)

        expect(result).to.be.within(0, 100)
      }
    });
})
