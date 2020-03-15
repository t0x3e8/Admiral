<template>
  <b-container fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="3">
      </b-col>
      <b-col cols="6">
        <board :board="game.board" />
      </b-col>
      <b-col cols="3">
        <history v-if="showHistory" :history="game.history" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Board from "./../Components/BoardComponent.vue";
import History from "./../Components/HistoryComponent.vue";
import Game from "./../GameEngine/game";

export default {
  name: "GameView",
  components: {
    Board,
    History
  },
  data() {
    return {
      game: new Game({gameId: "tempID"}),
      showHistory: true
    };
  }
};
</script>
