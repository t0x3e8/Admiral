<template>
  <b-container>
    <b-row>
      <b-col>
        <b-container class="text-center">
          <b-row>
            <div v-for="(pawn, index) in inactivePawns" :key="`7${index}`" style="width: 32px; height: 32px">
              {{ pawn }}
            </div>
            <hr />
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: "PawnsDestroyedCardComponent",
    props: {
      inactivePawns: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
      };
    }

  };
</script>

<style scoped>
</style>
