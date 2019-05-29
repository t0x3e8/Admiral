<template>
    <div>
        This is Dashboard!
        <h1>
            <v-text-field v-model="playerName" />
        </h1>
    </div>
</template>

<script>

import auth from "../auth.js";

export default {
  components: {},
  data() {
    return {
      playerName: auth.getToken().playerName
    }
  }
};
</script>