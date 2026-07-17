<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-60 transition-all duration-500"
      :style="
        isOpen
          ? 'opacity: 1; pointer-events: auto; background-color: rgba(0,0,0,0.3)'
          : 'opacity: 0; pointer-events: none'
      "
      @click="closeCart"
    ></div>

    <!-- Drawer -->
    <div
      class="fixed top-0 right-0 bottom-0 z-70 flex flex-col"
      :style="{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: 'var(--bg)',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        fontFamily: 'Futura PT, sans-serif',
      }"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between shrink-0"
        style="padding: 1.5rem"
        :style="{ borderBottom: '1px solid var(--border)' }"
      >
        <p
          class="text-sm font-medium"
          :style="{ color: 'var(--text-primary)' }"
        >
          Shopping cart <span>{{ itemCount }}</span>
        </p>
        <button
          type="button"
          @click="closeCart"
          class="transition-opacity hover:opacity-60"
          :style="{ color: 'var(--text-primary)' }"
        >
          <X :size="18" />
        </button>
      </div>

      <!-- Scrollable Items -->
      <div class="flex-1 overflow-y-auto" style="scrollbar-width: none">
        <div
          v-for="item in items"
          :key="item.id"
          style="padding: 1.5rem"
          :style="{ borderBottom: '1px solid var(--border)' }"
        >
          <div class="flex gap-4!">
            <!-- Image -->
            <div
              class="shrink-0"
              style="
                width: 90px;
                height: 110px;
                background-color: var(--bg-secondary);
              "
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Details -->
            <div class="flex-1 flex flex-col gap-1!">
              <div class="flex items-start justify-between gap-2!">
                <p
                  class="text-sm font-medium"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  {{ item.name }}
                </p>
                <p
                  class="text-sm shrink-0"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  {{ item.price.toLocaleString() }} USD
                </p>
              </div>

              <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">
                {{ item.color }}
              </p>
              <p
                v-if="item.size"
                class="text-xs"
                :style="{ color: 'var(--text-secondary)' }"
              >
                {{ item.size }}
              </p>

              <!-- Qty -->
              <div class="flex items-center gap-3 mt-1!">
                <button
                  type="button"
                  @click="decreaseQty(item.id)"
                  class="text-sm transition-opacity hover:opacity-60"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  −
                </button>

                <span class="text-xs" :style="{ color: 'var(--text-primary)' }"
                  >Qty {{ item.quantity }}</span
                >
                <button
                  type="button"
                  @click="increaseQty(item.id)"
                  class="text-sm transition-opacity hover:opacity-60"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  +
                </button>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-4 mt-2!">
                <button
                  type="button"
                  class="text-xs transition-opacity hover:opacity-60 relative group"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  <span class="relative">
                    Edit
                    <span
                      class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      :style="{ backgroundColor: 'var(--text-primary)' }"
                    ></span>
                  </span>
                </button>
                <button
                  type="button"
                  class="text-xs transition-opacity hover:opacity-60 relative group ml-auto!"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  <span class="relative">
                    Add to Favorites
                    <span
                      class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      :style="{ backgroundColor: 'var(--text-primary)' }"
                    ></span>
                  </span>
                </button>
                <button
                  type="button"
                  @click="removeItem(item.id)"
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

          <!-- Delivery date -->
          <p class="text-xs mt-4!" style="color: #8b6343">
            Estimated delivery date: from {{ estimatedDelivery }}
          </p>
        </div>
      </div>

      <!-- Fixed Bottom -->
      <div
        class="shrink-0"
        style="padding: 1.5rem"
        :style="{
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--bg)',
        }"
      >
        <!-- Total -->
        <div class="flex items-end justify-between mb-4!">
          <div>
            <p
              class="text-xs font-medium tracking-widest uppercase"
              :style="{ color: 'var(--text-primary)' }"
            >
              Total
            </p>
            <p
              class="text-xs mt-0.5!"
              :style="{ color: 'var(--text-secondary)' }"
            >
              VAT Included
            </p>
          </div>
          <p
            class="text-xl font-medium"
            :style="{ color: 'var(--text-primary)' }"
          >
            {{ total.toLocaleString() }} USD
          </p>
        </div>

        <!-- Proceed to Checkout -->
        <button
          type="button"
          class="w-full py-4! text-xs font-medium tracking-widest uppercase mb-3! transition-opacity hover:opacity-80"
          :style="{
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg)',
          }"
        >
          Proceed to checkout
        </button>

        <!-- Apple Pay -->
        <button
          type="button"
          class="w-full py-4! flex items-center justify-center gap-2 mb-3! transition-opacity hover:opacity-80"
          :style="{
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 814 1000"
            :fill="isDark ? '#ffffff' : '#000000'"
          >
            <path
              d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.7-317.9 269-317.9 71 0 130.5 46.4 174.9 46.4 42.8 0 109.7-49 190.8-49 30.5.1 108.2 5.5 164.4 72.6zm-234.5-172.8c31.5-36.3 54.3-86.6 54.3-136.9 0-7.1-.6-14.3-1.9-20.1-51.6 1.9-112.7 35.2-149.4 77.2-28.5 32.4-55.1 83.3-55.1 134.2 0 7.7 1.3 15.5 1.9 18 3.2.6 8.4 1.3 13.6 1.3 46.4.1 101.5-31.2 136.6-73.7z"
            />
          </svg>
          <span class="text-sm font-medium">Pay</span>
        </button>

        <!-- Terms -->
        <p
          class="text-[10px] leading-relaxed mb-3!"
          :style="{ color: 'var(--text-secondary)' }"
        >
          By making this payment, you accept the
          <a
            href="#"
            style="
              text-decoration: underline;
              text-underline-offset: 3px;
              color: #8b6343;
            "
            >General Conditions of Sale</a
          >
          and confirm that you have read and understand the
          <a
            href="#"
            style="
              text-decoration: underline;
              text-underline-offset: 3px;
              color: #8b6343;
            "
            >Privacy Policy</a
          >.
        </p>

        <!-- View My Shopping Cart -->
        <button
          type="button"
          @click="
            closeCart();
            router.push('/cart');
          "
          class="w-full py-4! text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-80"
          :style="{
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            backgroundColor: 'var(--bg)',
          }"
        >
          View my shopping cart
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
import { useCart } from "../stores/cart";
import { useTheme } from "../composables/useTheme";
import { useRouter } from "vue-router";

const router = useRouter();

const {
  items,
  isOpen,
  total,
  itemCount,
  closeCart,
  increaseQty,
  decreaseQty,
  removeItem,
} = useCart();
const { isDark } = useTheme();



const estimatedDelivery = (() => {
  const date = new Date();

  // Add 5 days (change this to whatever you want)
  date.setDate(date.getDate() + 5);

  return date.toLocaleDateString("en-GB");
})();
</script>
