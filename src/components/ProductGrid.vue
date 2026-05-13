<template>
  <section class="w-full" style="background-color: var(--bg)">
    <div class="grid grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        :ref="(el) => (cardRefs[index] = el as HTMLElement)"
        class="relative overflow-hidden cursor-pointer group"
        style="background-color: var(--bg-secondary); aspect-ratio: 3/4"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <!-- Tag top left -->
        <div class="absolute top-3 left-3 z-10 flex flex-col gap-1">
          <span
            v-if="product.isNew"
            class="text-[9px] tracking-widest uppercase"
            style="color: var(--text-secondary)"
          >
            New
          </span>
          <span
            v-if="product.isPersonalizable"
            class="text-[9px] tracking-widest uppercase"
            style="color: var(--text-secondary)"
          >
            Personalizable
          </span>
        </div>

        <!-- Color swatches -->
        <div
          v-if="product.colors.length > 0"
          class="absolute top-4 right-4 z-10 flex items-center gap-1.5 transition-all duration-300"
          :style="
            hoveredIndex === index
              ? 'opacity: 1; transform: translateY(0)'
              : 'opacity: 0; transform: translateY(6px)'
          "
        >
          <div
            v-for="color in product.colors"
            :key="color"
            class="w-3 h-3 rounded-sm cursor-pointer hover:ring-1 hover:ring-offset-1 hover:ring-gray-300"
            :style="{ backgroundColor: color }"
          ></div>
        </div>

        <!-- Product Image -->
        <div class="w-full h-full flex items-center justify-center p-6">
          <img
            :src="product.images[product.currentImage]"
            :alt="product.name"
            class="w-full h-full object-cover transition-all duration-500 ease-in-out"
          />
        </div>

        <!-- Left Arrow -->
        <button
          class="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center transition-all duration-300"
          :style="
            hoveredIndex === index
              ? 'opacity: 1; transform: translateY(-50%) translateX(0)'
              : 'opacity: 0; transform: translateY(-50%) translateX(-8px)'
          "
          @click.stop="prevImage(index)"
        >
          <ChevronLeft :size="18" style="color: var(--text-primary)" />
        </button>

        <!-- Right Arrow -->
        <button
          class="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center transition-all duration-300"
          :style="
            hoveredIndex === index
              ? 'opacity: 1; transform: translateY(-50%) translateX(0)'
              : 'opacity: 0; transform: translateY(-50%) translateX(8px)'
          "
          @click.stop="nextImage(index)"
        >
          <ChevronRight :size="18" style="color: var(--text-primary)" />
        </button>

        <!-- Bottom: Name + Price + Wishlist -->
        <div
          class="absolute bottom-0 left-0 right-0 flex items-end justify-between transition-all duration-300"
          style="padding: 0 1rem 1.2rem 1rem"
          :style="
            hoveredIndex === index
              ? 'opacity: 1; transform: translateY(0)'
              : 'opacity: 0; transform: translateY(8px)'
          "
        >
          <div>
            <p
              class="text-[12px] font-medium"
              style="color: var(--text-primary)"
            >
              {{ product.name }}
            </p>
            <p class="text-[12px] mt-0.5" style="color: var(--text-secondary)">
              {{ product.price }} USD
            </p>
          </div>
          <button class="flex-shrink-0" style="color: var(--text-secondary)">
            <Heart :size="16" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ChevronLeft, ChevronRight, Heart } from "lucide-vue-next";

onMounted(() => {});

const hoveredIndex = ref<number | null>(null);
const cardRefs = ref<HTMLElement[]>([]);

const prevImage = (index: number) => {
  const product = products.value[index];
  product.currentImage =
    product.currentImage === 0
      ? product.images.length - 1
      : product.currentImage - 1;
};

const nextImage = (index: number) => {
  const product = products.value[index];
  product.currentImage =
    product.currentImage === product.images.length - 1
      ? 0
      : product.currentImage + 1;
};

const products = ref([
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
    colors: [" #b6af9d"],
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
    images: [
      "/product-3a.png",
      "/product-3b.jpeg",
      "/product-3c.jpeg",
    ],
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
    name: "The Twisted shirt dress",
    price: "650",
    images: ["/public/product-5a.jpeg", "/public/product-5b.jpeg"],
    currentImage: 0,
    colors: [" #000", "#EDB2DD", "#D90B0B", "#9AC1E3"],
    isNew: true,
    isPersonalizable: false,
    hasVariants: false,
  },
  {
    id: 6,
    name: "Wool blend felt jacket",
    price: "890",
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
    name: "The Hippocampe large scarf",
    price: "340",
    images: [
      "/product-7a.jpg",
      "/product-7b.jpeg",
      "/product-7c.jpeg",
    ],
    currentImage: 0,
    colors: ["#C3A68A"],
    isNew: false,
    isPersonalizable: false,
    hasVariants: true,
  },
]);
</script>
