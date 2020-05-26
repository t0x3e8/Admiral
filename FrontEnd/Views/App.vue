<template>
  <div>
    <b-navbar v-if="!$route.meta.hideNavigation" type="light" variant="light" class="py-0 my-0">
      <b-navbar-nav class="ml-auto" small>
        <b-nav-item @click="signout">Sign {{player.name}} out</b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    name: "App",
    computed: mapState(["player"]),
    methods: {
      ...mapActions(["signOutPlayer"]),
      signout() {
        this.signOutPlayer();
        this.$router.push({ name: "signup" });
      }
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
</style>
