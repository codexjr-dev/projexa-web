<script setup></script>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Header,
  },

  computed: {
    showSidebar() {
      return this.$store.state.page.sidebar.show;
    },
  },
};
</script>

<template lang="pug">
sidebar(
   v-if="showSidebar"
)
Header(
   v-if="showSidebar"
)
router-view.float-right(
   :style="!showSidebar ? 'width: 100vw; height: 100vh' : 'width: 90vw; height: 85vh'"
)
</template>

<style>
.float-right {
  width: 90vw;
  float: right;
  height: 85vh;
}
</style>
