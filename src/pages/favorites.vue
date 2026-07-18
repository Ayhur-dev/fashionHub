<template>
  <div style="background-color: var(--bg); min-height: 100vh">
    <Navbar />

    <div style="padding-top: 100px; font-family: Futura PT, sans-serif">
      <!-- Top Bar -->
      <div
        class="flex items-center justify-between"
        style="padding: 1.5rem 2rem"
        
      >
        <p
          class="text-sm font-medium flex items-center gap-1"
          :style="{ color: 'var(--text-primary)' }"
        >
          Favorites
          <sup class="text-xs" :style="{ color: 'var(--text-secondary)' }">{{
            items.length
          }}</sup>
        </p>
        <button
          type="button"
          @click="router.back()"
          class="transition-opacity hover:opacity-60"
          :style="{ color: 'var(--text-primary)' }"
        >
          <X :size="18" />
        </button>
      </div>

      <!-- Empty state -->
      <div
        v-if="items.length === 0"
        class="text-center"
        style="padding: 4rem 1.5rem"
      >
        <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">
          You haven't saved any favorites yet.
        </p>
        <router-link
          to="/"
          class="inline-block mt-4! text-xs font-medium tracking-widest uppercase relative group"
          :style="{ color: 'var(--text-primary)' }"
        >
          <span class="relative">
            Continue shopping
            <span
              class="absolute bottom-0 left-0 h-px w-full"
              :style="{ backgroundColor: 'var(--text-primary)' }"
            ></span>
          </span>
        </router-link>
      </div>

      <!-- List -->
      <div v-else class="mx-auto!" style="max-width: 1100px">
        <div
          v-for="item in items"
          :key="item.id"
          class="flex gap-6! pb-30!"
          style="padding: 1.5rem 2rem"
         
        >
          <!-- Image -->
          <div
            class="shrink-0 cursor-pointer"
            style="
              width: 170px;
              height: 200px;
              background-color: var(--bg-secondary);
            "
            @click="router.push(`/product/${item.id}`)"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Details -->
          <div class="flex-1 flex flex-col">
            <div class="flex items-start justify-between gap-4!">
              <p
                class="text-md font-base cursor-pointer"
                :style="{ color: 'var(--text-primary)' }"
                @click="router.push(`/product/${item.id}`)"
              >
                {{ item.name }}
              </p>
              <p
                class="text-sm shrink-0"
                :style="{ color: 'var(--text-secondary)' }"
              >
                {{ item.price.toLocaleString() }} USD
              </p>
            </div>

            <p
              v-if="item.color"
              class="text-xs mt-1!"
              style="color: #8b6343"
            >
              {{ item.color }}
            </p>
            <p
              v-if="item.size"
              class="text-xs mt-0.5!"
              :style="{ color: 'var(--text-secondary)' }"
            >
              {{ item.size }}
            </p>

            <!-- Actions -->
            <div class="flex items-center gap-4 mt-auto! justify-end">
              <button
                type="button"
                @click="handleAddToCart(item)"
                class="text-xs transition-opacity hover:opacity-60 relative group"
                :style="{ color: 'var(--text-primary)' }"
              >
                <span class="relative">
                  Add to cart
                  <span
                    class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    :style="{ backgroundColor: 'var(--text-primary)' }"
                  ></span>
                </span>
              </button>
              <button
                type="button"
                @click="handleRemove(item)"
                class="text-xs transition-opacity hover:opacity-60 relative group"
                :style="{ color: 'var(--text-primary)' }"
              >
                <span class="relative">
                  Remove
                  <span
                    class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    :style="{ backgroundColor: 'var(--text-primary)' }"
                  ></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { X } from "lucide-vue-next";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { useFavorites, type FavoriteItem } from "../composables/stores/favorites";
import { useCart } from "../composables/stores/cart";
import { useToast } from "../composables/stores/useToast";

const router = useRouter();
const { items, removeFavorite } = useFavorites();
const { addItem } = useCart();
const { showToast } = useToast();

const handleRemove = (item: FavoriteItem) => {
  removeFavorite(item.id);
  showToast(`${item.name} removed from favorites`);
};

const handleAddToCart = (item: FavoriteItem) => {
  // FavoriteItem.id can be string (fallback for completeLook items without
  // a real id) or number. CartItem expects a number id — skip items that
  // don't have one rather than silently miscasting.
  if (typeof item.id !== "number") {
    showToast("This item can't be added to cart yet");
    return;
  }

  addItem({
    id: item.id,
    name: item.name,
    price: item.price,
    color: item.color ?? "",
    size: item.size,
    image: item.image,
  });

  showToast(`${item.name} added to cart`);
};
</script>