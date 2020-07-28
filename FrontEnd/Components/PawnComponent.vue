<template>
  <component
    :is="dynamicPawnIcon"
    class="pawnIcon"
    :class="[pawnData.selected ? 'selected' : '']"
    @click="pawnClicked"
  />
</template>

<script>
  import { BOARD_CELL_CLICKED } from "./../eventsTypes.js";

  export default {
    name: "PawnComponent",
    props: {
      pawnData: {
        type: Object,
        default: null
      }
    },
    data() {
      return {};
    },
    computed: {
      dynamicPawnIcon() {
        return () =>
          import(
            /* webpackMode: "eager" */
            `./pawns/${this.pawnData.svgName}`
          );
      }
    },
    methods: {
      pawnClicked() {
        console.debug(`event-emit: ${BOARD_CELL_CLICKED}`);

        this.$root.$emit(BOARD_CELL_CLICKED, {
          col: this.pawnData.col,
          row: this.pawnData.row
        });
      }
    }
  };
</script>

<style module>
  .pawnIcon {
    position: absolute;
    display: block;
  }
</style>
