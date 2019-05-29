<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="playerName"
      :rules="nameRules"
      :counter="10"
      label="Your nickname"
      required
    ></v-text-field>
    <v-btn :disabled="!valid" @click="join">Join game</v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
import auth from "../auth.js";

export default {
  components: {},
  data() {
    return {
      playerName: "",
      valid: false,
      counter: 10,
      nameRules: [
        v => Boolean(v) || "Enter your nickname",
        v =>
          v.length <= this.counter ||
          "Really? The nickname must not be that long.",
        v =>
          /^[a-z](?:_?[ a-z0-9]+)*$/iu.test(v) ||
          "Really? Enter a human nickname."
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
            token : response.data.token
          });
          that.playerName = "";
          that.$router.replace(that.$route.query.redirect || '/about')
        })
        .catch(function (error) {
          that.playerName = `error ${error}`;
        });
    }
  }
};
</script>

<style lang="sass">
</style>
