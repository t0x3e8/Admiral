<template>
    <div class="pawn"></div>
</template>

<script>
export default {
  props: {
    pawnData: Object
  },
  data () {
      return {
      }
  }
}
</script>

<style lang="scss" scoped>
.pawn {
  width: 100%;
  height: 100%;
  background-color: yellow;
  border-radius: 50px;
  border: 1px transparent solid;
}
</style>
