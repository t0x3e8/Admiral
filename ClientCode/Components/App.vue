<template>
  <v-app>
    <v-content>
      <v-container justify-s="true">
        <v-layout v-if="isAuthorized">
          <v-flex xs2>
            <router-link to="/about">Go to About</router-link>
          </v-flex>
          <v-flex xs2>
            <router-link to="/dashboard">Go to Dashboard</router-link>
          </v-flex>
        </v-layout>
        <v-layout row>
          <router-view></router-view>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <sign-up v-if="!isAuthorized"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>    
  <v-footer app></v-footer>
  </v-app>
</template>

<script>
import SignUp from "./SignUp.vue";
import auth from "../auth.js";
import Vuetify, { VApp, VContainer, VLayout, VFlex, VContent, VFooter } from "vuetify/lib";

export default {
  name: "app",
  components: {
    SignUp,
    VApp,
    VContainer,
    VLayout,
    VFlex,
    VContent,
    VFooter
  },
  data() {
    return {
      isAuthorized: auth.isAuthorized()
    };
  }
};
</script>

<style>
</style>
