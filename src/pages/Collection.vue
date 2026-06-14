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
        @click="$router.push({ path: '/', query: { menu: 'open' } })"
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

    <!-- ===== BAGS PAGE ===== -->
    <div v-if="isBags">
      <!-- Plain category links -->
      <div class="!mt-10">
        <a
          v-for="item in bagCategories"
          :key="item"
          href="#"
          class="block text-sm transition-opacity hover:opacity-60"
          style="padding: 0.6rem 1rem; font-size: 16px"
          :style="{
            color: 'var(--text-primary)',
            borderBottom: '1px solid var(--border)',
          }"
        >
          {{ item }}
        </a>
      </div>

      <!-- Product Grid horizontal scroll -->
      <div
        style="
          display: flex;
          overflow-x: auto;
          margin-top: 1rem;
          scrollbar-width: none;
        "
      >
        <div
          v-for="product in bagProducts"
          :key="product.name"
          class="cursor-pointer shrink-0"
          style="width: 40vw"
          :style="{ borderRight: '1px solid var(--border)' }"
        >
          <div
            style="
              aspect-ratio: 1/1;
              overflow: hidden;
              background-color: var(--bg-secondary);
              height: 50vw;
            "
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>
          <p
            class="text-[10px] py-1.5 px-2"
            :style="{ color: 'var(--text-primary)' }"
          >
            {{ product.name }}
          </p>
        </div>
      </div>
    </div>

    <!-- ===== NEW IN / WOMEN / MEN PAGE ===== -->
    <div v-else>
      <!-- Categories — untouched -->
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

      <!-- Images — untouched -->
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

// Bags specific
const isBags = computed(() => {
  return route.path === "/bags";
});

const bagCategories = [
  "View all",
  "New In",
  "Crossbody bags",
  "Shoulder bags",
  "Handbags",
  "Clutches",
  "Baskets & Raffia",
];

const bagProducts = [
  { name: "The Valéries", image: "/bag-1.jpg" },
  { name: "The Bambinos", image: "/bag-2.jpg" },
  { name: "Baskets & Raffia", image: "/bag-3.jpg" },
  { name: "The Rond Carré clutch", image: "/bag-4.jpg" },
  { name: "The Turismos", image: "/bag-5.jpg" },
  { name: "The Bisous", image: "/bag-6.jpg" },
  { name: "The Salons", image: "/bag-7.jpg" },
  { name: "The Chiquitos", image: "/bag-8.jpg" },
  { name: "The Berlingot", image: "/bag-9.jpg" },
];

// New In / Women / Men — untouched
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
