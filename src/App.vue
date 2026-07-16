<template>
  <div id="app">
    <RouterView />
    <CartDrawer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import CartDrawer from "./components/CartDrawer.vue";
</script>
