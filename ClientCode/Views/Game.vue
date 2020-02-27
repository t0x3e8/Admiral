<template>
  <b-container fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="3">
        <game-settings-control :game-id="game.getGameId()" />
      </b-col>
      <b-col cols="6">
        <board-control :board="game.board" />
      </b-col>
      <b-col cols="3">
        <history-control v-if="showHistory" :history="game.history" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BoardControl from "./../Components/BoardContol.vue";
import HistoryControl from "./../Components/HistoryControl.vue";
import GameSettingsControl from "./../Components/GameSettingsControl.vue";
import Game from "./../GameEngine/game";
import Player from "./../GameEngine/player";

export default {
  components: {
    BoardControl,
    HistoryControl,
    GameSettingsControl
  },
  data() {
    return {
      game: new Game(),
      showHistory: false
    };
  },
  mounted() {
    const player = new Player({
      name: "michał"
    });

    this.game.join(player);
  }
};
</script>
