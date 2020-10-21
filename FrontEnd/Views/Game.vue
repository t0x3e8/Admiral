<template>
  <b-container v-show="!loading" fluid class="mt-1">
    <b-row no-gutters>
      <b-col cols="2">
        <b-list-group>
          <b-list-group-item>
            <pawn-card v-if="selectedPawn" />
            <div v-if="!selectedPawn" class="text-center">
              <b-alert show variant="light">No pawn selected</b-alert>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <div v-if="!isAnyShipDestroyer" class="text-center">
              <b-alert show variant="light">No destroyed ships</b-alert>
            </div>
            <pawns-destroyed-card v-else :inactive-pawns="game.inactivePawns" />
          </b-list-group-item>
          <b-list-group-item>
            <game-control-panel :is-turn-completed="isTurnCompleted" :is-turn-open="isTurnOpen" />
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="8">
        <board v-if="game !== null" :board="game.board" :is-turn-open="isTurnOpen" />
      </b-col>
      <b-col cols="2"> </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import Board from "./../Components/BoardComponent.vue";
  import GameControlPanel from "./../Components/GameControlPanelComponent.vue";
  import PawnCard from "./../Components/PawnCardComponent.vue";
  import PawnsDestroyedCard from "./../Components/PawnsDestroyedCardComponent.vue";
  import { mapState, mapActions } from "vuex";
  import { REFRESH_ACTIVE_GAME, COMMIT_TURN, BOARD_PAWN_SELECTED, ROLLBACK_TURN } from "./../eventsTypes.js";
  import { GameState } from "./../GameEngine/gameEnums.js";

  export default {
    name: "GameView",
    components: {
      Board,
      GameControlPanel,
      PawnCard,
      PawnsDestroyedCard
    },
    data() {
      return {
        game: null,
        loading: true,
        selectedPawn: null
      };
    },
    computed: {
      ...mapState(["activeGame", "player"]),
      // The method indicates whether the turn has been completed
      isTurnCompleted() {
        // eslint-disable-next-line no-magic-numbers
        return this.game && this.game.board.movedPawns.length > 0;
      },
      // The method indicates whether the turn is open, so the player can move pawns
      isTurnOpen() {
        const isPlayerActive = this.game && this.game.activePlayer === this.player.id,
          isGameStarted = this.game && this.game.state === GameState.STARTED;

        return isGameStarted && isPlayerActive;
      },
      // The method indicates whether any ships have been destroyed
      isAnyShipDestroyer() {
        // eslint-disable-next-line no-magic-numbers
        return this.game && this.game.inactivePawns && this.game.inactivePawns !== [];
      }
    },
    async mounted() {
      this.$root.$on(REFRESH_ACTIVE_GAME, this.setGame);
      this.$root.$on(COMMIT_TURN, this.commitGameTurn);
      this.$root.$on(ROLLBACK_TURN, this.rollbackGameTurn);
      this.$root.$on(BOARD_PAWN_SELECTED, this.onPawnSelected);

      await this.setGame();
      this.loading = false;
    },
    beforeDestroy() {
      this.$root.$off(REFRESH_ACTIVE_GAME, this.setGame);
      this.$root.$off(COMMIT_TURN, this.commitGameTurn);
      this.$root.$off(ROLLBACK_TURN, this.rollbackGameTurn);
      this.$root.$off(BOARD_PAWN_SELECTED, this.onPawnSelected);
    },
    methods: {
      ...mapActions(["openGame", "commitTurn"]),
      async setGame() {
        await this.openGame();
        this.game = this.activeGame;
      },
      async commitGameTurn() {
        await this.commitTurn({
          gameId: this.game.gameId,
          // eslint-disable-next-line no-magic-numbers
          pawn: this.game.board.movedPawns[0]
        });

        this.selectedPawn = null;
        await this.setGame();
      },
      async rollbackGameTurn() {
        await this.setGame();
      },
      onPawnSelected(selectedPawn) {
        this.selectedPawn = selectedPawn;
      }
    }
  };
</script>
