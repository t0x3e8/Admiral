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
    <b-button class="float-right" type="submit" variant="primary" @click="onStartGame"
      >Start game</b-button
    >
  </b-container>
</template>

<script>
export default {
  name: "GameSettingsControl",
  props: {
    gameId: {
      type: Text,
      default: null
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    onStartGame() {
      this.show = false;
    }
  }
};
</script>

<style scoped></style>
