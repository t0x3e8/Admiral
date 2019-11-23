	<template>
  <v-container align-content-center class="board">  
    <v-layout v-for="(columns, rowIndex) in cells" :key="`1${rowIndex}`" row>
      <v-flex v-for="(cell, colIndex) in columns" :key="`2${colIndex}`" xs1>
        <cell v-bind:cellData="cell" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  VContainer,
  VLayout,
  VFlex
} from "vuetify/lib";
import Cell from "./Cell.vue";
import Board from "../GameEngine/board.js";

export default {
  components: {
    VContainer,
    VLayout,
    VFlex,
    Cell
  },
  data() {
    let board = new Board();

    return {
      cells: board.cells
    };
  },
  methods: {}
};
</script>

<style scoped>
.board {
  padding: 0.1em;
}
</style>
