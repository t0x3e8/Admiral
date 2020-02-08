<template>
  <component
    :is="dynamicPawnIcon"
    class="pawnIcon"
    :class="[pawnData.selected ? 'selected': '']"
    @click="pawnSelected"
  />
</template>

<script>
  export default {
    name: "PawnControl",
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
      pawnSelected() {
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
  }

  .selected {
    background-color: pink
  }
</style>
