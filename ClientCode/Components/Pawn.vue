<template>
    <div class="circle">{{pawnData.type}}</div>
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
.circle {
    border-radius: 50%;
    width: 70%;
    height: 70%;
    background: white;
    border: 3px solid red;
}
</style>
