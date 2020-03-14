<template>
  <div class="row">
    <div class="col col-10 col-md-5 mx-auto py-5">
      <b-card notitle class="bg-light">
        <b-form @submit="onJoin">
          <b-form-group id="input-group-1">
            <b-form-input
              id="nicknameInput"
              v-model="nickname"
              required
              placeholder="Enter your nickname ..."
              size="lg"
              aria-describedby="nickname-feedback"
              :state="nicknameState"
              @input="nicknameChanged"
            ></b-form-input>
            <b-form-invalid-feedback id="nickname-feedback" class>{{
              nicknameInputError
            }}</b-form-invalid-feedback>
          </b-form-group>

          <b-button
            type="submit"
            variant="primary"
            class="float-right"
            :disabled="isSubmitDisabled"
            >Join</b-button
          >
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
/* eslint-disable max-statements */
import axios from "axios";
import auth from "../auth.js";

export default {
  data() {
    return {
      nickname: null,
      isSubmitDisabled: false,
      nicknameInputError: "",
      nicknameMaxLength: 24,
      nicknameState: null
    };
  },
  methods: {
    nicknameChanged() {
      this.isSubmitDisabled = true;
      this.nicknameState = null;

      if (this.nickname === null) {
        this.nicknameState = null;
      } else if (this.nickname.trim() === "") {
        this.nicknameInputError = "Enter Your nickname";
        this.nicknameState = false;
      } else if (this.nickname.length >= this.nicknameMaxLength) {
        this.nicknameInputError =
          "It's too long. Enter shorter name, please :)";
        this.nicknameState = false;
      }
      // test the nickname if it starts with letter and does contain only digits, letters and space
      if ((/^[a-zA-Z](?:_?[ a-z0-9]+)*$/u).test(this.nickname) === false) {
        this.nicknameInputError = "Really? No strange characters allowed ...";
        this.nicknameState = false;
      }

      this.isSubmitDisabled = false;
    },
    onJoin(evt) {
      evt.preventDefault();

      axios
        .post("/user/CreateJWTToken", {
          username: this.nickname
        })
        .then(response => {
          auth.storeToken({
            nickname: this.nickname,
            token: response.data.token
          });
          this.nickname = "";
          console.log(this.$route.query);
          this.$router.replace({ name: "home" });
        })
        .catch(error => {
          this.nicknameInputError = error;
        });
    }
  }
};
</script>
<style scoped>
.row {
  font-size: 100%;
}
</style>
