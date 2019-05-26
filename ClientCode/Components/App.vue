<template>
  <div id="app">
    <router-link to="/about"> Go to About </router-link>
    <router-link to="/dashboard"> Go to Dashboard </router-link>
    <router-view></router-view>
    <sign-up />
  </div>
</template>

<script>
  import SignUp from './SignUp.vue'

  export default {
    name: 'app',
    components: {
      SignUp
    }
  };
</script>

<style>
</style>
