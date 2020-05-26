<template>
  <div>
    <div class="d-flex w-100 justify-content-between">
      {{ game.name }}
      <small>{{ game.gameDuration }} min ago</small>
    </div>

    <div class="d-flex w-100 justify-content-between">
      <p class="mb-1">
        <b-badge variant="info" pill>{{ game.players.length }}/{{ maxPlayers }}</b-badge>
      </p>
      <b-button v-if="game.hasJoined" size="sm" variant="outline-primary" @click="open(game.id)">open</b-button>
      <b-button v-if="!game.hasJoined && game.canJoin" size="sm" variant="outline-primary" @click="join(game.id)"
        >join</b-button
      >
      <b-button v-if="!game.canJoin && !game.hasJoined" size="sm" variant="outline-danger" disabled>closed</b-button>
    </div>
  </div>
</template>

<script>
  import { JOIN_OPEN_GAME, OPEN_GAME } from "./../eventsTypes.js";

  export default {
    name: "GameListItemComponent",
    props: {
      game: {
        type: Object,
        default: null
      },
      maxPlayers: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {};
    },
    methods: {
      join(gameId) {
        console.debug(`event-emit: ${JOIN_OPEN_GAME}`);

        this.$root.$emit(JOIN_OPEN_GAME, { gameId });
      },
      open(gameId) {
        console.debug(`event-emit: ${OPEN_GAME}`);

        this.$root.$emit(OPEN_GAME, { gameId });
      }
    }
  };
</script>
