<template>
  <b-container fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="5">
        <game-settings />
      </b-col>
      <b-col cols="8">
        <port />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import GameSettings from "./../Components/GameSettingsComponent.vue";
import Port from "./../Components/PortComponent.vue"

export default {
  name: "GameSetupView",
  components: {
    GameSettings,
    Port
  }
};
</script>
<style scoped></style>
