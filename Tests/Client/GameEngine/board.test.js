/* eslint-disable prefer-destructuring */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-expressions */
/* global describe, it */

import {expect} from 'chai';
import Board from '../../../ClientCode/GameEngine/board.js';
import {FieldType} from '../../../ClientCode/GameEngine/gameEnums';

describe('Game Engine requirements', () => {
    it('Creating a board and checking whether fields have been created.', () => {
        const board = new Board();

        expect(board.getBoardId()).to.not.be.empty;
        expect(board.fields[1][1]).to.not.be.empty;
    });

    it('Checking whether the field has the correct information assigned', () => {
        const board = new Board(),
         field = board.fields[1][1];

        expect(field).to.not.be.empty;
        expect(field.getFieldId()).to.not.be.empty;
        expect(field.colIndex).to.be.equal(1);
        expect(field.rowIndex).to.be.equal(1);
        expect(field.pawn).to.be.null;
        expect(field.type).to.be.equal(FieldType.PLAYER_ONE_PORT);
    })
});
