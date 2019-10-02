<template>
  <v-banner single-line elevation="0">
    <v-icon slot="icon" color="warning" size="36">
      mdi information-outline
    </v-icon>
    To play with a friend, copy and send the link to the board
    <template v-slot:actions="{dismiss}">
      <v-btn text color="lime accent-4">Copy link</v-btn>
      <v-btn text @click="dismiss">Dismiss</v-btn>
    </template>
  </v-banner>
</template>

<script>
import {VBanner, VAvatar, VIcon, VBtn} from 'vuetify/lib';

export default {
  components: {
    VBanner,
    VAvatar, 
    VIcon,
    VBtn
  }
};
</script>