<template>
  <div style="background-color: var(--bg); min-height: 100vh">
    <Navbar :transparent="true" :hideOnScroll="true" />

    <!-- ===== DESKTOP LAYOUT ===== -->
    <div class="hidden lg:flex" style="padding-top: 82px">
      <!-- Left: Image Gallery -->
      <div
        ref="imageGalleryRef"
        class="sticky top-20.5 w-1/2 overflow-y-auto"
        style="
          height: calc(100vh - 82px);
          scrollbar-width: none;
          -ms-overflow-style: none;
        "
        @wheel="handleWheel"
        @mousemove="handleMouseMove"
        @mouseenter="showCursor = true"
        @mouseleave="showCursor = false"
      >
        <!-- Custom Cursor -->
        <div
          v-show="showCursor"
          class="fixed pointer-events-none z-50 flex items-center justify-center rounded-full bg-white shadow-md"
          style="width: 48px; height: 48px; transform: translate(-50%, -50%)"
          :style="{ left: cursorX + 'px', top: cursorY + 'px' }"
        >
          <span style="font-size: 20px; color: #111; font-weight: 300">+</span>
        </div>

        <div
          v-for="(image, index) in product.images"
          :key="index"
          style="width: 100%; aspect-ratio: 2/3"
        >
          <img
            :src="image"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Wishlist -->
        <button
          class="absolute bottom-6 right-6 z-10"
          :style="{ color: 'var(--text-secondary)' }"
        >
          <Heart :size="20" />
        </button>
      </div>

      <!-- Right: Product Details -->
      <div
        class="w-1/2 flex justify-center overflow-y-auto"
        style="height: calc(100vh - 82px); scrollbar-width: none"
      >
        <div
          class="w-full px-20! flex flex-col"
          style="max-width: 500px; padding: 2rem 0 3rem"
        >
          <h1
            class="text-3xl tracking-normal font-book mb-4!"
            :style="{ color: 'var(--text-primary)' }"
          >
            {{ product.name }}
          </h1>

          <p
            class="text-lg font-light mb-3! leading-relaxed"
            :style="{ color: 'var(--text-primary)' }"
          >
            {{ product.shortDescription }}
          </p>
          <p
            class="text-lg font-light mb-6! leading-relaxed"
            :style="{ color: 'var(--text-primary)' }"
          >
            {{ product.shortDescription2 }}
          </p>

          <!-- Color -->
          <div class="mb-4!">
            <p
              class="text-sm font-light mb-4!"
              :style="{ color: 'var(--text-primary)' }"
            >
              {{ selectedColor }}
            </p>

            <div class="flex items-center gap-1">
              <div
                v-for="color in product.colors"
                :key="color.hex"
                class="cursor-pointer transition-all duration-200"
                :style="{
                  width: '24px',
                  height: '24px',
                  backgroundColor: color.hex,
                  outline:
                    selectedColor === color.name
                      ? '2px solid var(--text-primary)'
                      : 'none',
                  outlineOffset: '2px',
                }"
                @click="selectedColor = color.name"
              ></div>
              <a
                href="#"
                class="text-xs font-extralight ml-auto! group"
                :style="{ color: 'var(--text-primary)' }"
              >
                <span class="relative">
                  View the colors
                  <span
                    class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-in-out"
                    :style="{ backgroundColor: 'var(--text-primary)' }"
                  ></span>
                </span>
              </a>
            </div>
          </div>

          <div
            style="border-top: 1px solid; color: #a4a4a4; margin: 1.5rem 0"
          ></div>

          <!-- See other sizes -->
          <div class="mb-6!">
            <p
              class="text-sm font-book mb-4!"
              :style="{ color: 'var(--text-primary)' }"
            >
              See other sizes
            </p>
            <div
              class="flex gap-3 overflow-x-auto pb-2!"
              style="scrollbar-width: none"
            >
              <div
                v-for="size in product.otherSizes"
                :key="size.name"
                class="cursor-pointer shrink-0"
                style="width: 90px"
                @click="selectSize(size)"
              >
                <div
                  class="overflow-hidden mb-2! transition-all duration-200"
                  style="
                    aspect-ratio: 3/4;
                    background-color: var(--bg-secondary);
                  "
                  :style="{
                    outline:
                      selectedSize === size.name
                        ? '1px solid var(--text-primary)'
                        : 'none',
                  }"
                >
                  <img
                    :src="size.image"
                    :alt="size.name"
                    class="w-full h-full object-cover"
                  />
                </div>
                <p
                  class="text-[11px] font-book leading-tight"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  {{ size.name }}
                </p>
              </div>
            </div>
          </div>

          <!-- Full Description -->
          <!-- <div class="mb-6">
            <ul
              class="text-sm space-y-1"
              :style="{ color: 'var(--text-primary)' }"
            >
              <li v-for="detail in product.details" :key="detail">
                - {{ detail }}
              </li>
            </ul>
            <p class="text-sm mt-4" :style="{ color: 'var(--text-primary)' }">
              {{ product.material }}
            </p>
            <p class="text-sm mt-1" :style="{ color: 'var(--text-primary)' }">
              {{ product.madeIn }}
            </p>
            <p class="text-sm mt-1" :style="{ color: 'var(--text-secondary)' }">
              {{ product.ref }}
            </p>
          </div> -->

          <!-- Sticky Add to Cart Desktop -->
          <div
            class="sticky bottom-0 mt-auto"
            style="background-color: var(--bg); padding: 1rem 0"
          >
            <button
              class="w-full flex items-center justify-between px-6! py-4! transition-opacity hover:opacity-80"
              :style="{
                backgroundColor: 'var(--button-bg)',
                color: 'var(--bg)',
              }"
            >
              <span
                class="flex items-center gap-2 text-xs font-extralight tracking-widest uppercase"
              >
                <ShoppingBag :size="11" />
                Add to cart
              </span>
              <span class="text-sm font-extralight"
                >{{ product.price }} USD</span
              >
            </button>
          </div>

          <!-- Details / Delivery / Assistance -->
          <div class="flex items-center gap-14 py-4!">
            <a
              href="#"
              class="text-sm font-book relative group transition-opacity"
              :style="{ color: 'var(--text-primary)' }"
            >
              <span class="relative">
                Details
                <span
                  class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-in-out"
                  :style="{ backgroundColor: 'var(--text-primary)' }"
                ></span>
              </span>
            </a>

            <a
              href="#"
              class="text-sm font-book relative group transition-opacity"
              :style="{ color: 'var(--text-primary)' }"
            >
              <span class="relative">
                Delivery and Returns
                <span
                  class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-in-out"
                  :style="{ backgroundColor: 'var(--text-primary)' }"
                ></span>
              </span>
            </a>

            <a
              href="#"
              class="text-sm font-book relative group transition-opacity"
              :style="{ color: 'var(--text-primary)' }"
            >
              <span class="relative">
                Assistance
                <span
                  class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-in-out"
                  :style="{ backgroundColor: 'var(--text-primary)' }"
                ></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Complete the look FULL WIDTH desktop -->
    <div class="hidden lg:block">
      <div style="padding: 3rem 0 1rem 0">
        <p
          class="text-sm mb-8! cursor-pointer group transition-opacity"
          style="padding-left: 2rem"
          :style="{ color: 'var(--text-primary)' }"
        >
          <span class="relative inline-block font-extralight">
            Complete the look
            <span
              class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-in-out"
              :style="{ backgroundColor: 'var(--text-primary)' }"
            ></span>
          </span>
        </p>
        <div class="grid gap-3 px-2! grid-cols-4">
          <div
            v-for="item in product.completeLook"
            :key="item.name"
            class="cursor-pointer group relative"
            @mouseenter="hoveredLook = item.name"
            @mouseleave="hoveredLook = null"
          >
            <div
              class="overflow-hidden relative"
              style="aspect-ratio: 3/4; background-color: var(--bg-secondary)"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />

              <!-- Left Arrow -->
              <button
                class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center transition-all duration-300"
                :style="
                  hoveredLook === item.name
                    ? 'opacity: 1; transform: translateY(-50%) translateX(0)'
                    : 'opacity: 0; transform: translateY(-50%) translateX(-8px)'
                "
              >
                <ChevronLeft
                  :size="18"
                  :style="{ color: 'var(--text-primary)' }"
                />
              </button>

              <!-- Right Arrow -->
              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center transition-all duration-300"
                :style="
                  hoveredLook === item.name
                    ? 'opacity: 1; transform: translateY(-50%) translateX(0)'
                    : 'opacity: 0; transform: translateY(-50%) translateX(8px)'
                "
              >
                <ChevronRight
                  :size="18"
                  :style="{ color: 'var(--text-primary)' }"
                />
              </button>
            </div>

            <div class="flex items-center justify-between px-4! py-3!">
              <div>
                <p class="text-sm" :style="{ color: 'var(--text-primary)' }">
                  {{ item.name }}
                </p>
                <p
                  class="text-sm mt-0.5"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  {{ item.price }} USD
                </p>
              </div>
              <Heart :size="14" :style="{ color: 'var(--text-secondary)' }" />
            </div>
          </div>
        </div>
      </div>

      <!-- Breadcrumb desktop -->
      <div class="flex items-center gap-2 text-sm py-8! px-8!">
        <a
          href="/"
          class="relative group"
          :style="{ color: 'var(--text-primary)' }"
        >
          Home
          <span
            class="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-300"
            :style="{ backgroundColor: 'var(--text-primary)' }"
          ></span>
        </a>

        <span :style="{ color: 'var(--text-secondary)' }">—</span>

        <a
          href="/women"
          class="relative group"
          :style="{ color: 'var(--text-primary)' }"
        >
          Women
          <span
            class="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-300"
            :style="{ backgroundColor: 'var(--text-primary)' }"
          ></span>
        </a>

        <span :style="{ color: 'var(--text-secondary)' }">—</span>

        <a
          href="/handbags"
          class="relative group"
          :style="{ color: 'var(--text-primary)' }"
        >
          Handbags
          <span
            class="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-300"
            :style="{ backgroundColor: 'var(--text-primary)' }"
          ></span>
        </a>
      </div>

      <!-- View more desktop -->
      <div class="px-8! pb-4!">
        <a
          href="#"
          class="text-sm relative group transition-opacity"
          :style="{ color: 'var(--text-primary)' }"
        >
          View more
          <span
            class="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-300 ease-in-out"
            :style="{ backgroundColor: 'var(--text-primary)' }"
          ></span>
        </a>
      </div>

      <!-- Category tags desktop -->
      <div
        class="flex gap-4 overflow-x-auto px-8! py-6!"
        style="scrollbar-width: none"
      >
        <a
          v-for="tag in product.tags"
          :key="tag"
          href="#"
          class="text-md whitespace-nowrap transition-opacity hover:opacity-60 shrink-0"
          :style="{ color: 'var(--text-secondary)' }"
        >
          {{ tag }}
        </a>
      </div>
    </div>

    <!-- ===== MOBILE LAYOUT ===== -->
    <div class="lg:hidden" style="padding-bottom: 80px">
      <!-- Image Swiper -->
      <div
        class="relative overflow-hidden w-full"
        style="aspect-ratio: 2/3"
        @touchstart="touchStart"
        @touchend="touchEnd"
      >
        <div
          class="flex transition-transform duration-500 ease-in-out h-full"
          :style="{ transform: `translateX(-${currentMobileImage * 100}%)` }"
        >
          <div
            v-for="(image, index) in product.images"
            :key="index"
            class="shrink-0 w-full h-full"
          >
            <img
              :src="image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Dot indicators -->
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div
            v-for="(_, index) in product.images"
            :key="index"
            class="rounded-full transition-all duration-300"
            :style="{
              width: currentMobileImage === index ? '16px' : '5px',
              height: '5px',
              backgroundColor: currentMobileImage === index ? '#111' : '#ccc',
            }"
          ></div>
        </div>
      </div>

      <!-- Product name + wishlist -->
      <div
        class="flex items-center justify-between px-4! py-7!"
        :style="{ borderBottom: '1px solid var(--border)' }"
      >
        <p class="text-md font-book" :style="{ color: 'var(--text-primary)' }">
          {{ product.name }}
        </p>
        <Heart :size="18" :style="{ color: 'var(--text-secondary)' }" />
      </div>

      <!-- Details -->
      <div class="px-4! py-6! flex flex-col gap-5">
        <!-- Short description centered -->
        <p
          class="text-sm leading-relaxed text-center"
          :style="{ color: 'var(--text-primary)' }"
        >
          {{ product.shortDescription }}
        </p>
        <p
          class="text-sm font-lighter leading-relaxed text-center"
          :style="{ color: 'var(--text-primary)' }"
        >
          {{ product.shortDescription2 }}
        </p>

        <!-- Color centered -->
        <div class="flex flex-col items-center gap-3">
          <p
            class="text-sm font-lighter"
            :style="{ color: 'var(--text-primary)' }"
          >
            {{ selectedColor }}
          </p>
          <div class="flex pb-4! items-center gap-2">
            <div
              v-for="color in product.colors"
              :key="color.hex"
              class="cursor-pointer"
              :style="{
                width: '22px',
                height: '22px',
                backgroundColor: color.hex,
                outline:
                  selectedColor === color.name
                    ? '2px solid var(--text-primary)'
                    : 'none',
                outlineOffset: '2px',
              }"
              @click="selectedColor = color.name"
            ></div>
          </div>

          <a
            href="#"
            class="text-xs font-lighter transition-opacity"
            :style="{
              color: 'var(--text-primary)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }"
          >
            View the colors
          </a>
        </div>

        <div :style="{ borderTop: '1px solid var(--border)' }"></div>

        <!-- See other sizes -->
        <!-- <div>
          <p
            class="text-sm mb-4 text-center"
            :style="{ color: 'var(--text-primary)' }"
          >
            See other sizes
          </p>
          <div
            class="flex gap-3 overflow-x-auto pb-2"
            style="scrollbar-width: none"
          >
            <div
              v-for="size in product.otherSizes"
              :key="size.name"
              class="cursor-pointer shrink-0"
              style="width: 100px"
              @click="selectSize(size)"
            >
              <div
                class="overflow-hidden mb-1.5 transition-all duration-200"
                style="aspect-ratio: 1/1; background-color: var(--bg-secondary)"
                :style="{
                  outline:
                    selectedSize === size.name
                      ? '2px solid var(--text-primary)'
                      : 'none',
                }"
              >
                <img
                  :src="size.image"
                  :alt="size.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <p
                class="text-[10px] leading-tight text-center"
                :style="{ color: 'var(--text-primary)' }"
              >
                {{ size.name }}
              </p>
            </div>
          </div>
        </div> -->

        <!-- Full details centered -->
        <div class="text-center">
          <ul
            class="text-sm text-center leading-8 space-y-1.5 inline-block"
            :style="{ color: 'var(--text-primary)' }"
          >
            <li v-for="detail in product.details" :key="detail">
              - {{ detail }}
            </li>
          </ul>
          <p class="text-sm mt-4!" :style="{ color: 'var(--text-primary)' }">
            {{ product.material }}
          </p>
          <p class="text-sm mt-1!" :style="{ color: 'var(--text-primary)' }">
            {{ product.madeIn }}
          </p>
          <p class="text-sm mt-1!" :style="{ color: 'var(--text-secondary)' }">
            {{ product.ref }}
          </p>
        </div>
      </div>

      <!-- Complete the look mobile -->
      <div class="pb-6!" :style="{ borderTop: '1px solid var(--border)' }">
        <p
          class="text-sm cursor-pointer px-4! py-4!"
          :style="{
            color: 'var(--text-primary)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }"
        >
          Complete the look
        </p>
        <div
          class="flex gap-3 overflow-x-auto px-4 pb-2"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          <div
            v-for="item in product.completeLook"
            :key="item.name"
            class="cursor-pointer shrink-0"
            style="width: calc((100% - 0.75rem) / 2)"
          >
            <div
              class="overflow-hidden"
              style="aspect-ratio: 3/4; background-color: var(--bg-secondary)"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex items-center justify-between px-2! py-2!">
              <div>
                <p class="text-xs" :style="{ color: 'var(--text-primary)' }">
                  {{ item.name }}
                </p>
                <p
                  class="text-xs mt-0.5"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  {{ item.price }} USD
                </p>
              </div>
              <Heart :size="14" :style="{ color: 'var(--text-secondary)' }" />
            </div>
          </div>
        </div>
      </div>

      <!-- View more mobile -->
      <div class="px-4! pb-4! pt-8!">
        <a
          href="#"
          class="text-sm"
          :style="{
            color: 'var(--text-primary)',
          }"
        >
          View more
        </a>
      </div>

      <!-- Category tags mobile -->
      <div
        class="flex gap-8 overflow-x-auto px-4! pt-2!"
        style="scrollbar-width: none"
      >
        <a
          v-for="tag in product.tags"
          :key="tag"
          href="#"
          class="text-sm whitespace-nowrap shrink-0"
          :style="{ color: 'var(--text-secondary)' }"
        >
          {{ tag }}
        </a>
      </div>
    </div>

    <!-- Sticky Add to Cart Mobile -->
    <div
      class="m-auto! lg:hidden w-[90%] fixed bottom-3 left-0 right-0 z-40"
      :style="{ backgroundColor: 'var(--button-bg)' }"
    >
      <button
        class="w-full flex items-center justify-between px-5! py-4!"
        :style="{ color: 'var(--bg)' }"
      >
        <span
          class="flex items-center gap-2 text-sm font-medium tracking-widest uppercase"
        >
          <ShoppingBag :size="16" />
          Add to cart
        </span>
        <span class="text-sm font-medium">{{ product.price }} USD</span>
      </button>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-vue-next";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { products } from "../data/Products";

