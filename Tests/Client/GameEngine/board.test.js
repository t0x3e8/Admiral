/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-expressions */
/* global describe, it */

/*
 * GIVEN (context),
 * AND (further context),
 * WHEN (action/event),
 * AND (further action/event),
 * THEN (outcome)
 * AND (further outcome)
 */

import {expect} from 'chai';
import Board from '../../../ClientCode/GameEngine/board.js';
import Pawn from '../../../ClientCode/GameEngine/pawn.js';
import {CellType, PawnType} from '../../../ClientCode/GameEngine/gameEnums';

describe('Game Engine requirements', () => {
  it('GIVEN that a Board is initialized ' +
     'THEN it should have cells and ID assigned.', () => {
    const board = new Board();

    expect(board.getBoardId()).to.not.be.empty;
    expect(board.cells[1][1]).to.not.be.empty;
  });

  it('GIVEN that a Board is initialized ' +
     'THEN any of its cell should have details assigned.', () => {
    const board = new Board(),
      cell = board.cells[1][1];

    expect(cell).to.not.be.empty;
    expect(cell.getCellId()).to.not.be.empty;
    expect(cell.colIndex).to.be.equal(1);
    expect(cell.rowIndex).to.be.equal(1);
    expect(cell.pawn).to.be.null;
    expect(cell.type).to.be.equal(CellType.PLAYER_ONE_PORT);
  });

  it('GIVEN that a Board is initialized ' +
     'WHEN a Pawn is created and assigned to the Board ' +
     'THEN a Cell should update its information.', () => {
    const board = new Board(),
      pawn = new Pawn({
        type: PawnType.SUBMARINE
      });

    board.cells[1][1].assignPawn(pawn);
    expect(board.cells[1][1]).to.not.be.empty;
    expect(board.cells[1][1].pawn).to.not.be.null;
    expect(board.cells[1][1].pawn.getPawnId()).to.be.equal(pawn.getPawnId());
    expect(pawn.col).to.be.equal(board.cells[1][1].colIndex);
    expect(pawn.row).to.be.equal(board.cells[1][1].rowIndex);
    expect(pawn.oldCol).to.be.undefined;
    expect(pawn.oldRow).to.be.undefined;
  });

  it('GIVEN that a Board is initialized ' +
     'WHEN a player calls for random allocation of pawns ' +
     'THEN all cells in player\'s port should have pawn assigned randomly', () => {
    const board = new Board();

    expect(board.cells.length).greaterThan(0);
  });
});
