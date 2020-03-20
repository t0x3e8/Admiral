<template>
  <b-container fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="4">
        <game-settings />
      </b-col>
      <b-col cols="8" class="portSetup">
        <b-jumbotron
          bg-variant="transparent"
          header="Port setup"
        >
          <p class="lead">Plane your ships in the port and be ready to the <strong>naval battle</strong>!</p>
          <hr>
        </b-jumbotron>
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
  border-left: 1px solid #00000010;
}
</style>