const route = useRoute();

const product = computed(() => {
  const id = Number(route.params.id);
  return products.find((p) => p.id === id) || products[0];
});

const showCursor = ref(false);
const cursorX = ref(0);
const cursorY = ref(0);
const hoveredLook = ref<string | null>(null);
const selectedColor = ref(product.value.colors[0]?.name || "");
const selectedSize = ref(product.value.name);
const currentMobileImage = ref(0);
const touchStartX = ref(0);
const imageGalleryRef = ref<HTMLElement | null>(null);

const handleMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
};

const handleWheel = (e: WheelEvent) => {
  if (!imageGalleryRef.value) return;
  const el = imageGalleryRef.value;
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;
  const atTop = el.scrollTop === 0;
  if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
    e.preventDefault();
    el.scrollTop += e.deltaY;
  }
};

const touchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
};

const touchEnd = (e: TouchEvent) => {
  const diff = touchStartX.value - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (
      diff > 0 &&
      currentMobileImage.value < product.value.images.length - 1
    ) {
      currentMobileImage.value++;
    } else if (diff < 0 && currentMobileImage.value > 0) {
      currentMobileImage.value--;
    }
  }
};

const selectSize = (size: { name: string; image: string }) => {
  selectedSize.value = size.name;
};

const breadcrumbs = computed(() => [
  { label: "Home", to: "/" },
  ...product.value.breadcrumb,
  { label: product.value.name, to: null },
]);
</script>
