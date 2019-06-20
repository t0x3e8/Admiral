/* eslint-disable prefer-destructuring */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-expressions */
/* global describe, it */

import {expect} from 'chai';
import Board from '../../../ClientCode/GameEngine/board.js';
import {CellType} from '../../../ClientCode/GameEngine/gameEnums';

describe('Game Engine requirements', () => {
    it('Creating a board and checking whether cells have been created.', () => {
        const board = new Board();

        expect(board.getBoardId()).to.not.be.empty;
        expect(board.cells[1][1]).to.not.be.empty;
    });

    it('Checking whether the cell has the correct information assigned', () => {
        const board = new Board(),
         cell = board.cells[1][1];

        expect(cell).to.not.be.empty;
        expect(cell.getCellId()).to.not.be.empty;
        expect(cell.colIndex).to.be.equal(1);
        expect(cell.rowIndex).to.be.equal(1);
        expect(cell.pawn).to.be.null;
        expect(cell.type).to.be.equal(CellType.PLAYER_ONE_PORT);
    })
});
