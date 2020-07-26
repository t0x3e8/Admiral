<template>
  <b-container id="gamecontrol">
    <b-row>
      <b-col>
        <b-button-group vertical class="w-75" size="sm">
          <b-button v-if="isTurnOpen" variant="primary" @click="refresh">
            Waiting ({{ value }})
            <b-progress :value="value" :max="maxValue" height="5px" animated variant="white"></b-progress>
          </b-button>
          <b-button v-if="!isTurnOpen" :disabled="!isTurnCompleted" variant="outline-primary" @click="commitTurn">
            Commit Turn
          </b-button>
          <b-button variant="outline-primary" @click="returnToList">
            Exit
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col> </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { REFRESH_ACTIVE_GAME, COMMIT_TURN } from "./../eventsTypes.js";
  export default {
    name: "GameControlPanelComponent",
    props: {
      isTurnCompleted: {
        type: Boolean,
        default: false
      },
      isTurnOpen: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        maxValue: 5,
        value: 5,
        timer: null,
        interval: 1000,
        counter: 1
      };
    },
    mounted() {
      this.timer = setInterval(() => {
        if (this.value) {
          this.value -= 1;
        } else {
          this.increaseMaxValue();

          /*
           * TODO:
           * this.refresh();
           */
        }
      }, this.interval);
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
    },
    methods: {
      increaseMaxValue() {
        this.counter += 1;
        this.maxValue += this.counter;
      },
      refresh() {
        console.debug(`event-emit: ${REFRESH_ACTIVE_GAME}`);

        this.$root.$emit(REFRESH_ACTIVE_GAME);
        this.value = this.maxValue;
      },
      commitTurn() {
        console.debug(`event-emit: ${COMMIT_TURN}`);

        this.$root.$emit(COMMIT_TURN);
      },
      returnToList() {
        this.$router.push({ name: "setup" });
      }
    }
  };
</script>

<style scoped></style>
