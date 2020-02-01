<template>
  <component
    :is="dynamicPawnIcon"
    class="pawnIcon"
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
  computed: {
    dynamicPawnIcon () {
      return () => import(

        /* webpackMode: "eager" */
        `./pawns/${this.pawnData.type}.svg`
      )
    }
  }
};
</script>

<style lang="scss">
  .pawnIcon {
    position: absolute;
  }
</style>
