<template>
  <b-container v-if="!loading" fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="2">
        <game-control-panel />
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
  import { REFRESH_ACTIVE_GAME } from "./../eventsTypes.js";

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
    computed: mapState(["activeGame"]),
    async mounted() {
      this.$root.$on(REFRESH_ACTIVE_GAME, this.setGame);

      await this.setGame();
      this.loading = false;
    },
    beforeDestroy() {
      this.$root.$off(REFRESH_ACTIVE_GAME, this.setGame);
    },
    methods: {
      ...mapActions(["openGame"]),
      async setGame() {
        await this.openGame();
        this.game = this.activeGame;
      }
    }
  };
</script>
