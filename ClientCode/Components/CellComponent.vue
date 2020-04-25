<template>
  <div class="boardCell" :class="classObject" @click="cellClicked">
    <pawn v-if="cellData.pawn" :pawn-data="cellData.pawn" />
  </div>
</template>

<script>
import { CellType } from "../GameEngine/gameEnums.js";
import Pawn from "./PawnComponent.vue";

export default {
  name: "CellComponent",
  components: { Pawn },
  props: {
    cellData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showCell: false
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
        case CellType.PLAYER_ONE_BATTERY:
          cellDefaultStyle = "battery1";
          break;
        case CellType.PLAYER_TWO_BATTERY:
          cellDefaultStyle = "battery2";
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
    isEnable() {
      return this.cellData.type !== CellType.HIDDEN;
    },
    cellClicked() {
      if (this.isEnable()) {
        console.debug("event-emit: cell-click");

        this.$root.$emit("cell-click", {
          col: this.cellData.col,
          row: this.cellData.row
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$sea-color: #1e88e5;
$port1-color: #43a047;
$port-entrance-color: #546e7a;
$port2-color: #1b5e20;
$neutral-color: #1155ff;

.boardCell {
  border-radius: 0%;
}

.port1,
.battery1 {
  background-color: $port1-color;
}
.port1-range {
  background-color: darken($port1-color, 30%);
  cursor: pointer;
}

.port2,
.battery2 {
  background-color: $port2-color;
}
.port2-range {
  background-color: darken($port2-color, 30%);
  cursor: pointer;
}

.neutral {
  background-color: $neutral-color;
}
.neutral-range {
  background-color: darken($neutral-color, 30%);
  cursor: pointer;
}

.sea {
  background-color: $sea-color;
}
.sea-range {
  background-color: darken($sea-color, 30%);
  cursor: pointer;
}

.entrance {
  background-color: $port-entrance-color;
}
.entrance-range {
  background-color: darken($port-entrance-color, 30%);
  cursor: pointer;
}
</style>
