<template>
  <main>
    <Navbar />
    <Hero />
    <ProductGrid />
   <SplitBanner
  :images="[
    { src: '/banner-left.jpg', label: 'Women\'s Gifts' },
    { src: '/banner-right.webp', label: 'Ceremony' },
    { src: '/banner2-left.jpg', label: 'Summer Accessories for Women' },
    { src: '/banner2-right.jpg', label: 'Summer Accessories for Men' },
  ]"
/>
  </main>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import ProductGrid from '../components/ProductGrid.vue'
import SplitBanner from '../components/SplitBanner.vue'
</script>