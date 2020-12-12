<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    this.$store.dispatch("initUser"); // 获取缓存中的用户信息
  },
};
</script>

<style>
</style>
