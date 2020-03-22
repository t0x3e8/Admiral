<template>
  <div class="row">
    <div class="col col-10 col-md-5 mx-auto py-5">
      <new-player />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import auth from "../auth.js";
import NewPlayer from "./../Components/NewPlayerComponent.vue";

export default {
  name: "SignUpView",
  components: { NewPlayer },
  mounted() {
    this.$root.$on("join-player", this.joinPlayer);
  },
  methods: {
    joinPlayer(payload) {
      console.debug("event-on: join-player");
      const playerName = payload.playerName;

      axios
        .post("/user/CreateJWTToken", {
          username: playerName
        })
        .then(response => {
          auth.storeToken({
            nickname: playerName,
            token: response.data.token
          });

          this.$router.replace({ name: "setup" });
        })
        .catch(error => {
          console.error(`Player create error: ${error}`);
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
