<template>
  <main>
    <Navbar />
    <Hero />
    <ProductGrid :products="firstGridProducts" />
    <SplitBanner
      :images="[
        { src: '/banner-left.jpg', label: 'Women\'s Gifts' },
        { src: '/banner-right.webp', label: 'Ceremony' },
        { src: '/banner2-left.jpg', label: 'Summer Accessories for Women' },
        { src: '/banner2-right.avif', label: 'Summer Accessories for Men' },
      ]"
    />
     <ProductGrid :products="secondGridProducts" />
    <Footer />
    
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import ProductGrid from "../components/ProductGrid.vue";
import SplitBanner from "../components/SplitBanner.vue";
import Footer from "../components/Footer.vue";

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
  currentImage: number;
  colors: string[];
  isNew: boolean;
  isPersonalizable: boolean;
  hasVariants: boolean;
}

const firstGridProducts = ref<Product[]>([
  {
    id: 1,
    name: "The Twisted shirt dress",
    price: "650",
    images: [
      "/product-1a.png",
      "/product-1b.png",
      "/product-1c.png",
      "/product-1d.png",
    ],
    currentImage: 0,
    colors: ["#b6af9d"],
    isNew: true,
    isPersonalizable: false,
    hasVariants: false,
  },
  {
    id: 2,
    name: "The Valerie bag",
    price: "890",
    images: [
      "/product-2a.png",
      "/product-2b.png",
      "/product-2c.png",
      "/product-2d.png",
    ],
    currentImage: 0,
    colors: ["#a8c5a0", "#c4a882", "#2c2c2c", "#A1591B"],
    isNew: true,
    isPersonalizable: true,
    hasVariants: false,
  },
  {
    id: 3,
    name: "The Hippocampe large scarf",
    price: "340",
    images: ["/product-3a.png", "/product-3b.jpeg", "/product-3c.jpeg"],
    currentImage: 0,
    colors: ["#C3A68A"],
    isNew: false,
    isPersonalizable: false,
    hasVariants: true,
  },
  {
    id: 4,
    name: "Cole Haan Men's sneakers",
    price: "420",
    images: [
      "/product-4a.jpeg",
      "/product-4b.jpeg",
      "/product-4c.jpeg",
      "/product-4d.jpeg",
    ],
    currentImage: 0,
    colors: ["#968573", "#fff", "#000"],
    isNew: false,
    isPersonalizable: false,
    hasVariants: false,
  },
  {
    id: 5,
    name: "Aurelia Woven Pochette",
    price: "850",
    images: ["/product-5a.jpeg", "/product-5b.jpeg"],
    currentImage: 0,
    colors: ["#000", "#EDB2DD", "#D90B0B", "#9AC1E3"],
    isNew: true,
    isPersonalizable: false,
    hasVariants: false,
  },
  {
    id: 6,
    name: "Sandstone Wool Overshirt",
    price: "1200",
    images: [
      "/product-6a.jpeg",
      "/product-6b.jpeg",
      "/product-6c.jpeg",
      "/product-6d.jpeg",
      "/product-6e.jpeg",
      "/product-6f.jpeg",
    ],
    currentImage: 0,
    colors: ["#E3D8CB", "#000000", "#FFFCED"],
    isNew: true,
    isPersonalizable: true,
    hasVariants: false,
  },
  {
    id: 7,
    name: "Marchese Leather Slipper",
    price: "700",
    images: ["/product-7a.jpg", "/product-7b.jpeg", "/product-7c.jpeg"],
    currentImage: 0,
    colors: ["#000"],
    isNew: false,
    isPersonalizable: false,
    hasVariants: true,
  },
  {
    id: 8,
    name: "The Tailored Saddle Bag",
    price: "1500",
    images: [
      "/product-8a.jpeg",
      "/product-8b.jpeg",
      "/product-8c.jpeg",
      "/product-8d.jpeg",
      "/product-8e.jpeg",
    ],
    currentImage: 0,
    colors: ["#000", "#A05D28"],
    isNew: true,
    isPersonalizable: false,
    hasVariants: false,
  },
]);

const secondGridProducts = ref<Product[]>([
  {
    id: 9,
    name: "Tom Ford sunglasses",
    price: "2700",
    images: ["/product-9a.jpeg", "/product-9b.png", "/product-9c.png"],
    currentImage: 0,
    colors: ["#d4a5a5", "#2c2c2c"],
    isNew: true,
    isPersonalizable: false,
    hasVariants: false,
  },
  {
    id: 10,
    name: "The Zenith Noir Shades",
    price: "3500",
    images: ["/product-10a.webp", "/product-10b.png", "/product-10c.png"],
    currentImage: 0,
    colors: [],
    isNew: true,
    isPersonalizable: false,
    hasVariants: false,
  },
  {
    id: 11,
    name: "Monarch Silk Utility Shirt",
    price: "1900",
    images: ["/product-11a.webp", "/product-11bb.png"],
    currentImage: 0,
    colors: ["#000000"],
    isNew: false,
    isPersonalizable: false,
    hasVariants: false,
  },
  {
    id: 12,
    name: "Nigeria 2026 Away Jersey - Men's",
    price: "100",
    images: ["/product-12a.png", "/product-12b.png", "/product-12c.jfif"],
    currentImage: 0,
    colors: ["#fff"],
    isNew: false,
    isPersonalizable: true,
    hasVariants: false,
  },
]);
</script>