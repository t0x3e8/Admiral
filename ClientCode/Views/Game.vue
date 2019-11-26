<template>
  <div>
    <banner-control />
    <board-control />
  </div>
</template>

<script>
import BannerControl from "./../Components/BannerControl.vue";
import BoardControl from "./../Components/BoardContol.vue";

export default {
  data() {
    return {};
  },
  components: { BoardControl, BannerControl }
};
</script>
