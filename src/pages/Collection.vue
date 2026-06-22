<template>
  <div
    style="padding-top: 30px; min-height: 100vh; background-color: var(--bg)"
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
          }"
        >
          {{ item }}
        </a>
      </div>

      <!-- Product Grid horizontal scroll -->
      <div
        class="mt-0 md:!mt-35 lg:mt-0"
        style="
          display: flex;
          overflow-x: auto;
          margin-top: 1rem;
          scrollbar-width: none;
          gap: 0.5rem;
        "
      >
        <div
          v-for="product in bagProducts"
          :key="product.name"
          class="cursor-pointer flex-shrink-0 group"
          style="width: 40vw"
          :style="{ borderRight: '1px solid var(--border)' }"
        >
          <div style="overflow: hidden; background-color: var(--bg-secondary)">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>
          <p
            class="text-[14px] py-1.5 px-2 transition-opacity duration-200 group-hover:opacity-50"
            :style="{ color: isDark ? '#ffffff' : 'var(--text-primary)' }"
          >
            {{ product.name }}
          </p>
        </div>
      </div>
    </div>

    <!-- ===== WOMEN PAGE ===== -->
    <div v-else-if="isWomen">
      <!-- Categories with accordion + NEW badge -->
      <div class="!mt-10">
        <div
          v-for="item in womenCategories"
          :key="item.label"
          :style="{ borderBottom: '1px solid var(--border)' }"
        >
          <button
            class="flex items-center justify-between w-full text-left"
            style="padding: 0.6rem; font-size: 16px"
            :style="{ color: 'var(--text-primary)' }"
            @click="item.key ? toggle(item.key) : null"
          >
            <span class="flex items-center gap-2">
              {{ item.label }}
              <span
                v-if="item.isNew"
                class="text-[9px] font-medium px-1 py-0.5 rounded"
                style="
                  background-color: #ff4d4d;
                  color: #ffffff;
                  line-height: 1;
                "
              >
                NEW
              </span>
            </span>
            <span v-if="item.links.length > 0" style="font-size: 11px">
              {{ activeAccordion === item.key ? "∧" : "∨" }}
            </span>
          </button>
          <div
            v-if="item.links.length > 0"
            class="flex flex-col overflow-hidden transition-all duration-300"
            :style="
              activeAccordion === item.key
                ? 'max-height: 300px; opacity: 1'
                : 'max-height: 0; opacity: 0'
            "
          >
            <a
              v-for="link in item.links"
              :key="link"
              href="#"
              style="padding: 0.6rem 0.7rem; font-size: 15px"
              :style="{
                color: 'var(--text-secondary)',
              }"
              >{{ link }}</a
            >
          </div>
        </div>
      </div>

      <!-- Images -->
      <div class="!mt-10 !px-4 grid grid-cols-2" style="height: 50vh; gap: 8px">
        <div
          v-for="image in womenImages"
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

    <!-- ===== MEN PAGE ===== -->
    <div v-else-if="isMen">
      <div class="!mt-10">
        <div
          v-for="item in menCategories"
          :key="item.label"
          :style="{ borderBottom: '1px solid var(--border)' }"
        >
          <button
            class="flex items-center justify-between w-full text-left"
            style="padding: 0.6rem; font-size: 16px"
            :style="{ color: 'var(--text-primary)' }"
            @click="item.key ? toggle(item.key) : null"
          >
            <span class="flex items-center gap-2">
              {{ item.label }}
              <span
                v-if="item.isNew"
                class="text-[9px] font-medium px-1 py-0.5 rounded"
                style="
                  background-color: #ff4d4d;
                  color: #ffffff;
                  line-height: 1;
                "
              >
                NEW
              </span>
            </span>
            <span v-if="item.links.length > 0" style="font-size: 11px">
              {{ activeAccordion === item.key ? "∧" : "∨" }}
            </span>
          </button>
          <div
            v-if="item.links.length > 0"
            class="flex flex-col overflow-hidden transition-all duration-300"
            :style="
              activeAccordion === item.key
                ? 'max-height: 300px; opacity: 1'
                : 'max-height: 0; opacity: 0'
            "
          >
            <a
              v-for="link in item.links"
              :key="link"
              href="#"
              style="padding: 0.6rem 0.7rem; font-size: 15px"
              :style="{ color: 'var(--text-secondary)' }"
              >{{ link }}</a
            >
          </div>
        </div>
      </div>

      <div class="!mt-10 !px-4 grid grid-cols-2" style="height: 50vh; gap: 8px">
        <div
          v-for="image in menImages"
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
              class="text-white!"
              style="font-size: 10px; text-decoration: underline"
            >
              {{ image.discover }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== GIFTS PAGE ===== -->
    <div v-else-if="isGifts">
      <!-- Plain links no accordion -->
      <div class="!mt-10">
        <a
          v-for="item in giftsCategories"
          :key="item"
          href="#"
          class="block transition-opacity hover:opacity-60"
          style="padding: 0.6rem; font-size: 16px"
          :style="{
            color: 'var(--text-primary)',
            borderBottom: '1px solid var(--border)',
          }"
        >
          {{ item }}
        </a>
      </div>

      <!-- Images with labels overlaid -->
      <div class="!mt-10 !px-4 grid grid-cols-2" style="height: 50vh; gap: 8px">
        <div
          v-for="image in giftsImages"
          :key="image.label"
          class="relative overflow-hidden cursor-pointer"
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

    <!-- ===== EXPLORE PAGE ===== -->
    <div v-else-if="isExplore">
      <div class="!mt-10">
        <div
          v-for="item in exploreCategories"
          :key="item.label"
          :style="{ borderBottom: '1px solid var(--border)' }"
        >
          <button
            class="flex items-center justify-between w-full text-left"
            style="padding: 0.6rem; font-size: 16px"
            :style="{ color: 'var(--text-primary)' }"
            @click="item.key ? toggle(item.key) : null"
          >
            <span>{{ item.label }}</span>
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
              style="padding: 0.6rem 0.7rem; font-size: 15px"
              :style="{ color: 'var(--text-secondary)' }"
              >{{ link }}</a
            >
          </div>
        </div>
      </div>

      <div class="!mt-10 !px-4 grid grid-cols-2" style="height: 50vh; gap: 8px">
        <div
          v-for="image in exploreImages"
          :key="image.src"
          class="relative overflow-hidden cursor-pointer"
        >
          <video
            v-if="image.isVideo"
            :src="image.src"
            class="w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
          ></video>
          <img
            v-else
            :src="image.src"
            :alt="image.label"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"
          ></div>
          <div v-if="image.label" class="absolute bottom-4 left-3">
            <p class="text-white text-xs font-medium mb-1">{{ image.label }}</p>

            <a
              v-if="image.discover"
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

    <!-- ===== NEW IN / WOMEN / MEN PAGE ===== -->
    <div v-else>
      <!-- Categories — untouched -->
      <div class="!mt-10">
        <div v-for="item in categories" :key="item.label">
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
              style="padding: 0.6rem 0.7rem; font-size: 15px"
              :style="{
                color: 'var(--text-secondary)',
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
              class="text-white!"
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
import { useTheme } from "../composables/useTheme";
const { isDark } = useTheme();

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
  { name: "The Valéries", image: "/bag-1.avif" },
  { name: "The Bambinos", image: "/bag-2.avif" },
  { name: "Baskets & Raffia", image: "/bag-3.avif" },
  { name: "The Rond Carré clutch", image: "/bag-4.avif" },
  { name: "The Turismos", image: "/bag-5.avif" },
  { name: "The Bisous", image: "/bag-6.avif" },
  { name: "The Salons", image: "/bag-7.avif" },
  { name: "The Chiquitos", image: "/bag-8.avif" },
  { name: "The Berlingot", image: "/bag-9.avif" },
];

