<template>
  <b-container fluid class="mt-0">
    <b-row no-gutters>
      <b-col cols="4">
        <game-settings />
      </b-col>
      <b-col cols="8" class="portSetup">
        <b-row>
          <b-col>
            <b-jumbotron bg-variant="transparent" header="Port setup" class="py-1">
              <p class="lead">Plan your port and be ready to the <strong>naval battle</strong>!</p>
              <hr />
            </b-jumbotron>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <port :board="board" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import GameSettings from "./../Components/GameSettingsComponent.vue";
  import PortBoard from "./../GameEngine/portboard.js";
  import Port from "./../Components/PortComponent.vue";
  import { CREATE_NEW_GAME, JOIN_OPEN_GAME, REFRESH_PORT_LAYOUT, OPEN_GAME } from "./../eventsTypes.js";
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
      this.$root.$on(CREATE_NEW_GAME, this.create);
      this.$root.$on(JOIN_OPEN_GAME, this.join);
      this.$root.$on(OPEN_GAME, this.open);
      this.$root.$on(REFRESH_PORT_LAYOUT, this.refreshPortLayout);
    },
    beforeDestroy() {
      this.$root.$off(CREATE_NEW_GAME, this.create);
      this.$root.$off(JOIN_OPEN_GAME, this.join);
      this.$root.$off(OPEN_GAME, this.open);
      this.$root.$off(REFRESH_PORT_LAYOUT, this.refreshPortLayout);
    },
    methods: {
      ...mapActions(["createGame", "joinGame", "openGame"]),
      async create(payload) {
        console.debug(`event-on: ${CREATE_NEW_GAME} with payload ${JSON.stringify(payload)}`);

        await this.createGame({
          gameName: payload.name,
          pawns: this.board.toPawnArray()
        });

        this.$router.push({ name: "game" });
      },
      async join(payload) {
        console.log(`event-on: ${JOIN_OPEN_GAME} with payload ${JSON.stringify(payload)}`);

        await this.joinGame({
          gameId: payload.gameId,
          pawns: this.board.toRotatedPawnsArray()
        });

        this.$router.push({ name: "game" });
      },
      async open(payload) {
        console.log(`event-on: ${OPEN_GAME} with payload ${JSON.stringify(payload)}`);

        await this.openGame({
          gameId: payload.gameId
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
