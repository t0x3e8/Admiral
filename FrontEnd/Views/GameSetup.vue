<template>
  <b-container fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="4">
        <game-settings />
      </b-col>
      <b-col cols="8" class="portSetup">
        <b-jumbotron bg-variant="transparent" header="Port setup">
          <p class="lead">
            Plan your port and be ready to the <strong>naval battle</strong>!
          </p>
          <hr />
        </b-jumbotron>
        <port :board="board" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GameSettings from "./../Components/GameSettingsComponent.vue";
import PortBoard from "./../GameEngine/portboard.js";
import Port from "./../Components/PortComponent.vue";
import { CREATE_NEW_GAME, JOIN_OPEN_GAME, REFRESH_PORT_LAYOUT } from "./../eventsTypes.js";
import { mapActions } from "vuex";

export default {
  name: "GameSetupView",
  components: {
    GameSettings,
    Port
  },
  data() {
    return {
      board: new PortBoard()
    };
  },
  mounted() {
    this.$root.$on(CREATE_NEW_GAME, this.newGame);
    this.$root.$on(JOIN_OPEN_GAME, this.joinOpenedGame);
    this.$root.$on(REFRESH_PORT_LAYOUT, this.refreshPortLayout);
  },
  beforeDestroy() {
    this.$root.$off(CREATE_NEW_GAME, this.newGame);
    this.$root.$off(JOIN_OPEN_GAME, this.joinOpenedGame);
    this.$root.$off(REFRESH_PORT_LAYOUT, this.refreshPortLayout);
  },
  methods: {
    ...mapActions([
      "createGame",
      "joinGame"
    ]),
    async newGame(payload) {
      console.debug(`event-on: ${CREATE_NEW_GAME} with payload ${JSON.stringify(payload)}`);

      await this.createGame({
        gameName: payload.name,
        pawns: this.board.toPawnArray()
      });

      this.$router.push({ name: "game" });
    },
    async joinOpenedGame(payload) {
      console.log(`event-on: ${JOIN_OPEN_GAME} with payload ${JSON.stringify(payload)}`);

      await this.joinGame({
        gameId: payload.gameId,
        pawns: this.board.toRotatedPawnsArray()
      });

      this.$router.push({ name: "game" });
    },
    refreshPortLayout() {
      this.board = new PortBoard();
    }
  }
};
</script>

<style scoped>
.portSetup {
  border-left: 1px solid #00000010;
}
</style>
