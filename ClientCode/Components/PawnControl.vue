<template>
  <component
    :is="dynamicPawnIcon"
    class="pawnIcon"
    :class="{
      selected: isSelected
    }"
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
        isSelected: false
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
        this.isSelected = !this.isSelected
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
