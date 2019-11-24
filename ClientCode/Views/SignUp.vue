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
              :state="nicknameState"
              aria-describedby="nickname-feedback"
            ></b-form-input>
            <b-form-invalid-feedback class id="nickname-feedback">{{ nicknameInputError }}</b-form-invalid-feedback>
          </b-form-group>

          <b-button
            type="submit"
            variant="primary"
            class="float-right"
            :disabled="isSubmitDisabled"
          >Join</b-button>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import auth from "../auth.js";

export default {
  data() {
    return {
      nickname: null,
      isSubmitDisabled: false,
      nicknameInputError: ""
    };
  },
  computed: {
    nicknameState() {
      this.isSubmitDisabled = true;

      if (this.nickname === null) 
        return null;

      if (this.nickname.trim() === "") {
        this.nicknameInputError = "Enter Your nickname";
        return false;
      }

      if (this.nickname.length >= 24) {
        this.nicknameInputError =
          "It's too long. Enter shorter name, please :)";
        return false;
      }

      if (/^[a-zA-Z](?:_?[ a-z0-9]+)*$/.test(this.nickname) === false) {
        this.nicknameInputError = "Really? No strange characters allowed ...";
        return false;
      }

      this.isSubmitDisabled = false;
      return null;
    }
  },
  methods: {
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