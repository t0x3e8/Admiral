<template>
  <b-container id="port" class="my-2">
    <b-row v-for="(columns, rowIndex) in board.cells" :key="`1${rowIndex}`" no-gutters>
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
  name: "PortComponent",
  components: { Cell },
  data() {
    return {
      board: new Board(true)
    };
  },
  mounted() {
    this.$root.$on("cell-click", this.onCellClick);
  },
  methods: {}
};
</script>

<style>
.cell {
  width: 100%;
  padding-bottom: 100%;
  border: 1px white solid;
}
</style>
