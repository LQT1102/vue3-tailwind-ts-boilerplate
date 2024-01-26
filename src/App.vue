<script setup lang="ts">
import AppLayout from "./layouts/AppLayout.vue";
</script>

<template>
  <div>
    <h1>Main app</h1>
    <div>{{ $t("message") }}</div>
  </div>
  <h2><router-link to="/">Home</router-link></h2>
  <h2><router-link to="/about">About</router-link></h2>

  <AppLayout />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
