<template>
  <v-container>
    <v-layout justify-center wrap row>
      <v-flex v-for="i in 10" :key="`${i}`" xs1>
        <v-card color="primary">
          <div>"`${i}`"</div>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 10" :key="`${i}`" xs1>
        <v-card color="secondary">
          <div>"`${i}`"</div>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 10" :key="`${i}`" xs1>
        <v-card color="primary">
          <div>"`${i}`"</div>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 10" :key="`${i}`" xs1>
        <v-card color="secondary">
          <div>"`${i}`"</div>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 10" :key="`${i}`" xs1>
        <v-card color="primary">
          <div>"`${i}`"</div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vuetify, { VContainer, VLayout, VFlex, VCard } from "vuetify/lib";

export default {
  components: {
    VContainer,
    VLayout,
    VFlex,
    VCard
  }
};
</script>

