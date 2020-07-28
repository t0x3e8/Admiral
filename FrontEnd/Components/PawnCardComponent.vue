<template>
  <b-card id="pawncontrol" header="Selected pawn" class="text-center">
    <b-card-title
      ><b>{{ pawn.name }}</b></b-card-title
    >
    <b-container>
      <b-row>
        <b-col>
          <component :is="dynamicPawnIcon" class="selectedPawnIcon"></component>
        </b-col>
        <b-col>
          <b-list-group flush>
            <b-list-group-item>Range: {{ pawn.range }}</b-list-group-item>
            <b-list-group-item>Row: {{ pawn.row }}</b-list-group-item>
            <b-list-group-item>Col: {{ pawn.col }}</b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </b-card>
</template>

<script>
  export default {
    name: "PawnCardComponent",
    props: {
      pawn: {
        type: Object,
        default: null
      }
    },
    computed: {
      dynamicPawnIcon() {
        return () =>
          import(
            /* webpackMode: "eager" */
            `./pawns/${this.pawn.svgName}`
          );
      }
    },
    data() {
      return {};
    }
  };
</script>

<style scoped>
</style>
