<template>
  <b-container fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="3">
        <game-settings-control />
      </b-col>
      <b-col cols="6">
        <board-control :board="game.board" />
      </b-col>
      <b-col cols="3">
        <history-control v-if="showHistory" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BoardControl from "./../Components/BoardContol.vue";
import HistoryControl from "./../Components/HistoryControl.vue";
import GameSettingsControl from "./../Components/GameSettingsControl.vue";
import Game from "./../GameEngine/game";

export default {
  components: {
    BoardControl,
    HistoryControl,
    GameSettingsControl
  },
  data() {
    return {
      game: new Game({gameId: "tempID"}),
      showHistory: false
    };
  }
};
</script>
