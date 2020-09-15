<template>
  <b-container id="gamecontrol">
    <b-row>
      <b-col>
        <b-button-group vertical class="w-100">
          <b-button v-if="isTurnOpen" :disabled="!isTurnCompleted" block variant="outline-success" @click="commitTurn">
            Commit Turn
          </b-button>
          <b-button v-if="isTurnOpen" variant="outline-secondary" :disabled="!isTurnCompleted" @click="rollbackTurn">
            Rollback
          </b-button>
          <b-button v-else variant="outline-secondary" @click="refresh">
            Waiting ({{ value }})
            <b-progress :value="value" :max="maxValue"  height="5px" animated variant="secondary"></b-progress>
          </b-button>
          <b-button variant="outline-danger" @click="returnToList">
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
  import { REFRESH_ACTIVE_GAME, COMMIT_TURN, ROLLBACK_TURN } from "./../eventsTypes.js";

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
        timerId: null,
        interval: 1000
      };
    },
    watch: {
      isTurnOpen(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }

        if (newVal) {
          this.stopTimer();
        } else {
          this.startTimer();
        }
      }
    },
    mounted() {
      if (!this.isTurnOpen) {
        this.startTimer();
      }
    },
    beforeDestroy() {
      this.stopTimer();
    },
    methods: {
      increaseMaxValue() {
        this.maxValue += 1;
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
      rollbackTurn() {
        console.debug(`event-emit: ${ROLLBACK_TURN}`);

        this.$root.$emit(ROLLBACK_TURN);
      },
      startTimer() {
        this.maxValue = 5;
        this.value = 5;

        this.timerId = setInterval(() => {
          if (this.value) {
            this.value -= 1;
          } else {
            this.increaseMaxValue();
            this.refresh();
          }
        }, this.interval);
      },
      stopTimer() {
        clearInterval(this.timerId);
      },
      returnToList() {
        this.$router.push({ name: "setup" });
      }
    }
  };
</script>

<style scoped></style>
