<template>
  <header
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-transparent border-b-0' : 'bg-white '"
    :style="{
      paddingLeft: '1.4rem',
      paddingRight: '1.4rem',
      backgroundColor: scrolled ? 'transparent' : 'var(--nav-bg)',
      borderColor: 'var(--border)',
    }"
  >
    <!-- Desktop Navbar -->
    <div class="hidden md:flex items-center justify-between h-[82px]">
      <!-- Left: Logo -->
      <RouterLink
        to="/"
        class="font-black text-[22px] tracking-[0.15em] uppercase flex-shrink-0"
        :style="{
          fontFamily: 'Inter, sans-serif',
          color: scrolled ? '#111111' : isDark ? '#ffffff' : '#111111',
        }"
      >
        Nyx Collective
      </RouterLink>
      <!-- Center: Nav Links -->
      <nav class="flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
        <RouterLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.href"
          class="relative text-[12px] whitespace-nowrap group"
          :style="{
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',
            color: scrolled ? '#111111' : isDark ? '#ffffff' : '#1f2937',
          }"
        >
          {{ link.label }}

          <span
            class="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 ease-in-out"
            :style="{
              backgroundColor: scrolled
                ? '#111111'
                : isDark
                  ? '#ffffff'
                  : '#1f2937',
            }"
          ></span>
        </RouterLink>
      </nav>

      <!-- Right: Icons + Cart -->
      <div class="flex items-center gap-5 flex-shrink-0">
        <!-- Search -->
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

        <!-- Dark/Light Toggle -->
        <button
          @click="toggleTheme"
          class="transition-colors duration-300"
          :style="{ color: getNavIconColor() }"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" :size="18" />
          <Moon v-else :size="18" />
        </button>

        <!-- Cart -->
        <RouterLink
          to="/cart"
          class="flex items-center gap-2 text-[13px] transition-colors duration-200"
          :style="{
            color: scrolled ? '#111111' : isDark ? '#ffffff' : '#1f2937',
          }"
        >
          Shopping cart
          <span
            class="w-1.5 h-1.5 rounded-full"
            :style="{
              backgroundColor: scrolled
                ? '#111111'
                : isDark
                  ? '#ffffff'
                  : '#111111',
            }"
          ></span>
        </RouterLink>
      </div>
    </div>

    <!-- Mobile Navbar -->
    <div class="flex md:hidden items-center justify-between h-[80px]">
      <RouterLink
        to="/"
        class="font-black text-[17px] tracking-[0.15em] uppercase text-gray-900"
        :style="{ fontFamily: 'Inter, sans-serif' }"
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
          :style="{
            backgroundColor: isDark ? '#ffffff' : '#111111',
          }"
        ></span>

        <button @click="toggleMenu">
          <Menu
            :size="22"
            :stroke-width="2.5"
            :style="{ color: isDark ? '#ffffff' : '#111111' }"
          />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <!-- Full Screen Menu -->
      <div
        class="fixed inset-0 z-50 md:hidden flex flex-col transition-colors duration-500"
        :style="{
          backgroundColor: isDark ? '#222831' : '#ffffff',
          color: isDark ? '#ffffff' : '#111111',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }"
      >
        <!-- Top: Logo + Close -->
        <div
          class="flex items-center justify-between h-[70px] flex-shrink-0"
          style="padding-left: 1.5rem; padding-right: 1.5rem"
        >
          <RouterLink
            to="/"
            @click="closeMenu"
            class="font-black text-[19px] tracking-[0.15em] uppercase text-gray-900"
            :style="{ fontFamily: 'Inter, sans-serif' }"
          >
            Nyx Collective
          </RouterLink>

          <!-- Dark/Light Toggle Mobile -->
          <button
            @click="toggleTheme"
            class="ransition-colors duration-500"
            :class="
              scrolled ? 'text-white' : isDark ? 'text-white' : 'text-gray-800'
            "
          >
            <Sun v-if="isDark" :size="17" />
            <Moon v-else :size="17" />
          </button>

          <button
            @click="closeMenu"
            :style="{ color: isDark ? '#ffffff' : '#111111' }"
            class="transition-colors hover:opacity-70"
          >
            <X :size="18" />
          </button>
        </div>

        <!-- Search -->
        <div
          class="flex items-center gap-3 flex-shrink-0"
          style="padding: 0 1.5rem 1.2rem 1.5rem"
          :style="{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.45s ease 100ms, transform 0.45s ease 100ms',
            borderBottom: isDark ? 'none' : '1px solid #e5e5e5',
          }"
        >
          <Search
            :size="14"
            :style="{ color: isDark ? '#9ca3af' : '#9ca3af' }"
            class="flex-shrink-0"
          />

          <input
            type="text"
            placeholder="Search here..."
            class="w-full text-sm outline-none bg-transparent"
            :style="{
              color: isDark ? '#ffffff' : '#6b7280',
            }"
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
            class="text-[16px] text-gray-900 border-b border-gray-100 hover:text-gray-400 transition-colors duration-200"
            style="padding: 0.8rem 1.5rem"
            :style="{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(18px)',
              transition:
                'opacity 0.45s ease ' +
                (index * 60 + 150) +
                'ms, transform 0.45s ease ' +
                (index * 60 + 150) +
                'ms',
              borderBottom: isDark ? 'none' : '1px solid #e5e5e5',
            }"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Bottom: Cart, Account, Customer Care -->
        <div
          class="flex flex-col flex-shrink-0 border-t border-gray-100"
          style="padding-bottom: 2.1rem"
          :style="{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.45s ease 580ms, transform 0.45s ease 580ms',
            borderTop: isDark ? 'none' : '1px solid #e5e5e5',
          }"
        >
          <RouterLink
            to="/cart"
            @click="closeMenu"
            class="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-400 transition-colors border-b border-gray-100"
            style="padding: 0.2rem 1.5rem"
            :style="{ borderBottom: isDark ? 'none' : '1px solid #e5e5e5' }"
          >
            <span
              class="w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0"
            ></span>
            Shopping cart
          </RouterLink>

          <button
            class="flex items-center gap-3 text-sm text-left transition-colors"
            :style="{
              padding: '0.6rem 1.5rem',
              color: isDark ? '#ffffff' : '#111111',
            }"
          >
            <User :size="14" class="flex-shrink-0" />
            Account
          </button>

          <button
            class="flex items-center gap-3 text-sm text-left transition-colors"
            :style="{
              padding: '0.6rem 1.5rem',
              color: isDark ? '#ffffff' : '#111111',
            }"
          >
            <MessageCircle :size="14" class="flex-shrink-0" />
            Customer Care
          </button>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import {
  Search,
  User,
  Heart,
  Menu,
  X,
  MessageCircle,
  Sun,
  Moon,
} from "lucide-vue-next";
import { useTheme } from "../composables/useTheme";

const { isDark, toggleTheme } = useTheme();

const isOpen = ref(false);

const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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

const getNavIconColor = () =>
  scrolled.value ? "#111111" : isDark.value ? "#ffffff" : "#111111";
</script>
