<template>
  <div>
    <banner-control :game-id="game.getGameId()" />
    <board-control :board="game.board" />
    <history-control :history="game.history" />
  </div>
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

    this.game.join(player)
  }
};
</script>
