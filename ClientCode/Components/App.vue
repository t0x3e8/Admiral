<template>
  <v-app>
    <v-content>
      <game v-if="isAuthorized"/>

      <v-container fill-height bg grid-list-md text-xs-center v-if="!isAuthorized">
        <v-layout row wrap align-center>
          <v-flex offset-md3 md6>
            <sign-up/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import SignUp from "./SignUp.vue";
import Game from "./Game.vue";
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
    Game,
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

    auth.onChange = eventData => {
      that.isAuthorized = eventData;
    };
  }
};
</script>

<style>
</style>
