<template>
  <b-container class="board">
    <b-row class="row-eq-height" v-for="(columns, rowIndex) in cells" :key="`1${rowIndex}`" no-gutters="true">
      <b-col v-for="(cell, colIndex) in columns" :key="`2${colIndex}`">
        <cell-control :cellData="cell" class="cell" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Board from "../GameEngine/board.js";
import CellControl from "./CellControl.vue";

export default {
  components: { CellControl },
  data() {
    let board = new Board();
    return {
      cells: board.cells
    };
  }
};
</script>

<style>
.cell {
  background-color: pink;
  width: 100%;
  padding-bottom: 100%;
  border: 1px blue solid;
}
</style>
