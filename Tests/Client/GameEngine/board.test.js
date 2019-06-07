/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-expressions */
/* global describe */

import chai from 'chai';
import Board from '../../../ClientCode/GameEngine/board.js';

describe('Game Engine requirements', () => {
    const board = new Board();

    chai.expect(board.getBoardId()).to.not.be.empty;
    chai.expect(board.fields[11][17]).to.not.be.empty;
});
