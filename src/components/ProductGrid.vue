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

const props = defineProps<{
  products: {
    id: number;
    name: string;
    price: string;
    images: string[];
    currentImage: number;
    colors: string[];
    isNew: boolean;
    isPersonalizable: boolean;
    hasVariants: boolean;
  }[];
}>();

const hoveredIndex = ref<number | null>(null);
const cardRefs = ref<HTMLElement[]>([]);
const products = ref(props.products.map((p) => ({ ...p })));

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

onMounted(() => {});
</script>
