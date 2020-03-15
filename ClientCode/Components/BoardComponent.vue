<template>
  <b-container id="board" class="my-2">
    <b-row
      v-for="(columns, rowIndex) in board.cells"
      :key="`1${rowIndex}`"
      no-gutters
    >
      <b-col v-for="(cell, colIndex) in columns" :key="`2${colIndex}`">
        <cell :cell-data="cell" class="cell" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Board from "../GameEngine/board.js";
import Cell from "./CellComponent.vue";

export default {
  name: "BoardComponent",
  components: { Cell },
  props: {
    board: {
      type: Board,
      default: null
    }
  },
  mounted() {
    this.$root.$on("cell-click", this.onCellClick);
  },
  methods: {
    onCellClick(payload) {
      console.debug("event-on: cell-click");

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
        col: cell.colIndex,
        row: cell.rowIndex
      });

      this.board.cleanRange();

      const selectedPawn = this.board.getSelected();

      if (selectedPawn) {
        this.board.rangeCells(selectedPawn);
      }
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
