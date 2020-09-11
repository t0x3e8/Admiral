<template>
  <b-card id="pawncontrol" header="Selected pawn" class="text-center">
    <b-card-title
      ><b>{{ pawn.name }}</b></b-card-title
    >
    <b-container>
      <b-row>
        <b-col>
          <component :is="selectedPawnIcon" class="selectedPawnIcon"></component>
        </b-col>
        <b-col>
          <b-list-group flush>
            <b-list-group-item>Range: {{ pawn.range }}</b-list-group-item>
            <b-list-group-item>Row: {{ pawn.row }}</b-list-group-item>
            <b-list-group-item>Col: {{ pawn.col }}</b-list-group-item>
            <b-list-group-item>
              <b-container>
                <b-row>
                  Be affraid of:
                  <ul>
                    <li v-for="(icon, index) in winnigPawnsIcons" :key="`3${index}`">
                      <component :is="icon"></component>
                    </li>
                  </ul>
                </b-row>
                <b-row>
                  You ar better:
                  <ul>
                    <li v-for="(icon, index) in defeatingPawnsIcons" :key="`4${index}`">
                      <component :is="icon"></component>
                    </li>
                  </ul>
                </b-row>
              </b-container>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </b-card>
</template>

<script>
  import { BOARD_PAWN_SELECTED } from "./../eventsTypes.js";
  import settingsHelper from "./../GameEngine/Utils/settingsHelper";
  import _ from "underscore";

  export default {
    name: "PawnCardComponent",
    data() {
      return {
        pawn: {},
        selectedPawnIcon: null,
        winnigPawnsIcons: [],
        defeatingPawnsIcons: []
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
        this.refreshIcons();
      },
      refreshIcons() {
        this.selectedPawnIcon = this.getPawnIcon(this.pawn.svgName);
        this.winnigPawnsIcons = [];
        this.defeatingPawnsIcons = [];

        _.forEach(settingsHelper.pawnsWinAgainst(this.pawn.type), (winningPawn) => {
          this.winnigPawnsIcons.push(this.getPawnIcon(winningPawn.svgName));
        });

        _.forEach(settingsHelper.pawnsDefeatedBy(this.pawn.type), (defeatedPawn) => {
          this.defeatingPawnsIcons.push(this.getPawnIcon(defeatedPawn.svgName));
        });
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

<style scoped></style>
