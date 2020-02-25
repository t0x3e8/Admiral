<template>
  <b-container fluid>
    <banner-control :game-id="game.getGameId()" />
    <b-row>
      <b-col> </b-col>
      <b-col cols="8">
        <board-control :board="game.board" />
      </b-col>
      <b-col>
        <history-control :history="game.history" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BannerControl from "./../Components/BannerControl.vue";
import BoardControl from "./../Components/BoardContol.vue";
import HistoryControl from "./../Components/HistoryControl.vue";
import Game from "./../GameEngine/game";
import Player from "./../GameEngine/player";

export default {
  components: {
    BoardControl,
    BannerControl,
    HistoryControl
  },
  data() {
    return {
      game: new Game()
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
