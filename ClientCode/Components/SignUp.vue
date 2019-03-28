<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="playerName"
      :rules="nameRules"
      :counter="10"
      label="Your name"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="join"
    >
      Join
    </v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';

export default {
    components: {},
    data() {
        return {
        playerName: '',
        valid: false,
        counter: 10,
        nameRules: [
            v => Boolean(v) || 'A player must have a name',
            v => v.length <= this.counter || 'Player\'s name should not be too long',
            v => (/^[a-z](?:_?[ a-z0-9]+)*$/iu).test(v) || 'Player\'s name must start with alphabetical letters'
        ]
        };
    },
    computed: {},
    methods: {
    join() {
        axios.post(
            '/user/CreateJWTToken',
            {
                'username': this.playerName
            }
        )
        .then(response => {
            this.playerName = `your names has been submitted to the server ${response}`;
        })
        .then(error => {
            this.playerName = `error ${error}`;
        });
    },
    clear() {
      this.playerName = '';
    }
  }
};
</script>

<style lang="sass">
</style>
