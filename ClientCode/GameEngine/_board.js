/* eslint-disable */
import uuid from 'uuid/v1';
import settings from './settings.js';
import Field from './field.js';
import {each, find} from 'underscore';
import Combat from './combat.js';

/**
 * The Board object represents the structure of the board, including characteristics  of board eg.
 * fields of ports and the neutral fields. In addition, it shows the setup of pawns on the board of players.
 * @returns {void}
 */
class Board {
  constructor() {
    const that = this,
      boardId = uuid();

    that.fields = Board.createBoardFields();

    /**
     * @returns {uuid} gets unique board id
     */
    that.getBoardId = function() {
      return boardId;
    };
  }

  /**
   * Processes the turn based on the pawns sets and returns game result.
   * @param {Player} player1 Player number 1
   * @param {Player} player2 Player number 2
   * @return {number} Unresolved: 0; Player1 wins: 1; Player2 wins: 2
   */
  processTurn(player1, player2) {
    const that = this;

    that.processMoveAndCombat(player1);
    that.processMoveAndCombat(player2);

    return that.determineGameResult(player1, player2);
  }

  /**
   * Pawns which changed their positions will be moved and any attacks will be executed.
   * @param {player} player A player which turn has to be processed.
   * @returns {void}
   */
  processMoveAndCombat(player) {
    const that = this;
    let combat = null,
      combatResult = null,
      targetPawn = null;

    each(player.movedPawns, currentPawn => {
      if (currentPawn.col !== null && currentPawn.row !== null) {
        targetPawn = that.fields[currentPawn.col][currentPawn.row].pawn;
        if (targetPawn) {
          // This is a Combat
          combat = new Combat();
          combatResult = combat.process(currentPawn.type, targetPawn.type);
          if (combatResult === -1) {
            // The attacker lost: pawn's location is set to null and the field on board is empt
            that.fields[currentPawn.oldCol][currentPawn.oldRow].pawn = null;
            currentPawn.updatePosition(null, null);
          } else if (combatResult === 0) {
            // Attacker and defender lost: pawns' location are set to null and fields on board are empty
            that.fields[currentPawn.col][currentPawn.row].pawn = null;
            that.fields[currentPawn.oldCol][currentPawn.oldRow].pawn = null;
            currentPawn.updatePosition(null, null);
            targetPawn.updatePosition(null, null);
          } else if (combatResult === 1) {
            // The defender lost: pawn's location is set to null and the field on board is empty
            that.fields[currentPawn.col][currentPawn.row].pawn = currentPawn;
            currentPawn.updatePosition(currentPawn.col, currentPawn.row);
            targetPawn.updatePosition(null, null);
          }
        } else {
          // This is a Move
          that.fields[currentPawn.col][currentPawn.row].pawn = currentPawn;
          currentPawn.updatePosition(currentPawn.col, currentPawn.row);
        }
      }
    });
  }

  /**
   * Once completed movements the game status is checked.
   * @param {Player} player1 Player number 1
   * @param {Player} player2 Player number 2
   * @return {number} Unresolved: 0; Player1 wins: 1; Player2 wins: 2
   */
  static determineGameResult(player1, player2) {
    if (player1.pawns.length === 0) {
      return 2;
    } else if (player2.pawns.length === 0) {
      return 1;
    }

    return 0;
  }
}

export default Board;
