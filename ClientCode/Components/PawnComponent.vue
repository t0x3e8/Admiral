<template>
  <component
    :is="dynamicPawnIcon"
    class="pawnIcon"
    :class="[pawnData.selected ? 'selected': '']"
    @click="pawnClicked"
  />
</template>

<script>
  export default {
    name: "PawnComponent",
    props: {
      pawnData: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
      }
    },
    computed: {
      dynamicPawnIcon () {
        return () => import(

          /* webpackMode: "eager" */
          `./pawns/${this.pawnData.type}.svg`
        )
      }
    },
    methods: {
      pawnClicked() {
        console.debug("event-emit: cell-click");

        this.$root.$emit("cell-click", {
          col: this.pawnData.col,
          row: this.pawnData.row
        });
      }
    }
  };
</script>

<style module>
  .pawnIcon {
    position: absolute;
    display: block;
  }
</style>
