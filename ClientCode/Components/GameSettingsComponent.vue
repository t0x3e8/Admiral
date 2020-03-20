<template>
  <b-container v-if="show" id="gamesettings">
    <b-form-group
      id="input-group-1"
      label-for="input-1"
      description="This is Game ID. Don't change it, unless you want to join other game."
    >
      <b-form-input
        id="input-1"
        v-model="gameId"
        required
        placeholder="Game unique ID"
      ></b-form-input>
    </b-form-group>
    <b-button
      class="float-right"
      type="submit"
      variant="primary"
      @click="onStartGame"
      >Start game</b-button
    >
    <b-list-group>
      <b-list-group-item
        v-for="(game, gameIndex) in games"
        :key="`${gameIndex}`"
      >
        {{ game }}
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "GameSettingsComponent",
  props: {
    gameId: {
      type: Text,
      default: null
    }
  },
  data() {
    return {
      show: true,
      games: [],
      errorMessage: ""
    };
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    onStartGame() {
      this.show = false;
    },
    fetchGames() {
      axios
        .get("/api/games")
        .then(response => {
          this.games = response.data;
        })
        .catch(error => {
          this.errorMessage = error;
        });
    }
  }
};
</script>

<style scoped></style>
