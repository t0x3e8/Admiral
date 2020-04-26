<template>
  <div class="row">
    <div class="col col-10 col-md-5 mx-auto py-5">
      <new-player />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NewPlayer from "./../Components/NewPlayerComponent.vue";

export default {
  name: "SignUpView",
  components: { NewPlayer },
  mounted() {
    this.$root.$on("join-player", this.joinPlayer);
  },
  methods: {
    // eslint-disable-next-line dot-notation
    ...mapActions(["setPlayer"]),
    async joinPlayer(payload) {
      console.debug("event-on: join-player");

      await this.setPlayer(payload);
      this.$router.push({ name: "setup" });
    }
  }
};
</script>
<style scoped>
.row {
  font-size: 100%;
}
</style>
