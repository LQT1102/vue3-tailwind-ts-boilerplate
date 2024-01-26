<script setup lang="ts">
  import SvgComponent from '../assets/icons/test.svg';
</script>

<template>
  <div class="home">
    <SvgComponent />
    <h1 class="text-2xl">This is an home page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
