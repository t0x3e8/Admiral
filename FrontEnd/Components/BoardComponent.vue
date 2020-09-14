<template>
  <b-container id="board" class="my-2">
    <b-row v-for="(columns, rowIndex) in board.cells" :key="`1${rowIndex}`" no-gutters>
      <b-col v-for="(cell, colIndex) in columns" :key="`2${colIndex}`">
        <cell :cell-data="cell" class="cell" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import GameBoard from "../GameEngine/gameBoard.js";
  import Cell from "./CellComponent.vue";
  import Board from "../GameEngine/board";
  import { BOARD_CELL_CLICKED, BOARD_PAWN_SELECTED } from "./../eventsTypes.js";

  export default {
    name: "BoardComponent",
    components: { Cell },
    props: {
      board: {
        type: [GameBoard, Board],
        default: null
      },
      isTurnOpen: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.$root.$on(BOARD_CELL_CLICKED, this.onCellClick);
    },
    beforeDestroy() {
      this.$root.$off(BOARD_CELL_CLICKED, this.onCellClick);
    },
    methods: {
      onCellClick(payload) {
        console.debug(`event-on: ${BOARD_CELL_CLICKED}`);

        if (this.isTurnOpen === false) {
          return;
        }

        const cell = this.board.cells[payload.row][payload.col];

        if (cell.inRange) {
          // Execute Move or Attack
          this.moveOrAttack(cell);
        } else {
          // Select a Cell with Pawn and calculate the range
          this.selectAndRange(cell);
        }
      },
      selectAndRange(cell) {
        this.board.select({
          col: cell.col,
          row: cell.row
        });

        this.board.cleanRange();

        const selectedPawn = this.board.getSelected();

        if (selectedPawn && selectedPawn.selected) {
          this.board.rangeCells(selectedPawn);
        }

        console.debug(`event-emit: ${BOARD_PAWN_SELECTED}`);
        this.$root.$emit(BOARD_PAWN_SELECTED, selectedPawn);
      },
      moveOrAttack(destCell) {
        const selectedPawn = this.board.getSelected(),
          originCell = this.board.cells[selectedPawn.row][selectedPawn.col];

        if (originCell && destCell.pawn === null) {
          this.board.move(originCell, destCell);
          this.board.cleanRange();
        }
      }
    }
  };
</script>

<style>
  .cell {
    width: 100%;
    padding-bottom: 100%;
    border: 1px white solid;
  }
</style>
