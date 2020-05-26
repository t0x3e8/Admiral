<template>
  <b-form novalidate @submit.stop.prevent="onNewGame">
    <b-form-group label-for="gameSearchInput" label="List of games" label-size="lg">
      <b-list-group class="pl-3">
        <b-input-group>
          <b-form-input
            id="gameSearchInput"
            v-model="gameSearchText"
            placeholder="Search game ..."
            type="text"
            trim
          ></b-form-input>
        </b-input-group>
        <GamesListRefresh />
        <b-list-group-item
          v-for="(game, gameIndex) in gamesFiltred"
          :key="`${gameIndex}`"
          class="flex-column align-items-start"
        >
          <game-list-item :game="game" :max-players="maxPlayers" />
        </b-list-group-item>
      </b-list-group>
    </b-form-group>
  </b-form>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import GameListItem from "./GameListItemComponent.vue";
  import GamesListRefresh from "./GamesListRefreshComponent.vue";
  import _ from "underscore";
  import { REFRESH_GAMES_LIST } from "./../eventsTypes.js";

  export default {
    name: "GamesListComponent",
    components: {
      GameListItem,
      GamesListRefresh
    },
    data() {
      return {
        gameSearchText: "",
        maxPlayers: 2
      };
    },
    computed: {
      ...mapState(["games", "player"]),
      gamesFiltred() {
        const gamesIncludingState = _.map(this.games, (g) => {
          g.canJoin = g.players.length < this.maxPlayers;
          g.hasJoined = _.some(g.players, (p) => p.id === this.player.id);

          return g;
        });

        return _.filter(gamesIncludingState, (g) => g.name.toLowerCase().includes(this.gameSearchText));
      }
    },
    created() {
      this.refreshList();
    },
    mounted() {
      this.$root.$on(REFRESH_GAMES_LIST, this.refreshList);
    },
    beforeDestroy() {
      this.$root.$off(REFRESH_GAMES_LIST, this.refreshList);
    },
    methods: {
      ...mapActions(["getGames"]),
      refreshList() {
        this.getGames();
      }
    }
  };
</script>
