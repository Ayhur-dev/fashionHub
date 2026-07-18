<template>
  <div
    class="h-screen flex flex-col overflow-hidden"
    :style="{
      backgroundColor: 'var(--bg)',
      fontFamily: 'Futura PT, sans-serif',
    }"
  >
    <!-- Desktop logo bar -->
    <header class="hidden lg:block shrink-0">
      <div class="max-w-350! mx-auto! px-10! py-6!">
        <router-link
          to="/"
          class="text-xl font-semibold tracking-tight"
          :style="{ color: 'var(--text-primary)' }"
        >
          Nyx Collective
        </router-link>
      </div>
    </header>

    <!-- Desktop step tracker -->
    <nav
      class="hidden lg:block shrink-0"
      :style="{ borderBottom: '1px solid var(--border)' }"
    >
      <div class="max-w-350! mx-auto! grid grid-cols-4">
        <div
          v-for="(step, i) in steps"
          :key="step"
          class="px-10! py-4!"
          :style="{
            borderBottom:
              i === activeStep
                ? '2px solid var(--text-primary)'
                : '2px solid transparent',
          }"
        >
          <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">
            {{ i + 1 }} of {{ steps.length }}
          </p>
          <p
            class="text-sm mt-1!"
            :style="{
              color:
                i === activeStep
                  ? 'var(--text-primary)'
                  : 'var(--text-secondary)',
              fontWeight: i === activeStep ? 500 : 400,
            }"
          >
            {{ step }}
          </p>
        </div>
      </div>
    </nav>

    <!-- Mobile header -->
    <div
      class="lg:hidden shrink-0 flex items-center justify-between"
      style="padding: 1.5rem"
      :style="{ borderBottom: '1px solid var(--border)' }"
    >
      <p class="text-sm font-book" :style="{ color: 'var(--text-primary)' }">
        Shopping cart <span>{{ itemCount }}</span>
      </p>
    </div>

    <!-- Body: fixed height, no page-level scroll. Products scroll internally,
         summary panel stays pinned in place on every breakpoint. -->
    <div
      class="flex-1 min-h-0 flex flex-col lg:flex-row lg:max-w-350 lg:mx-auto! lg:w-full lg:px-10! lg:gap-20"
    >
      <!-- Products column: the only scrollable region -->
      <div class="flex-1 min-h-0 overflow-y-auto" style="scrollbar-width: none">
        <p
          class="hidden lg:block text-md font-book mb-6! mt-10!"
          :style="{ color: 'var(--text-primary)' }"
        >
          Your products
        </p>

        <!-- Empty state -->
        <div
          v-if="items.length === 0"
          class="text-center"
          style="padding: 4rem 1.5rem"
        >
          <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">
            Your shopping cart is empty.
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

        <!-- Items -->
        <div
          v-for="item in items"
          :key="item.id"
          style="padding: 1.5rem 0"
          class="px-6! lg:px-0!"
          :style="{ borderBottom: '1px solid var(--border)' }"
        >
          <div class="flex gap-4!">
            <!-- Image -->
            <div
              class="shrink-0 w-32.5 h-45 lg:w-47.5 lg:h-65"
              style="background-color: var(--bg-secondary)"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Details -->
            <div class="flex-1 flex flex-col gap-2 pl-4! pt-12!">
              <div class="flex items-start justify-between gap-2!">
                <p
                  class="text-sm font-book"
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

        <!-- Continue shopping (desktop, below list) -->
        <router-link
          v-if="items.length"
          to="/"
          class="hidden lg:inline-block mt-6! mb-10! text-xs font-medium tracking-widest uppercase relative group"
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

      <!-- Summary column: fixed in place, never scrolls -->
      <div
        v-if="items.length"
        class="shrink-0 lg:w-110 lg:my-10!"
        style="padding: 1.5rem"
        :style="{
          borderLeft: isDesktopBorder ? '1px solid var(--border)' : 'none',
        }"
      >
        <p
          class="hidden lg:block text-sm font-medium mb-6!"
          :style="{ color: 'var(--text-primary)' }"
        >
          Shopping cart
        </p>

        <!-- Items / shipping / promo rows (desktop only, mirrors reference) -->
        <div class="hidden lg:block">
          <div class="flex items-center justify-between mb-3!">
            <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">
              {{ itemCount }} item{{ itemCount === 1 ? "" : "s" }}
            </p>
            <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">
              {{ total.toLocaleString() }} USD
            </p>
          </div>

          <div class="flex items-center justify-between mb-3!">
            <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">
              Shipping
            </p>
            <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">
              Calculated at checkout
            </p>
          </div>

          <div class="flex items-center justify-between mb-5!">
            <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">
              Promotional code
            </p>
            <button
              type="button"
              @click="showPromo = !showPromo"
              class="text-xs relative group"
              :style="{ color: 'var(--text-primary)' }"
            >
              <span class="relative">
                Add your promotional code here
                <span
                  class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  :style="{ backgroundColor: 'var(--text-primary)' }"
                ></span>
              </span>
            </button>
          </div>

          <div v-if="showPromo" class="flex gap-2! mb-5!">
            <input
              v-model="promoCode"
              type="text"
              placeholder="Enter code"
              class="flex-1 text-xs px-3! py-2! outline-none"
              :style="{
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg)',
                color: 'var(--text-primary)',
              }"
            />
            <button
              type="button"
              class="text-xs font-medium tracking-widest uppercase px-4!"
              :style="{
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }"
            >
              Apply
            </button>
          </div>

          <div
            class="mb-5!"
            :style="{ borderTop: '1px solid var(--border)' }"
          ></div>
        </div>

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
          @click="router.push('/checkout')"
          class="w-full py-4! text-xs font-medium tracking-widest uppercase mb-3! transition-opacity hover:opacity-80"
          :style="{
            backgroundColor: 'var(--button-bg)',
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
          class="text-[10px] leading-relaxed"
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

        <!-- Continue shopping (mobile only, since desktop has it under the list) -->
        <router-link
          to="/"
          class="lg:hidden block mt-4! text-center text-xs font-medium tracking-widest uppercase relative group"
          :style="{ color: 'var(--text-primary)' }"
        >
          Continue shopping
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useCart } from "../composables/stores/cart";
import { useTheme } from "../composables/useTheme";
import { useRouter } from "vue-router";

const router = useRouter();

const { items, total, itemCount, increaseQty, decreaseQty, removeItem } =
  useCart();
const { isDark } = useTheme();

const steps = [
  "Cart",
  "Personal details",
  "Shipping details",
  "Payment & Confirmation",
];
const activeStep = 0;

const showPromo = ref(false);
const promoCode = ref("");

// Only draw the summary panel's left border once we're in the desktop
// two-column layout (matches the lg: breakpoint used everywhere else here).
const isDesktopBorder = ref(
  typeof window !== "undefined" ? window.innerWidth >= 1024 : false,
);
let mediaQuery: MediaQueryList | null = null;
const updateBorder = (e: MediaQueryListEvent | MediaQueryList) => {
  isDesktopBorder.value = e.matches;
};
onMounted(() => {
  if (typeof window !== "undefined") {
    mediaQuery = window.matchMedia("(min-width: 1024px)");
    updateBorder(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateBorder);
    } else {
      mediaQuery.addListener(updateBorder);
    }
  }
});
onUnmounted(() => {
  if (mediaQuery) {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", updateBorder);
    } else {
      mediaQuery.removeListener(updateBorder);
    }
  }
});

const estimatedDelivery = (() => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString("en-GB");
})();
</script>
