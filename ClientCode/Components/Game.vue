<template>
  <v-container fluid="true" fill-height="true">
    <v-layout>
      <v-flex xs2>
        <moves-list style="height: 100%" />
      </v-flex>
      <v-flex xs8>
        <board style="height: 100%" />
      </v-flex>
      <v-flex xs2>
        <moves-list style="height: 100%" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MovesList from "./MovesList.vue";
import Board from "./Board.vue";
import Vuetify, {
  VContainer,
  VLayout,
  VFlex,
} from "vuetify/lib";

export default {
  components: {
    MovesList,
    Board,
    VContainer,
    VLayout,
    VFlex
  }
};
</script>