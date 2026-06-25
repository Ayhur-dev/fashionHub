<template>
  <div>
    <header
      ref="navRef"
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :style="{
        paddingLeft: '1.4rem',
        paddingRight: '1.4rem',
        backgroundColor:
          activeMegaMenu || !scrolled ? 'var(--nav-bg)' : 'transparent',

        opacity: navVisible ? '1' : '0',
        pointerEvents: navVisible ? 'auto' : 'none',
        transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
      }"
    >
      <!-- Desktop Navbar -->
      <div class="hidden lg:flex items-center justify-between h-20.5">
        <RouterLink
          to="/"
          @click.stop="closeMegaMenu"
          class="font-black text-[22px] tracking-[0.15em] uppercase shrink-0"
          :style="{
            fontFamily: 'Inter, sans-serif',
            color: isDark ? '#ffffff' : '#111111',
          }"
        >
          Nyx Collective
        </RouterLink>

        <nav class="flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          <button
            v-for="link in navLinks"
            :key="link.label"
            class="relative text-[12px] whitespace-nowrap group"
            :style="{
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400',
              color: isDark ? '#ffffff' : '#1f2937',
            }"
            @click="openMegaMenu(link.label)"
          >
            {{ link.label }}
            <span
              class="absolute bottom-0 left-0 h-px transition-all duration-300 ease-in-out"
              :class="
                activeMegaMenu === link.label
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              "
              :style="{ backgroundColor: isDark ? '#ffffff' : '#1f2937' }"
            ></span>
          </button>
        </nav>

        <div class="flex items-center gap-5 shrink-0">
          <button
            :style="{ color: getNavIconColor() }"
            class="hover:opacity-70 transition-opacity duration-200"
          >
            <Search :size="18" />
          </button>
          <button
            :style="{ color: getNavIconColor() }"
            class="hover:opacity-70 transition-opacity duration-200"
          >
            <User :size="18" />
          </button>
          <button
            :style="{ color: getNavIconColor() }"
            class="hover:opacity-70 transition-opacity duration-200"
          >
            <Heart :size="18" />
          </button>
          <button
            @click="toggleTheme"
            class="transition-colors duration-300"
            :style="{ color: getNavIconColor() }"
          >
            <Sun v-if="isDark" :size="18" />
            <Moon v-else :size="18" />
          </button>
          <RouterLink
            to="/cart"
            class="flex items-center gap-2 text-[13px] transition-colors duration-200"
            :style="{ color: isDark ? '#ffffff' : '#1f2937' }"
          >
            Shopping cart
            <span
              class="w-1.5 h-1.5 rounded-full"
              :style="{ backgroundColor: isDark ? '#ffffff' : '#111111' }"
            ></span>
          </RouterLink>
        </div>
      </div>

      <!-- Mobile Navbar -->
      <div class="flex lg:hidden items-center justify-between h-20">
        <RouterLink
          to="/"
          @click.stop="closeMegaMenu"
          class="font-black text-[17px] tracking-[0.15em] uppercase"
          :style="{
            fontFamily: 'Inter, sans-serif',
            color: isDark ? '#ffffff' : '#111111',
          }"
        >
          Nyx Collective
        </RouterLink>
        <div class="flex items-center gap-4">
          <button :style="{ color: isDark ? '#ffffff' : '#111111' }">
            <Search :size="17" />
          </button>
          <button :style="{ color: isDark ? '#ffffff' : '#111111' }">
            <Heart :size="17" />
          </button>
          <span
            class="w-1.5 h-1.5 rounded-full"
            :style="{ backgroundColor: isDark ? '#ffffff' : '#111111' }"
          ></span>
          <button
            @click="toggleTheme"
            class="transition-colors duration-300"
            :style="{ color: isDark ? '#ffffff' : '#111111' }"
          >
            <Sun v-if="isDark" :size="17" />
            <Moon v-else :size="17" />
          </button>
          <button @click="toggleMenu">
            <Menu
              :size="22"
              :stroke-width="2.5"
              :style="{ color: isDark ? '#ffffff' : '#111111' }"
            />
          </button>
        </div>
      </div>

      <!-- Mega Menu -->
      <Transition name="mega">
        <div
          v-if="activeMegaMenu"
          class="fixed left-0 h-[calc(100vh-82px)] right-0 bottom-0 z-40 flex overflow-hidden"
          :style="{
            top: '82px',
            backgroundColor: isDark ? '#222831' : '#ffffff',
            borderTop: `1px solid ${isDark ? '#333' : '#e5e5e5'}`,
          }"
        >
          <!-- Left Sidebar -->
          <div
            class="flex flex-col gap-2 shrink-0 overflow-y-auto h-full"
            :style="{
              width: '340px',
              padding: '2rem 2.5rem',
            }"
          >
            <template
              v-for="item in megaMenus[activeMegaMenu]?.sidebar"
              :key="item.label"
            >
              <!-- Accordion Header -->
              <button
                class="flex items-center justify-between w-full text-left !py-2 group"
                :style="{
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                }"
                @click="
                  item.key
                    ? (activeAccordion =
                        activeAccordion === item.key ? null : item.key)
                    : null
                "
              >
                <span class="relative flex items-center gap-2">
                  {{ item.label }}
                  <!-- NEW badge -->
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
                  <span
                    class="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ease-in-out"
                    :style="{ backgroundColor: isDark ? '#ffffff' : '#111111' }"
                  ></span>
                </span>
                <ChevronDown
                  v-if="item.links.length > 0"
                  :size="13"
                  class="transition-transform duration-300 shrink-0"
                  :style="{
                    color: 'var(--text-secondary)',
                    transform:
                      activeAccordion === item.key
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                  }"
                />
              </button>

              <!-- Accordion Links -->
              <div
                v-if="item.links.length > 0"
                class="flex flex-col overflow-hidden transition-all duration-300 gap-4"
                :style="
                  activeAccordion === item.key
                    ? 'max-height: 200px; opacity: 1'
                    : 'max-height: 0px; opacity: 0'
                "
              >
                <a
                  v-for="link in item.links"
                  :key="link"
                  href="#"
                  class="text-[12px] py-2 pl-2 transition-opacity duration-200 hover:opacity-60"
                  :style="{ color: isDark ? '#9ca3af' : '#6b7280' }"
                >
                  {{ link }}
                </a>
              </div>
            </template>
          </div>

          <!-- Middle: Product Grid — only for Bags -->
          <div
            v-if="megaMenus[activeMegaMenu]?.products"
            class="flex-1 h-full"
            :style="{ borderRight: `1px solid ${isDark ? '#333' : '#e5e5e5'}` }"
          >
            <div class="grid grid-cols-3 gap-1" style="width: 28rem">
              <div
                v-for="product in megaMenus[activeMegaMenu]?.products"
                :key="product.name"
                class="cursor-pointer group"
              >
                <div
                  class="overflow-hidden"
                  style="
                    width: 100%;
                    height: 160px;
                    background-color: var(--bg-secondary);
                  "
                >
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <p class="text-sm font-light !py-1 px-1">
                  <span
                    class="relative inline-block transition-opacity duration-200"
                    :style="{
                      color: isDark ? '#ffffff' : 'var(--text-primary)',
                    }"
                  >
                    {{ product.name }}
                    <span
                      class="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ease-in-out"
                      :style="{
                        backgroundColor: isDark
                          ? '#ffffff'
                          : 'var(--text-primary)',
                      }"
                    ></span>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- Right: Images -->
          <div
            :class="
              megaMenus[activeMegaMenu]?.products
                ? 'w-[550px] shrink-0'
                : 'flex flex-1'
            "
            class="h-full"
          >
            <div
              v-for="image in megaMenus[activeMegaMenu]?.images"
              :key="image.src"
              class="relative overflow-hidden cursor-pointer h-full !pr-6"
              :class="megaMenus[activeMegaMenu]?.products ? 'w-full' : 'flex-1'"
            >
              <!-- Video -->
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
              <div class="absolute inset-0"></div>
              <div
                v-if="image.label"
                class="!p-10 absolute bottom-6 left-6 z-10"
              >
                <p class="text-white text-sm font-medium mb-1">
                  {{ image.label }}
                </p>

                <a
                  v-if="image.discover"
                  href="#"
                  class="text-white! text-xs"
                  style="text-decoration: underline; text-underline-offset: 3px"
                >
                  {{ image.discover }}
                </a>
              </div>
            </div>
          </div>

          <!-- Close Button -->
          <button
            @click="closeMegaMenu"
            class="absolute top-0 right-4 transition-opacity duration-200 hover:opacity-60"
            :style="{ color: isDark ? '#ffffff' : '#111111' }"
          >
            <X :size="18" />
          </button>
        </div>
      </Transition>
    </header>

    <!-- Teleport outside header -->
    <Teleport to="body">
      <div
        class="fixed inset-0 z-50 lg:hidden flex flex-col transition-colors duration-500"
        :style="{
          backgroundColor: isDark ? '#222831' : '#ffffff',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }"
      >
        <!-- Top: Logo + Close -->
        <div
          class="flex items-center justify-between h-[70px] shrink-0"
          style="padding-left: 1.5rem; padding-right: 1.5rem"
        >
          <RouterLink
            to="/"
            @click="closeMenu"
            class="font-black text-[19px] tracking-[0.15em] uppercase"
            :style="{
              fontFamily: 'Inter, sans-serif',
              color: isDark ? '#ffffff' : '#111111',
            }"
          >
            Nyx Collective
          </RouterLink>
          <div class="flex items-center gap-4">
            <button
              @click="toggleTheme"
              class="transition-colors duration-300"
              :style="{ color: isDark ? '#ffffff' : '#111111' }"
            >
              <Sun v-if="isDark" :size="17" />
              <Moon v-else :size="17" />
            </button>
            <button
              @click="closeMenu"
              class="transition-colors hover:opacity-70"
              :style="{ color: isDark ? '#ffffff' : '#111111' }"
            >
              <X :size="18" />
            </button>
          </div>
        </div>

        <!-- Search -->
        <div
          class="flex items-center gap-3 shrink-0"
          style="padding: 0 1.5rem 1.2rem 1.5rem"
          :style="{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.45s ease 100ms, transform 0.45s ease 100ms',
            borderBottom: `1px solid ${isDark ? '#333' : '#e5e5e5'}`,
          }"
        >
          <Search :size="14" class="shrink-0" :style="{ color: '#9ca3af' }" />
          <input
            type="text"
            placeholder="Search here..."
            class="w-full text-sm outline-none bg-transparent"
            :style="{ color: isDark ? '#ffffff' : '#6b7280' }"
          />
        </div>

        <!-- Nav Links -->
        <nav
          class="flex flex-col flex-1 overflow-y-auto"
          style="margin-top: 0.7rem"
        >
          <RouterLink
            v-for="(link, index) in navLinks"
            :key="link.label"
            :to="link.href"
            @click="closeMenu"
            class="text-[16px] transition-colors duration-200"
            style="padding: 0.8rem 1.5rem"
            :style="{
              color: isDark ? '#ffffff' : '#111111',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(18px)',
              transition: `opacity 0.45s ease ${index * 60 + 150}ms, transform 0.45s ease ${index * 60 + 150}ms`,
              borderBottom: `1px solid ${isDark ? '#333' : '#e5e5e5'}`,
            }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Bottom: Cart, Account, Customer Care -->
        <div
          class="flex flex-col shrink-0"
          style="padding-bottom: 2.1rem"
          :style="{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.45s ease 580ms, transform 0.45s ease 580ms',
            borderTop: `1px solid ${isDark ? '#333' : '#e5e5e5'}`,
          }"
        >
          <RouterLink
            to="/cart"
            @click="closeMenu"
            class="flex items-center gap-3 text-sm transition-colors"
            style="padding: 0.8rem 1.5rem"
            :style="{
              color: isDark ? '#ffffff' : '#4b5563',
              borderBottom: `1px solid ${isDark ? '#333' : '#e5e5e5'}`,
            }"
          >
            <span
              class="w-1.5 h-1.5 rounded-full shrink-0"
              :style="{ backgroundColor: isDark ? '#ffffff' : '#374151' }"
            ></span>
            Shopping cart
          </RouterLink>
          <button
            class="flex items-center gap-3 text-sm text-left transition-colors"
            :style="{
              padding: '0.8rem 1.5rem',
              color: isDark ? '#ffffff' : '#4b5563',
              borderBottom: `1px solid ${isDark ? '#333' : '#e5e5e5'}`,
            }"
          >
            <User
              :size="14"
              class="shrink-0"
              :style="{ color: isDark ? '#ffffff' : '#6b7280' }"
            />
            Account
          </button>
          <button
            class="flex items-center gap-3 text-sm text-left transition-colors"
            :style="{
              padding: '0.8rem 1.5rem',
              color: isDark ? '#ffffff' : '#4b5563',
            }"
          >
            <MessageCircle
              :size="14"
              class="shrink-0"
              :style="{ color: isDark ? '#ffffff' : '#6b7280' }"
            />
            Customer Care
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import {
  Search,
  User,
  Heart,
  Menu,
  X,
  MessageCircle,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-vue-next";
import { useTheme } from "../composables/useTheme";

const route = useRoute();
const { isDark, toggleTheme } = useTheme();

const isOpen = ref(false);
const scrolled = ref(false);
const navVisible = ref(true);
const activeMegaMenu = ref<string | null>(null);
const activeAccordion = ref<string | null>(null);

const handleScroll = () => {
  scrolled.value = window.scrollY > 10;
  const footer = document.querySelector("footer");
  if (footer) {
    const footerTop = footer.getBoundingClientRect().top;
    navVisible.value = footerTop > 80;
  }
};

// Single onMounted — no duplicates
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  if (route.query.menu === "open") {
    isOpen.value = true;
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(
  () => route.query.menu,
  (val) => {
    if (val === "open") {
      isOpen.value = true;
    }
  },
);

watch(activeMegaMenu, (value) => {
  document.body.style.overflow = value ? "hidden" : "";
});

const navLinks = [
  { label: "New In", href: "/new-in" },
  { label: "Bags", href: "/bags" },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "The Valérie Bag", href: "/valerie-bag" },
  { label: "Gifts", href: "/gifts" },
  { label: "Explore", href: "/explore" },
];

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
const closeMenu = () => {
  isOpen.value = false;
};
const getNavIconColor = () => (isDark.value ? "#ffffff" : "#111111");

const megaMenus: Record<
  string,
  {
    sidebar: {
      label: string;
      key: string | null;
      links: string[];
      isNew?: boolean;
    }[];
    images: {
      src: string;
      label: string;
      discover: string;
      isVideo?: boolean;
    }[];
    products?: { name: string; image: string }[];
  }
> = {
  "New In": {
    sidebar: [
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
    ],
    images: [
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
    ],
  },
  Woomen: {
    sidebar: [
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
    ],
    images: [
      {
        src: "/mega-women.jpg",
        label: "Women",
        discover: "Discover the novelties",
      },
      {
        src: "/mega-men.jpg",
        label: "Men",
        discover: "Discover the men novelties",
      },
    ],
  },
  Men: {
    sidebar: [
      {
        label: '"Summer of Sport" - New In',
        key: null,
        links: [],
        isNew: true,
      },
      { label: '"Plage" - New In', key: null, links: [], isNew: true },
      { label: "Summer Accessories", key: null, links: [] },
      { label: "Ceremony", key: null, links: [] },
      {
        label: "Ready-to-wear",
        key: "men-rtw",
        links: [
          "View all",
          "New In",
          "Tops",
          "Bottoms",
          "Knitwear",
          "Swimwear",
        ],
      },
      { label: "Bags", key: null, links: [] },
      {
        label: "Shoes",
        key: "men-shoes",
        links: [
          "View all",
          "New In",
          "Sneakers",
          "Sandals",
          "Loafers",
          "Boots",
        ],
      },
      {
        label: "Accessories",
        key: "men-accessories",
        links: ["View all", "New In", "Belts", "Hats", "Jewellery", "Scarves"],
      },
      { label: "Gifts", key: null, links: [] },
      { label: "Les Classiques", key: null, links: [] },
    ],
    images: [
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
    ],
  },
  Bags: {
    sidebar: [
      { label: "View all", key: null, links: [] },
      { label: "New In", key: null, links: [] },
      { label: "Crossbody bags", key: null, links: [] },
      { label: "Shoulder bags", key: null, links: [] },
      { label: "Handbags", key: null, links: [] },
      { label: "Clutches", key: null, links: [] },
      { label: "Baskets & Raffia", key: null, links: [] },
    ],
    images: [
      {
        src: "/bagmodel.webp",
        label: '"Valentino Nellcôte bag"',
        discover: "Discover the collection",
      },
    ],
    products: [
      { name: "The Valéries", image: "/bag-1.avif" },
      { name: "The Bambinos", image: "/bag-2.avif" },
      { name: "Baskets & Raffia", image: "/bag-3.avif" },
      { name: "The Rond Carré clutch", image: "/bag-4.avif" },
      { name: "The Turismos", image: "/bag-5.avif" },
      { name: "The Bisous", image: "/bag-6.avif" },
      { name: "The Salons", image: "/bag-7.avif" },
      { name: "The Chiquitos", image: "/bag-8.avif" },
      { name: "The Berlingot", image: "/bag-9.avif" },
    ],
  },
  Women: {
    sidebar: [
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
        links: [
          "View all",
          "New In",
          "Sandals",
          "Boots",
          "Sneakers",
          "Loafers",
        ],
      },
      {
        label: "Accessories",
        key: "women-accessories",
        links: ["View all", "New In", "Scarves", "Belts", "Hats", "Jewellery"],
      },
      { label: "Gifts", key: null, links: [] },
      { label: "Les Classiques", key: null, links: [] },
    ],
    images: [
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
    ],
  },
  Gifts: {
    sidebar: [
      { label: "Women's Gifts", key: null, links: [] },
      { label: "Men's Gifts", key: null, links: [] },
      { label: "Small Gifts", key: null, links: [] },
      { label: "Objects", key: null, links: [] },
      { label: "Gift Card", key: null, links: [] },
    ],
    images: [
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
    ],
  },
  Explore: {
    sidebar: [
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
    ],
    images: [
      {
        src: "/mega-explore.mp4",
        label: '"Le Palmier"',
        discover: "",
        isVideo: true,
      },
      { src: "/mega-explore2.webp", label: "", discover: "" },
    ],
  },
};

const openMegaMenu = (label: string) => {
  if (megaMenus[label]) {
    activeMegaMenu.value = activeMegaMenu.value === label ? null : label;
    activeAccordion.value = null;
  }
};

const closeMegaMenu = () => {
  activeMegaMenu.value = null;
  activeAccordion.value = null;
};
</script>

<style scoped>
.mega-enter-active,
.mega-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.mega-enter-from,
.mega-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
