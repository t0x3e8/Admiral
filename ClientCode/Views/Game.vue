<template>
  <div>
    <banner-control :game-id="game.getGameId()" />
    <board-control :board="game.board" />
  </div>
</template>

<script>
import BannerControl from "./../Components/BannerControl.vue";
import BoardControl from "./../Components/BoardContol.vue";
import Game from "./../GameEngine/game";

export default {
  components: {
    BoardControl,
    BannerControl
  },
  data() {
    return {
      game: new Game()
    };
  }
};
</script>
