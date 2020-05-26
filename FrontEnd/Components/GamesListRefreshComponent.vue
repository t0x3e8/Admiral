<template>
  <b-button v-b-tooltip.hover.righttop="'Click to refresh list'" block variant="link" @click="refresh()">
    <b-progress :value="value" :max="maxValue" height="4px" animated variant="success"></b-progress>
  </b-button>
</template>

<script>
  import { REFRESH_GAMES_LIST } from "./../eventsTypes.js";

  export default {
    name: "GamesListRefreshComponent",
    data() {
      return {
        maxValue: 60,
        value: 60,
        timer: null,
        interval: 1000
      };
    },
    mounted() {
      this.timer = setInterval(() => {
        // eslint-disable-next-line no-magic-numbers
        if (this.value === 0) {
          this.refresh();
        } else {
          this.value -= 1;
        }
      }, this.interval);
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
    },
    methods: {
      refresh() {
        console.debug(`event-emit: ${REFRESH_GAMES_LIST}`);

        this.$root.$emit(REFRESH_GAMES_LIST);
        this.value = this.maxValue;
      }
    }
  };
</script>
