<template>
  <b-container id="gamecontrol">
    <b-row>
      <b-col>
        <b-button-group vertical class="w-75" size="sm">
          <b-button variant="outline-primary" @click="returnToList">
            Exit
          </b-button>
          <b-button variant="primary" @click="refresh">
            Waiting ({{ value }})
            <b-progress :value="value" :max="maxValue" height="5px" animated variant="white"></b-progress>
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
  import { REFRESH_ACTIVE_GAME } from "./../eventsTypes.js";
  export default {
    name: "GameControlPanelComponent",
    props: {},
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
          this.refresh();
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
      returnToList() {
        this.$router.push({name: "setup"})
      }
    }
  };
</script>

<style scoped></style>
