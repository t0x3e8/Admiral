<template>
  <b-form novalidate @submit.stop.prevent="onNewGame">
    <b-form-group label-for="gameSearchInput" label="List of active games" label-size="lg">
      <b-list-group class="pl-3">
        <b-input-group>
          <b-form-input
            id="gameSearchInput"
            v-model="gameSearchText"
            placeholder="Search game ..."
            type="text"
            trim
          ></b-form-input>
        </b-input-group>
        <b-list-group-item
          v-for="(game, gameIndex) in games"
          :key="`${gameIndex}`"
          class="flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">
            {{ game.name }}
            <small>{{ game.gameDuration }}h ago</small>
          </div>

          <div class="d-flex w-100 justify-content-between">
            <p class="mb-1">
              <b-badge variant="info" pill>{{ game.players.length }}/2</b-badge>
            </p>
            <b-button size="sm" text="Join" variant="outline-success" @click="join(game.id)">join</b-button>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { JOIN_OPEN_GAME } from "./../eventsTypes.js";

export default {
  name: "GamesListComponent",
  data() {
    return {
      gameSearchText: "",
      timer: "",
      timerInterval: 60000
    };
  },
  computed: {
    ...mapState(["games"])
  },
  created() {
    this.getGames();
    this.timer = setInterval(this.getGames, this.timerInterval);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    ...mapActions(["getGames"]),

    join(gameId) {
      console.debug(`event-emit: ${JOIN_OPEN_GAME}`);

      this.$root.$emit(JOIN_OPEN_GAME, { gameId });
    },

    cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  }
};
</script>
