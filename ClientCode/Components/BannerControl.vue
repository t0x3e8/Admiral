<template>
  <b-alert show="3" dismissible fade variant="info" class="mb-0 sticky-top">
    <span>
      Use the "Copy" button to share the link to the game and play with a
      friend ({{ gameId }})
      <b-button pill size="sm" variant="primary">Copy</b-button>
    </span>
  </b-alert>
</template>

<script>
export default {
  name: "BannerControl",
  props: {
    gameId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
    };
  }
}
</script>
