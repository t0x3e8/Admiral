<template>
  <div>
    <component :is="shipIcon"></component>
  </div>
</template>

<script>

export default {
  props: {
    pawnData: Object
  },
  computed : {
    shipIcon () {
      import('./../Assets/graphics/pawns/battleship.svg')
      .then(module => {
        return module
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
};
</script>

<style lang="scss">
</style>