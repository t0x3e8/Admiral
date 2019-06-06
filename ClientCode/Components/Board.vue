<template>
  <v-container>
    <v-layout justify-center wrap row>
      <v-flex>
        <template v-for="row in 20">
          <board-cell :key="row" />
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vuetify, { VContainer, VLayout, VFlex, VCard } from "vuetify/lib";
import BoardCell from "./Cell.vue";

export default {
  components: {
    VContainer,
    VLayout,
    VFlex,
    VCard, 
    BoardCell
  },
  
};
</script>

