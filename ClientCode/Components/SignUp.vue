<template>
  <v-card>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation onSubmit="return false">
        <v-text-field
          v-model="playerName"
          :rules="nameRules"
          label="Enter your name ..."
          single-line
          required
          @keyup.enter.native="join"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="!valid" color="success" @click="join" fab>Join</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import auth from "../auth.js";
import {
  VForm,
  VTextField,
  VBtn,
  VCard,
  VCardText,
  VCardActions,
  VSpacer
} from "vuetify/lib";

export default {
  components: {
    VForm,
    VTextField,
    VBtn,
    VCard,
    VCardText,
    VCardActions,
    VSpacer
  },
  data() {
    return {
      playerName: "",
      valid: false,
      counter: 24,
      nameRules: [
        v => Boolean(v) || "",
        v =>
          v.length <= this.counter || "It's too long. Enter shorter name, please :)",
        v =>
          /^[a-z](?:_?[ a-z0-9]+)*$/iu.test(v) ||
          "Really? No strange characters allowed ..."
      ]
    };
  },
  computed: {},
  methods: {
    join() {
      var that = this;
      axios
        .post("/user/CreateJWTToken", {
          username: that.playerName
        })
        .then(function(response) {
          auth.storeToken({
            playerName: that.playerName,
            token: response.data.token
          });
          that.playerName = "";
          that.$router.replace(that.$route.query.redirect || "/");
        })
        .catch(function(error) {
          that.playerName = `error ${error}`;
        });
    }
  }
};
</script>

<style>
.v-text-field {
  font-size: 4em;
  line-height: 1em;
}

.v-text-field input {
  max-height: 1.2em;
}

.v-text-field .v-label {
  line-height: 1em;
  height: 100%;
  font-size: 0.6em;
  
}
</style>
