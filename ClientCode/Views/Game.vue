<template>
  <div>
    startujemy
    <div class="container-fluid"></div>
  </div>
</template>

<script>
import auth from "../auth.js";

export default {
  data() {
    return {
      isAuthorized: auth.isAuthorized()
    };
  },
  watch: {
    isAuthorized: {
      immediate: true,
      handler(newVal, oldVal) {
        // if (this.isAuthorized === false) {
          // this.$router.push({ path: "signup" });
        // }
      }
    }
  },
  created() {
    auth.onChange = eventData => {
      this.isAuthorized = eventData;
    };
  }
};
</script>