const isWomen = computed(() => route.path === "/women");

const womenCategories = [
  { label: '"Plage" - New In', key: null, links: [], isNew: true },
  { label: "Summer Accessories", key: null, links: [] },
  { label: "Ceremony", key: null, links: [] },
  {
    label: "Bags",
    key: "women-bags",
    links: [
      "View all",
      "New In",
      "Crossbody bags",
      "Shoulder bags",
      "Handbags",
      "Clutches",
    ],
  },
  {
    label: "Ready-to-wear",
    key: "women-rtw",
    links: [
      "View all",
      "New In",
      "Tops",
      "Bottoms",
      "Dresses",
      "Knitwear",
      "Swimwear",
    ],
  },
  {
    label: "Shoes",
    key: "women-shoes",
    links: ["View all", "New In", "Sandals", "Boots", "Sneakers", "Loafers"],
  },
  {
    label: "Accessories",
    key: "women-accessories",
    links: ["View all", "New In", "Scarves", "Belts", "Hats", "Jewellery"],
  },
  { label: "Gifts", key: null, links: [] },
  { label: "Les Classiques", key: null, links: [] },
];

const womenImages = [
  {
    src: "/menu-women.avif",
    label: "New In",
    discover: "Discover the women collection",
  },
  {
    src: "/mega2-women.webp",
    label: '"The Pochette Rond Carré"',
    discover: "Discover the new collection",
  },
];

