<template>
  <div
    class="boardCell"
    :class="classObject"
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
      let cellDefaultStyle = "",
          cellInRangeStyle = "";

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
        cellInRangeStyle = "inRange";
      }

      return [
        cellDefaultStyle,
        cellInRangeStyle
      ];
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
  }

  .port1 {
    background-color: $port1-color;
  }

  .port2 {
    background-color: $port2-color;
  }

  .neutral {
    background-color: $neutral-color;
  }

  .sea {
    background-color: $sea-color;
  }
  .entrance {
    background-color: $port-entrance-color;
  }

  .inRange {
    background-color: aqua;
  }
</style>
