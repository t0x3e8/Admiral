<template>
  <v-app>
    <v-content>
      <v-container v-if="isAuthorized">
        <v-layout>
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
      </v-container>
      <v-container fill-height bg grid-list-md text-xs-center v-if="!isAuthorized">
        <v-layout row wrap align-center>
          <v-flex offset-md3 md6>
            <sign-up />
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
import Vuetify, {
  VApp,
  VContainer,
  VLayout,
  VFlex,
  VContent,
  VFooter
} from "vuetify/lib";

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
  },
  created() {
    var that = this;

    auth.onChange = (eventData) => {
      that.isAuthorized = eventData;
    }
  }
};
</script>

<style>
</style>
