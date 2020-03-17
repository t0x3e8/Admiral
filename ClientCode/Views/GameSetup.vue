<template>
  <b-container fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="4">
        <game-settings />
      </b-col>
      <b-col cols="8" class="portSetup">
        <b-jumbotron
          bg-variant="transparent"
          border-variant="light"
          header="Port setup"
          lead="Place your ships and be ready for the battle!"
        ></b-jumbotron>
        <port />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GameSettings from "./../Components/GameSettingsComponent.vue";
import Port from "./../Components/PortComponent.vue";

export default {
  name: "GameSetupView",
  components: {
    GameSettings,
    Port
  }
};
</script>
<style scoped>
.portSetup {
  border-left: 1px solid #aaa;
}
</style>
