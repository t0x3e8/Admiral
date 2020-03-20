
<template>
  <b-form novalidate @submit.stop.prevent="onNewGame">
    <b-form-group
      :invalid-feedback="invalidFeedback"
      label-for="gameNameInput"
      label="Enter game name"
      label-size="lg"
      :state="gameNameState"
    >
      <b-input-group class="pl-3">
        <b-form-input
          id="gameNameInput"
          v-model="gameName"
          type="text"
          required
          trim
          :state="gameNameState"
        ></b-form-input>
        <b-input-group-append>
          <b-button size="sm" text="Start new game" variant="success" type="submit">Start new game</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  /* eslint-disable max-statements */
  name: "NewGameComponent",
  data() {
    return {
      gameName: "",
      gameNameMaxLength: 16,
      gameNameMinLength: 2
    };
  },
  computed: {
    gameNameState() {
      if (this.gameName.length <= this.gameNameMinLength) {
        return null;
      }

      return this.gameName.length < this.gameNameMaxLength;
    },
    invalidFeedback() {
      if (this.gameName.length > this.gameNameMaxLength) {
        return `Game name is too long. Max is ${this.gameNameMaxLength}`;
      }

      return "";
    }
  },
  methods: {
    onNewGame(evt) {
      console.log(evt.target.form.checkValidity());
    }
  }
};
</script>

<style scoped>
</style>
