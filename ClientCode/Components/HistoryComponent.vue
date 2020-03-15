<template>
  <b-container id="history">
    <b-card
      border-variant="secondary"
      header="Game History"
      header-border-variant="secondary"
      align="center"
    >
      <b-card-text>
        <b-table-lite :items="history.records"></b-table-lite>
      </b-card-text>
    </b-card>
  </b-container>
</template>

<script>
import History from "../GameEngine/history.js";

export default {
  name: "HistoryComponent",
  props: {
    history: {
      type: History,
      default: null
    }
  }
};
</script>

<style scoped></style>