// New In / Women / Men
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

const isMen = computed(() => route.path === "/men");

const menCategories = [
  { label: '"Summer of Sport" - New In', key: null, links: [], isNew: true },
  { label: '"Plage" - New In', key: null, links: [], isNew: true },
  { label: "Summer Accessories", key: null, links: [] },
  { label: "Ceremony", key: null, links: [] },
  {
    label: "Ready-to-wear",
    key: "men-rtw",
    links: ["View all", "New In", "Tops", "Bottoms", "Knitwear", "Swimwear"],
  },
  { label: "Bags", key: null, links: [] },
  {
    label: "Shoes",
    key: "men-shoes",
    links: ["View all", "New In", "Sneakers", "Sandals", "Loafers", "Boots"],
  },
  {
    label: "Accessories",
    key: "men-accessories",
    links: ["View all", "New In", "Belts", "Hats", "Jewellery", "Scarves"],
  },
  { label: "Gifts", key: null, links: [] },
  { label: "Les Classiques", key: null, links: [] },
];

const menImages = [
  {
    src: "/alpha-man.jpg",
    label: "New In",
    discover: "Discover the men collection",
  },
  {
    src: "/alpha2-man.jpg",
    label: '"The Féfé"',
    discover: "Discover the collection",
  },
];

const isGifts = computed(() => route.path === "/gifts");

const giftsCategories = [
  "Women's Gifts",
  "Men's Gifts",
  "Small Gifts",
  "Objects",
  "Gift Card",
];

const giftsImages = [
  {
    src: "/mega-gifts-women.webp",
    label: '"Gifts for women"',
    discover: "Discover the collection",
  },
  {
    src: "/mega-gifts-men.jpg",
    label: '"Gifts for men"',
    discover: "Discover the collection",
  },
];

const isExplore = computed(() => route.path === "/explore");

const exploreCategories = [
  { label: "Collections", key: null, links: [] },
  { label: "The House", key: null, links: [] },
  { label: "The Brand Ambassador, Liline Jacquemus", key: null, links: [] },
  { label: "The Jacquemus Office", key: null, links: [] },
  { label: "The Boutiques", key: null, links: [] },
  {
    label: "Our Savoir-faire",
    key: "savoir-faire",
    links: ["Atelier", "Materials", "Craftsmanship"],
  },
];
const exploreImages = [
  {
    src: "/mega-explore.mp4",
    label: '"Le Palmier"',
    discover: "",
    isVideo: true,
  },
  { src: "/mega-explore2.webp", label: "", discover: "", isVideo: false },
];
</script>
