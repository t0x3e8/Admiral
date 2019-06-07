<template>
  <v-container class="board-container">
    <template v-for="colFields in fields">
      <div class="colFieldsSet">
        <template v-for="field in colFields">
          <div class="cell-container"></div>
        </template>
      </div>
    </template>
  </v-container>
</template>

<script>
import Vuetify, { VContainer, VLayout, VFlex, VCard } from "vuetify/lib";
import BoardCell from "./Cell.vue";
import Board from "../GameEngine/board.js";

export default {
  components: {
    VContainer,
    VLayout,
    VFlex,
    VCard,
    BoardCell
  },
  data() {
    let board = new Board();

    return {
      fields: board.fields
    };
  }
};
</script>

<style lang="scss" scoped>
.board-container {
  background-color: rgb(186, 143, 94);
  border-bottom-left-radius: 2%;
  border-bottom-right-radius: 2%;
  border-top-left-radius: 2%;
  border-top-right-radius: 2%;
  box-sizing: border-box;
  display: flex;
  line-height: 27.6px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  width: 720px;
  height: 720px;
}

.colFieldsSet {
  border: #00ff00 2px solid;
  box-sizing: border-box;

  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
  -webkit-box-direction: normal;
  -webkit-box-flex: 1;
  -webkit-box-orient: vertical;
}

.cell-container {
  box-sizing: border-box;
  border: #0000ff 2px solid;
  display: flex;
  flex-basis: 100%;
  flex-direction: row;
  flex-grow: 1;
  position: relative;
  -webkit-box-direction: normal;
}
</style>


