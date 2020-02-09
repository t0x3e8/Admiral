<template>
  <div
    class="boardCell"
    :class="{
      port1: isPort1,
      port2: isPort2,
      sea: isSea,
      neutral: isNeutral,
      isEntrance: isPortEntrance,
      inRange: inRange
    }"
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
      isPort1: this.cellData.type === CellType.PLAYER_ONE_PORT,
      isPort2: this.cellData.type === CellType.PLAYER_TWO_PORT,
      isSea: this.cellData.type === CellType.SEA,
      isNeutral: this.cellData.type === CellType.NEUTRAL,
      inRange: this.cellData.inRange,
      isPortEntrance:
        this.cellData.type === CellType.PLAYER_ONE_ENTRANCE ||
        this.cellData.type === CellType.PLAYER_TWO_ENTRANCE
    };
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
  .isEntrance {
    background-color: $port-entrance-color;
  }

  .inRange {
    background-color: aqua;
  }
</style>
