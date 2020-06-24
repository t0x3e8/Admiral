<template>
  <b-container v-if="!loading" fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="2">
        <game-control-panel :is-turn-ready="isTurnReady" />
      </b-col>
      <b-col cols="8">
        <board v-if="game !== null" :board="game.board" />
      </b-col>
      <b-col cols="2">
        <history v-if="showHistory" :history="game.history" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Board from "./../Components/BoardComponent.vue";
  import History from "./../Components/HistoryComponent.vue";
  import GameControlPanel from "./../Components/GameControlPanelComponent.vue";
  import { mapState, mapActions } from "vuex";
  import { REFRESH_ACTIVE_GAME, COMMIT_TURN } from "./../eventsTypes.js";

  export default {
    name: "GameView",
    components: {
      Board,
      History,
      GameControlPanel
    },
    data() {
      return {
        game: null,
        showHistory: false,
        loading: true
      };
    },
    computed: {
      ...mapState(["activeGame"]),
      isTurnReady () {
        // eslint-disable-next-line no-magic-numbers
        return this.game.board.movedPawns.length > 0;
      }
    },
    async mounted() {
      this.$root.$on(REFRESH_ACTIVE_GAME, this.setGame);
      this.$root.$on(COMMIT_TURN, this.commitGameTurn);

      await this.setGame();
      this.loading = false;
    },
    beforeDestroy() {
      this.$root.$off(REFRESH_ACTIVE_GAME, this.setGame);
      this.$root.$off(COMMIT_TURN, this.commitGameTurn);
    },
    methods: {
      ...mapActions(["openGame", "commitTurn"]),
      async setGame() {
        await this.openGame();
        this.game = this.activeGame;
      },
      async commitGameTurn() {
        await this.commitTurn({
          gameId: this.game.gameId,
          // eslint-disable-next-line no-magic-numbers
          pawn: this.game.board.movedPawns[0]
        });

        await this.setGame();
      }
    }
  };
</script>
