<template>
  <b-container id="history">
    <b-row
      v-for="(record, recordIndex) in history.records"
      :key="`1${recordIndex}`"
      no-gutters
    >
      <div>{{record.type}}</div>
    </b-row>
  </b-container>
</template>

<script>
import History from "../GameEngine/history.js";

export default {
  props: {
    history: {
      type: History,
      default: null
    }
  }
}
</script>

<style scoped></style>
