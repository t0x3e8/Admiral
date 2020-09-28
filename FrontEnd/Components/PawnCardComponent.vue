<template>
  <b-container v-if="pawn">
    <b-row>
      <b-col cols="4">
        <component :is="selectedPawnIcon" class="selectedPawnIcon"></component>
      </b-col>
      <b-col>
        <b-container class="text-center">
          <b-row>
            <span>
              <h3 class="align-middle">{{ pawn.name }}</h3>
            </span>
          </b-row>
          <b-row>
            <h5>Range: {{ pawn.range }}</h5>
          </b-row>
          <b-row id="strongerThanPawns">
            <div style="width: 32px; height: 32px" v-for="(icon, index) in strongerThanPawnsIcons" :key="`3${index}`">
              <component :is="icon"></component>
            </div>
            <hr />
          </b-row>
          <b-row id="weakerThanPawns">
            <div style="width: 32px; height: 32px" v-for="(icon, index) in weakerThanPawnsIcons" :key="`4${index}`">
              <component :is="icon"></component>
            </div>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { BOARD_PAWN_SELECTED } from "./../eventsTypes.js";
  import settingsHelper from "./../GameEngine/Utils/settingsHelper";
  import _ from "underscore";

  export default {
    name: "PawnCardComponent",
    data() {
      return {
        pawn: null,
        selectedPawnIcon: null,
        strongerThanPawnsIcons: [],
        weakerThanPawnsIcons: []
      };
    },
    created() {
      this.$root.$on(BOARD_PAWN_SELECTED, this.onPawnSelected);
    },
    beforeDestroy() {
      this.$root.$off(BOARD_PAWN_SELECTED, this.onPawnSelected);
    },
    computed: {},
    methods: {
      onPawnSelected(selectedPawn) {
        this.pawn = selectedPawn;

        if (this.pawn) {
          this.refreshIcons();
        }
      },
      refreshIcons() {
        if (this.pawn) {
          this.selectedPawnIcon = this.getPawnIcon(this.pawn.svgName);
          this.strongerThanPawnsIcons = [];
          this.weakerThanPawnsIcons = [];

          _.forEach(settingsHelper.pawnsWinAgainst(this.pawn.type), (winningPawn) => {
            this.strongerThanPawnsIcons.push(this.getPawnIcon(winningPawn.svgName));
          });

          _.forEach(settingsHelper.pawnsDefeatedBy(this.pawn.type), (defeatedPawn) => {
            this.weakerThanPawnsIcons.push(this.getPawnIcon(defeatedPawn.svgName));
          });
        }
      },
      getPawnIcon(svgName) {
        if (_.isNull(svgName) || _.isUndefined(svgName)) {
          return null;
        } else {
          return () =>
            import(
              /* webpackMode: "eager" */
              `./pawns/${svgName}`
            );
        }
      }
    }
  };
</script>

<style scoped>
  #strongerThanPawns svg circle {
    stroke: black;
    fill: lightgreen;
  }
  #strongerThanPawns svg g {
    fill: black;
  }

  #weakerThanPawns svg circle {
    stroke: black;
    fill: #ff8882;
  }
  #weakerThanPawns svg g {
    fill: black;
  }
</style>
