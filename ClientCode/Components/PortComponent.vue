<template>
  <b-container id="port" class="my-2">
    <b-row align-h="end" no-gutters>
      <b-button align-v="end" variant="outline-success" @click="refreshPortSetup">
        <b-icon icon="arrow-repeat"></b-icon> New port layout
      </b-button>
    </b-row>
    <b-row v-for="(columns, rowIndex) in board.cells" :key="`1${rowIndex}`" no-gutters>
      <b-col v-for="(cell, colIndex) in columns" :key="`2${colIndex}`">
        <cell :cell-data="cell" class="cell" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Cell from "./CellComponent.vue";
  import { REFRESH_PORT_LAYOUT } from "./../eventsTypes.js";

  export default {
    name: "PortComponent",
    components: { Cell },
    props: {
      board: {
        type: Object,
        default: null
      }
    },
    methods: {
      refreshPortSetup() {
        console.debug(`event-emit: ${REFRESH_PORT_LAYOUT}`);
        this.$root.$emit(REFRESH_PORT_LAYOUT);
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
