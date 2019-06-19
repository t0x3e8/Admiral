<template>
  <v-app dark>
    <v-content>
      <v-container v-if="isAuthorized">
        <game/>
      </v-container>

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
import {
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
@font-face {
  font-family: "Titillium Web";
  font-style: normal;
  font-weight: 400;
  src: url(../Assets/Fonts/titillium-web-v7-latin-regular.woff2) format("woff2");
}

html {
  font-size: 62.5%;
}

@media (min-height: 754px) and (orientation: landscape) {
  html {
    font-size: 100%;
  }

  .board {
    width: 62vh;
  }
}
</style>
