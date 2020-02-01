/* eslint-disable capitalized-comments */
<template>
  <component :is="dynamicPawnIcon" />
</template>

<script>
import Batteries from "./pawns/batteries.svg";
import Cruiser from "./pawns/cruiser.svg";

export default {
  name: "DynamicPawnIcon",
  components: {
    Batteries,
    Cruiser
  },
  props: {
    pawnData: {
      type: Object,
      default: null
    }
  },
  computed: {
    dynamicPawnIcon () {
      return () => import(
        /* webpackMode: "lazy" */
        "./pawns/battleship.svg"
      )
    }
  }
};
</script>

<style lang="scss"></style>
