<template>
  <v-responsive :aspect-ratio="1/1">
    <v-card
      class="boardCell"
      :class="{ port1: isPort1, port2: isPort2, sea: isSea, neutral: isNeutral, isEntrance: isPortEntrance}"
    > 
      <pawn v-if="cellData.pawn" v-bind:pawnData="cellData.pawn" />
    </v-card>
  </v-responsive>
</template>

<script>
import { VCard, VResponsive } from "vuetify/lib";
import { CellType } from "../GameEngine/gameEnums.js";
import Pawn from "./Pawn.vue";

export default {
  components: {
    VCard,
    VResponsive,
    Pawn
  },
  props: {
    cellData: Object
  },
  data() {
    return {
      isPort1: this.cellData.type === CellType.PLAYER_ONE_PORT,
      isPort2: this.cellData.type === CellType.PLAYER_TWO_PORT,
      isSea: this.cellData.type === CellType.SEA,
      isNeutral: this.cellData.type === CellType.NEUTRAL,
      isPortEntrance: (this.cellData.type === CellType.PLAYER_ONE_ENTRANCE) || (this.cellData.type === CellType.PLAYER_TWO_ENTRANCE)
    };
  }
};
</script>

<style lang="scss" scoped>
$sea-color: #1e88e5;
$port1-color: #43a047;
$port-entrance-color: #546E7A;
$port2-color: #1b5e20;
$neutral-color: #263238;

.v-card {
  border-radius: 0%;
}

.boardCell {
  padding: 1px;
  height: 100%;
  width: 100%;
  display: grid;
  box-sizing: border-box;
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
</style>