<template>
  <!-- ===== DESKTOP: slides down, docked below the navbar ===== -->
  <Transition name="search-desktop">
    <div
      v-if="isOpen"
      class="hidden lg:block fixed left-0 right-0 top-0 z-40 overflow-hidden"
      :style="{
        backgroundColor: isDark ? '#222831' : '#ffffff',
        borderTop: `1px solid ${isDark ? '#333' : '#e5e5e5'}`,
      }"
    >
      <!-- Input row -->
      <div class="flex items-center justify-between gap-4" style="padding: 1.5rem 2rem 3rem 2rem">
        <input
          v-model="query"
          type="text"
          placeholder="Search here"
          class="w-140 text-base bg-transparent outline-none pb-2!"
          style="border-bottom: 1px solid var(--border-secondary)"
          :style="{ color: isDark ? '#ffffff' : '#111111' }"
        />
        <button
          type="button"
          @click="close"
          class="shrink-0 transition-opacity hover:opacity-60"
          :style="{ color: isDark ? '#ffffff' : '#111111' }"
        >
          <X :size="18" />
        </button>
      </div>

      <div :style="{ borderTop: `1px solid ${isDark ? '#333' : '#e5e5e5'}` }"></div>

      <!-- Content -->
      <div class="flex gap-16!" style="padding: 2rem">
        <!-- Suggestions -->
        <div class="shrink-0" style="width: 280px">
          <p
            class="text-xs mb-4!"
            :style="{ color: isDark ? '#9ca3af' : 'var(--text-secondary)' }"
          >
            Suggestions
          </p>
          <div class="flex gap-10!">
            <div class="flex flex-col gap-3!">
              <a
                v-for="s in textSuggestions"
                :key="s"
                href="#"
                class="text-sm transition-opacity hover:opacity-60"
                :style="{ color: isDark ? '#ffffff' : 'var(--text-primary)' }"
              >
                {{ s }}
              </a>
            </div>
            <div class="flex flex-col gap-3!">
              <a
                v-for="c in categorySuggestions"
                :key="c"
                href="#"
                class="text-sm transition-opacity hover:opacity-60"
                :style="{ color: isDark ? '#ffffff' : 'var(--text-primary)' }"
              >
                {{ c }}
              </a>
            </div>
          </div>
        </div>

        <!-- Product thumbnail row -->
        <div class="flex-1 min-w-0 relative">
          <div
            ref="desktopRowRef"
            class="flex gap-3 overflow-x-auto"
            style="scrollbar-width: none"
            @scroll="updateScrollBar(desktopRowRef, 'desktop')"
          >
            <div
              v-for="item in suggestedProducts"
              :key="item.id"
              class="shrink-0 cursor-pointer"
              style="width: 150px"
              @click="goToBags"
            >
              <div
                class="overflow-hidden"
                style="aspect-ratio: 3/4; background-color: var(--bg-secondary)"
              >
                <img
                  :src="item.images[0]"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Left / Right arrows -->
          <button
            v-if="scrollState.desktop.canScrollLeft"
            type="button"
            @click="scrollRow(desktopRowRef, -220)"
            class="absolute left-0 top-1/3 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
            :style="{
              color: isDark ? '#ffffff' : '#111111',
              backgroundColor: isDark ? '#222831' : '#ffffff',
            }"
          >
            <ChevronLeft :size="18" />
          </button>
          <button
            v-if="scrollState.desktop.canScrollRight"
            type="button"
            @click="scrollRow(desktopRowRef, 220)"
            class="absolute right-0 top-1/3 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
            :style="{
              color: isDark ? '#ffffff' : '#111111',
              backgroundColor: isDark ? '#222831' : '#ffffff',
            }"
          >
            <ChevronRight :size="18" />
          </button>

          <!-- Custom scroll progress bar -->
          <div
            class="mt-3! rounded-full"
            style="height: 3px; width: 100%"
            :style="{ backgroundColor: isDark ? '#444' : '#e5e5e5' }"
          >
            <div
              class="h-full rounded-full transition-all duration-150"
              :style="{
                width: scrollState.desktop.thumbWidth + '%',
                marginLeft: scrollState.desktop.thumbOffset + '%',
                backgroundColor: isDark ? '#ffffff' : '#111111',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Backdrop for desktop, closes on outside click -->
  <div
    v-if="isOpen"
    class="hidden lg:block fixed inset-0 z-30"
    :style="{
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.35)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
    }"
    @click="close"
  ></div>

  <!-- ===== MOBILE: full-screen sheet, slides up from bottom ===== -->
  <Teleport to="body">
    <div
      class="lg:hidden fixed inset-0 z-70 flex flex-col"
      :style="{
        backgroundColor: isDark ? '#222831' : '#ffffff',
        transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
      }"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between shrink-0"
        style="padding: 1.25rem 1.5rem"
        :style="{ borderBottom: `1px solid ${isDark ? '#333' : '#e5e5e5'}` }"
      >
        <p class="text-sm" :style="{ color: isDark ? '#ffffff' : '#111111' }">
          Search
        </p>
        <button
          type="button"
          @click="close"
          :style="{ color: isDark ? '#ffffff' : '#111111' }"
        >
          <X :size="18" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto" style="scrollbar-width: none">
        <!-- Input -->
        <div style="padding: 1.25rem 1.5rem">
          <input
            v-model="query"
            type="text"
            placeholder="Search here"
            class="w-full text-base bg-transparent outline-none pb-2!"
            style="border-bottom: 2px solid var(--border-secondary)"
            :style="{ color: isDark ? '#ffffff' : '#111111' }"
          />
        </div>

        <!-- Suggestions -->
        <div style="padding: 0 1.5rem 1.5rem">
          <p
            class="text-xs mb-3!"
            :style="{ color: isDark ? '#9ca3af' : 'var(--text-secondary)' }"
          >
            Suggestions
          </p>
          <div class="flex flex-col gap-3!">
            <a
              v-for="s in [...textSuggestions, ...categorySuggestions]"
              :key="s"
              href="#"
              class="text-sm"
              :style="{ color: isDark ? '#ffffff' : 'var(--text-primary)' }"
            >
              {{ s }}
            </a>
          </div>
        </div>

        <!-- Most viewed items -->
        <div :style="{ borderTop: `1px solid ${isDark ? '#333' : '#e5e5e5'}` }">
          <p
            class="text-xs"
            style="padding: 1.25rem 1.5rem 1rem"
            :style="{ color: isDark ? '#9ca3af' : 'var(--text-secondary)' }"
          >
            Most viewed items
          </p>
          <div
            ref="mobileRowRef"
            class="flex gap-3 overflow-x-auto"
            style="padding: 0 1.5rem 1.5rem; scrollbar-width: none"
          >
            <div
              v-for="item in suggestedProducts"
              :key="item.id"
              class="shrink-0 cursor-pointer"
              style="width: 45%"
              @click="goToBags"
            >
              <div
                class="overflow-hidden"
                style="aspect-ratio: 3/4; background-color: var(--bg-secondary)"
              >
                <img
                  :src="item.images[0]"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, watch, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { X, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { useTheme } from "../composables/useTheme";

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: [] }>();

