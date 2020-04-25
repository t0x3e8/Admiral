<template>
  <b-container>
    <b-row>
      <b-col>
        <new-game />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <games-list />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NewGame from "./NewGameComponent.vue";
import GamesList from ".//GamesListComponent.vue";

export default {
  name: "GameSettingsComponent",
  components: {
    NewGame,
    GamesList
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped></style>
