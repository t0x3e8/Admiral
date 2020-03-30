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
            <small>{{ game.gameDuration }} hours ago</small>
          </div>

          <p class="mb-1">
            <b-badge variant="primary" pill>{{ game.players.length }}/2</b-badge>
          </p>
        </b-list-group-item>
      </b-list-group>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "GamesListComponent",
  data() {
    return {
      errorMessage: "",
      gameSearchText: ""
    };
  },
  computed: {
    ...mapState(["games"])
  },
  created() {
    this.getGames();
  },
  methods: {
  ...mapActions(["getGames"]),
    onStartGame() {
      this.show = false;
    }
  }
};
</script>
