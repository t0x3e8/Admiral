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
  import { BOARD_PAWN_SELECTED } from "./../eventsTypes.js";
  import _ from "underscore";

  export default {
    name: "PawnCardComponent",
    data() {
      return {
        pawn: {}
      };
    },
    created() {
      this.$root.$on(BOARD_PAWN_SELECTED, this.onPawnSelected);
    },
    beforeDestroy() {
      this.$root.$off(BOARD_PAWN_SELECTED, this.onPawnSelected);
    },
    computed: {
      dynamicPawnIcon() {
        if (_.isNull(this.pawn.svgName) || _.isUndefined(this.pawn.svgName)) {
          return null;
        } else {
          return () =>
            import(
              /* webpackMode: "eager" */
              `./pawns/${this.pawn.svgName}`
            );
        }
      }
    },
    methods: {
      onPawnSelected(selectedPawn) {
        this.pawn = selectedPawn;
      }
    }
  };
</script>

<style scoped></style>
