<template>
  <b-form novalidate @submit.stop.prevent="newNewGameSubmit">
    <b-form-group
      :invalid-feedback="invalidFeedback"
      label-for="gameNameInput"
      label="Enter game name"
      label-size="lg"
      :state="isGameNameValid"
    >
      <b-input-group class="pl-3">
        <b-form-input
          id="gameNameInput"
          v-model="gameName"
          type="text"
          required
          trim
          :state="isGameNameValid"
        ></b-form-input>
        <b-input-group-append>
          <b-button size="sm" text="Start new game" variant="success" type="submit" :disabled="!isGameNameValid">Start new game</b-button>
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
    isGameNameValid() {
      if (!this.gameName.length) {
        return null;
      }

      return this.gameName.length > this.gameNameMinLength && this.gameName.length < this.gameNameMaxLength;
    },
    invalidFeedback() {
      if (this.gameName.length >= this.gameNameMaxLength) {
        return `Game name is too long. Max is ${this.gameNameMaxLength}`;
      } else if (this.gameName.length <= this.gameNameMinLength) {
        return `Game name is too short. Min is ${this.gameNameMinLength}`;
      }

      return "";
    }
  },
  methods: {
    newNewGameSubmit() {
      if (this.isGameNameValid) {
        console.debug("event-emit: create-game");

        this.$root.$emit("create-game", { name: this.gameName });
      }
    }
  }
};
</script>

<style scoped></style>