const router = useRouter();
const { isDark } = useTheme();

const query = ref("");

// Placeholder suggestions — replace with real search-suggestion data
// (or an API call) once the backend exists.
const textSuggestions = ['"Plage" - New In', "The Valéries", "The Bambinos"];
const categorySuggestions = ["Bags", "Hats"];

interface SearchThumbnail {
  id: number;
  name: string;
  images: [string];
}

const suggestedProducts: SearchThumbnail[] = [
  { id: 1, name: "The Valéries", images: ["/bag-1.avif"] },
  { id: 2, name: "The Bambinos", images: ["/bag-2.avif"] },
  { id: 3, name: "Baskets & Raffia", images: ["/bag-3.avif"] },
  { id: 4, name: "The Rond Carré clutch", images: ["/bag-4.avif"] },
  { id: 5, name: "The Turismos", images: ["/bag-5.avif"] },
  { id: 6, name: "The Bisous", images: ["/bag-6.avif"] },
];

const close = () => emit("close");

const goToBags = () => {
  close();
  router.push("/women");
};

const desktopRowRef = ref<HTMLElement | null>(null);


const scrollState = reactive({
  desktop: { canScrollLeft: false, canScrollRight: true, thumbWidth: 100, thumbOffset: 0 },
});

const updateScrollBar = (
  el: HTMLElement | null,
  key: keyof typeof scrollState,
) => {
  if (!el) return;
  const { scrollLeft, scrollWidth, clientWidth } = el;
  scrollState[key].canScrollLeft = scrollLeft > 4;
  scrollState[key].canScrollRight = scrollLeft + clientWidth < scrollWidth - 4;
  scrollState[key].thumbWidth = Math.min(100, (clientWidth / scrollWidth) * 100);
  scrollState[key].thumbOffset =
    (scrollLeft / scrollWidth) * 100 * (scrollWidth / clientWidth <= 1 ? 0 : 1);
};

const scrollRow = (el: HTMLElement | null, amount: number) => {
  if (!el) return;
  el.scrollBy({ left: amount, behavior: "smooth" });
};

// Recalculate the scroll bar once the panel becomes visible and has real dimensions,
// and lock page scroll behind it (both breakpoints — the mobile sheet is opaque and
// full-screen, but the page underneath could still scroll without this).
watch(
  () => props.isOpen,
  async (open) => {
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      query.value = "";
      await nextTick();
      updateScrollBar(desktopRowRef.value, "desktop");
    }
  },
);

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped>
.search-desktop-enter-active,
.search-desktop-leave-active {
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.3s ease;
}
.search-desktop-enter-from,
.search-desktop-leave-to {
  transform: translateY(-12px);
  opacity: 0;
}
</style>