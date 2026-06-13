<template>
  <div
    style="padding-top: 80px; min-height: 100vh; background-color: var(--bg)"
  >
    <!-- Top Bar -->
    <div
      class="flex items-center justify-between !px-4 !py-4"
      :style="{ borderBottom: '1px solid var(--text-secondary)' }"
    >
      <button
        @click="$router.back()"
        class="flex items-center gap-2 text-2xl"
        :style="{ color: 'var(--text-primary)' }"
      >
        ← {{ pageTitle }}
      </button>
      <button
        @click="$router.push('/')"
        :style="{ color: 'var(--text-primary)' }"
      >
        ✕
      </button>
    </div>

    <!-- Categories -->
    <div class="!mt-10">
      <div
        v-for="item in categories"
        :key="item.label"
        :style="{ borderBottom: '1px solid var(--border)' }"
      >
        <button
          class="flex items-center justify-between w-full text-left"
          style="padding: 0.6rem; font-size: 16px"
          :style="{ color: 'var(--text-primary)' }"
          @click="item.key ? toggle(item.key) : null"
        >
          {{ item.label }}
          <span v-if="item.links.length > 0" style="font-size: 11px">
            {{ activeAccordion === item.key ? "∧" : "∨" }}
          </span>
        </button>
        <div
          v-if="item.links.length > 0"
          class="flex flex-col overflow-hidden transition-all duration-300"
          :style="
            activeAccordion === item.key
              ? 'max-height: 200px; opacity: 1'
              : 'max-height: 0; opacity: 0'
          "
        >
          <a
            v-for="link in item.links"
            :key="link"
            href="#"
            style="padding: 0.6rem 2rem; font-size: 13px"
            :style="{
              color: 'var(--text-secondary)',
              borderBottom: '1px solid var(--border)',
            }"
            >{{ link }}</a
          >
        </div>
      </div>
    </div>

    <!-- Images -->
    <div class="!mt-10 !px-4 grid grid-cols-2" style="height: 50vh; gap: 8px">
      <div
        v-for="image in heroImages"
        :key="image.label"
        class="relative overflow-hidden"
      >
        <img
          :src="image.src"
          :alt="image.label"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"
        ></div>
        <div class="absolute bottom-4 left-3">
          <p class="text-white text-xs font-medium mb-1">{{ image.label }}</p>

          <a
            href="#"
            class="!text-white"
            style="font-size: 10px; text-decoration: underline"
          >
            {{ image.discover }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeAccordion = ref<string | null>(null);

const toggle = (key: string) => {
  activeAccordion.value = activeAccordion.value === key ? null : key;
};

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    "/new-in": "New In",
    "/bags": "Bags",
    "/women": "Women",
    "/men": "Men",
    "/valerie-bag": "The Valérie Bag",
    "/gifts": "Gifts",
    "/explore": "Explore",
  };
  return map[route.path] || "Collection";
});

const categories = [
  {
    label: "Women - New In",
    key: "women-new-in",
    links: ["View all", "Bags", "Ready-to-wear", "Accessories & Shoes"],
  },
  {
    label: "Men - New In",
    key: "men-new-in",
    links: ["View all", "Ready-to-wear", "Accessories & Bags", "Shoes"],
  },
  { label: "New Bags", key: null, links: [] },
];

const heroImages = [
  {
    src: "/mega-women.jpg",
    label: "Women",
    discover: "Discover the novelties",
  },
  {
    src: "/mega-men.jfif",
    label: "Men",
    discover: "Discover the men novelties",
  },
];
</script>
