<template>
  <b-card notitle class="bg-light">
    <b-form novalidate @submit.stop.prevent="onJoin">
      <b-form-group
        :invalid-feedback="invalidFeedback"
        label-for="playerNameInput"
        label="Enter player name"
        label-size="lg"
        :state="isPlayerNameValid"
      >
        <b-input-group class="pl-3">
          <b-form-input
            id="playerNameInput"
            v-model="playerName"
            type="text"
            required
            trim
            :state="isPlayerNameValid"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              size="sm"
              text="Join"
              variant="success"
              type="submit"
              :disabled="!isPlayerNameValid"
              >Join</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: "NewPlayerComponent",
  data() {
    return {
      playerName: "",
      playerNameMaxLength: 16,
      playerNameMinLength: 2
    };
  },
  computed: {
    isPlayerNameValid() {
      if (!this.playerName.length) {
        return null;
      }

      return (
        this.playerName.length > this.playerNameMinLength &&
        this.playerName.length < this.playerNameMaxLength
      );
    },
    invalidFeedback() {
      if (this.playerName.length >= this.playerNameMaxLength) {
        return `Player name is too long. Max is ${this.playerNameMaxLength}`;
      } else if (this.playerName.length <= this.playerNameMinLength) {
        return `Player name is too short. Min is ${this.playerNameMinLength}`;
      }

      return "";
    }
  },
  methods: {
    onJoin() {
      if (this.isPlayerNameValid) {
        console.debug("event-emit: join-player");

        this.$root.$emit("join-player", { playerName: this.playerName });
      }
    }
  }
};
</script>
