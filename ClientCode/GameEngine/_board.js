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
   * Create an array of board fields, based on the settings.board.map
   * @returns {array} Two dimentional array of fields
   */
  // eslint-disable-next-line max-statements
  static createBoardFields() {
    const {map} = settings.board,
    {numberOfColumns} = settings.board,
    {numberOfRows} = settings.board,
      fields = [];
    let colPosition = 0,
      rowPosition = 0,
      fieldType = 0,
      row = [];

    for (colPosition = 0; colPosition < numberOfColumns; colPosition += 1) {
      row = [];
      for (rowPosition = 0; rowPosition < numberOfRows; rowPosition += 1) {
        fieldType = map[colPosition][rowPosition];
        row[rowPosition] = new Field({
          type: fieldType,
          columnIndex: colPosition,
          rowIndex: rowPosition
        });
      }
      fields[colPosition] = row;
    }

    return fields;
  }

  /**
   * Initialize board with the starting setup of pawns.
   * @param {Player} player1 Player number 1
   * @param {Player} player2 Player number 2
   * @returns {void}
   */
  init(player1, player2) {
    const that = this;

    that.setPawnsOnFields(player1.pawns, player1);
    that.setPawnsOnFields(player2.pawns, player2);
  }

  /**
   * Set pawns on board
   * @param {array} pawns Set of pawns to be placed on fields
   * @param {player} player Link pawns with player
   * @returns {void}
   */
  setPawnsOnFields(pawns, player) {
    const that = this;

    each(pawns, pawn => {
      const {col} = pawn,
        {row} = pawn;

      pawn.setPlayer(player);
      that.fields[col][row].pawn = pawn;
    });
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

  /**
   * The range of the ship is determined on the board
   * @param {uuid} pawn Pawn for which the range should be calculate
   * @returns {array} Available moves for the pawn are returned in the form of an array
   */
  getPawnRange(pawn) {
    const that = this,
      pawnRange = find(settings, element => element.typeId === pawn.type).range,
      fieldsInRange = [],
      colMax = pawn.col + pawnRange,
      rowMin = pawn.row - pawnRange,
      rowMax = pawn.row + pawnRange;

    let col = pawn.col - pawnRange,
      row = rowMin,
      pawnInField = null;

    /*
     * Each field within the square range is tested, if:
     * - the field has no pawns in it, mark the field as in range,
     * - the field has a pawn, but the pawn is opponent's pawn, mark the field as in range,
     */
    for (col; col <= colMax; col += 1) {
      if (that.fields[col] !== null) {
        for (row; row <= rowMax; row += 1) {
          if (that.fields[col][row] !== null) {
            pawnInField = that.fields[col][row].pawn;
            let areDiffrentPlayers = false;

            // eslint-disable-next-line max-depth
            if (pawnInField.getPlayer()) {
              areDiffrentPlayers = pawnInField.getPlayer().getPlayerId() !== pawn.getPlayer().getPlayerId();
            }

            // eslint-disable-next-line max-depth
            if (!pawnInField || areDiffrentPlayers) {
              fieldsInRange.push(that.fields[col][row]);
            }
          }
        }
        row = rowMin;
      }
    }

    return fieldsInRange;
  }
}

export default Board;
