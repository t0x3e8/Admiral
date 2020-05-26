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
          <b-button
            size="sm"
            text="Start new game"
            variant="primary"
            type="submit"
            :disabled="!isGameNameValid"
            >Start new game</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
  </b-form>
</template>

<script>
import { CREATE_NEW_GAME } from "./../eventsTypes.js";

export default {
  name: "NewGameComponent",
  props: {
    gameNameMaxLength: {
      type: Number,
      default: 16
    },
    gameNameMinLength: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      gameName: ""
    };
  },
  computed: {
    isGameNameValid() {
      if (!this.gameName.length) {
        return null;
      }

      return (
        this.gameName.length > this.gameNameMinLength &&
        this.gameName.length < this.gameNameMaxLength
      );
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
        console.debug(`event-emit: ${CREATE_NEW_GAME}`);

        this.$root.$emit(CREATE_NEW_GAME, { name: this.gameName });
        this.gameName = "";
      }
    }
  }
};
</script>

<style scoped></style>
