<template>
  <div
    class="boardCell"
    :class="classObject"
    @click="cellClicked"
  >
    <pawn-control
      v-if="cellData.pawn"
      :pawn-data="cellData.pawn"
    />
  </div>
</template>

<script>
import { CellType } from "../GameEngine/gameEnums.js";
import PawnControl from "./PawnControl.vue";

export default {
  components: { PawnControl },
  props: {
    cellData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {

    };
  },
  computed: {
    classObject() {
      let cellDefaultStyle = "";

      switch (this.cellData.type) {
        case CellType.PLAYER_ONE_PORT:
          cellDefaultStyle = "port1";
          break;
        case CellType.PLAYER_TWO_PORT:
          cellDefaultStyle = "port2";
          break;
        case CellType.SEA:
          cellDefaultStyle = "sea";
          break;
        case CellType.NEUTRAL:
          cellDefaultStyle = "neutral";
          break;
        case CellType.PLAYER_ONE_ENTRANCE:
        case CellType.PLAYER_TWO_ENTRANCE:
          cellDefaultStyle = "entrance";
          break;
        default:
          break;
      }

      if (this.cellData.inRange) {
        cellDefaultStyle += "-range";
      }

      return [cellDefaultStyle];
    }
  },
  methods: {
    cellClicked() {
      console.debug("event-emit: cell-click");

      this.$root.$emit("cell-click", {
        col: this.cellData.colIndex,
        row: this.cellData.rowIndex
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  $sea-color: #1e88e5;
  $port1-color: #43a047;
  $port-entrance-color: #546e7a;
  $port2-color: #1b5e20;
  $neutral-color: #263238;


  .boardCell {
    border-radius: 0%;
    cursor: pointer;
  }

  .port1 {
    background-color: $port1-color;
  }
  .port1-range {
    background-color: darken($port1-color, 20%)
  }

  .port2 {
    background-color: $port2-color;
  }
  .port2-range {
    background-color: darken($port2-color, 10%)
  }

  .neutral {
    background-color: $neutral-color;
  }
  .neutral-range {
    background-color: darken($neutral-color, 5%)
  }

  .sea {
    background-color: $sea-color;
  }
  .sea-range {
    background-color: darken($sea-color, 20%)
  }

  .entrance {
    background-color: $port-entrance-color;
  }
  .entrance-range {
    background-color: darken($port-entrance-color, 10%)
  }
</style>
