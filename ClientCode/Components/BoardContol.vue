<template>
  <b-container
    id="board"
    class="my-2"
  >
    <b-row
      v-for="(columns, rowIndex) in board.cells"
      :key="`1${rowIndex}`"
      no-gutters
    >
      <b-col
        v-for="(cell, colIndex) in columns"
        :key="`2${colIndex}`"
      >
        <cell-control
          :cell-data="cell"
          class="cell"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Board from "../GameEngine/board.js";
  import CellControl from "./CellControl.vue";

  export default {
    name: "BoardControl",
    components: { CellControl },
    data () {
      const board = new Board();

      return {
        board
      };
    },
    mounted() {
      this.$root.$on("cell-click", this.onCellClick);
    },
    methods: {
      onCellClick(payload) {
        console.debug("event-on: cell-click");

        this.board.select({
          col: payload.col,
          row: payload.row
        });

        this.board.cleanRange();

        const selectedPawn = this.board.getSelected();

        if (selectedPawn) {
          this.board.rangeCells(selectedPawn);
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
