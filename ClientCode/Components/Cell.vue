<template>
  <v-responsive :aspect-ratio="1/1">
    <v-card
      class="boardCell"
      :class="{ port1: isPort1, port2: isPort2, sea: isSea, neutral: isNeutral}"
    ></v-card>
  </v-responsive>
</template>

<script>
import { VCard, VResponsive } from "vuetify/lib";
export default {
  components: {
    VCard,
    VResponsive
  },
  props: {
    cellData: Object
  },
  data() {
    return {
      isPort1: this.cellData.type === 1 || this.cellData.type === 3,
      isPort2: this.cellData.type === 2 || this.cellData.type === 4,
      isSea: this.cellData.type === 0,
      isNeutral: this.cellData.type === 5
    };
  }
};
</script>

<style lang="scss" scoped>
$sea-color: #1e88e5;
$port1-color: #43a047;
$port2-color: #1b5e20;
$neutral-color: #263238;

.boardCell {
  margin: 0.2em;
  height: 100%;
  width: 100%;
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
</style>