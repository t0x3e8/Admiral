<template>
  <component :is="icon" class="pawnIcon" :class="[pawnData.selected ? 'selected' : '']" @click="pawnClicked" />
</template>

<script>
  import { BOARD_CELL_CLICKED } from "./../eventsTypes.js";
  import _ from "underscore";

  export default {
    name: "PawnComponent", 
    props: {
      pawnData: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        icon: null
      };
    },
    watch: {
      pawnData: {
        immediate: true,
        handler(newValue) {
          this.icon = this.getPawnIcon(newValue.svgName);
        }
      }
    },
    methods: {
      pawnClicked() {
        console.debug(`event-emit: ${BOARD_CELL_CLICKED}`);

        this.$root.$emit(BOARD_CELL_CLICKED, {
          col: this.pawnData.col,
          row: this.pawnData.row
        });
      },
      getPawnIcon(svgName) {
        if (_.isNull(svgName) || _.isUndefined(svgName)) {
          return null;
        } else {
          return () =>
            import(
              /* webpackMode: "eager" */
              `./pawns/${svgName}`
            );
        }
      }
    }
  };
</script>

<style module>
  .pawnIcon {
    position: absolute;
    display: block;
  }

  .selected circle {
    fill: white;
  }
</style>
