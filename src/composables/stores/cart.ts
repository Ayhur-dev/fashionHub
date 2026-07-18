import { ref, computed } from "vue";
import type { Router } from "vue-router";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  color: string;
  size?: string;
  quantity: number;
  image: string;
}

const items = ref<CartItem[]>([
  {
    id: 1,
    name: "The Valérie clutch",
    price: 1550,
    color: "Black",
    quantity: 1,
    image: "/product-2a.png",
  },
  {
    id: 2,
    name: "The low Cubisto slingbacks",
    price: 850,
    color: "Black",
    size: "Size 36",
    quantity: 1,
    image: "/product-4a.jpeg",
  },
]);

const isOpen = ref(false);

// Drawer is a desktop-only pattern. Below the `lg` breakpoint (1024px),
// the cart icon should navigate to the dedicated /cart page instead.
const MOBILE_BREAKPOINT = 1024;
const isMobile = ref(
  typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false,
);

let mediaQuery: MediaQueryList | null = null;
const updateIsMobile = (e: MediaQueryListEvent | MediaQueryList) => {
  isMobile.value = e.matches;
};

if (typeof window !== "undefined") {
  mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  updateIsMobile(mediaQuery);
  // Support both modern and older Safari listener APIs
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", updateIsMobile);
  } else {
   
    mediaQuery.addListener(updateIsMobile);
  }
}

const total = computed(() =>
  items.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
);

const itemCount = computed(() =>
  items.value.reduce((acc, item) => acc + item.quantity, 0),
);

// Raw drawer controls — still used internally on desktop.
const openCart = () => {
  isOpen.value = true;
};
const closeCart = () => {
  isOpen.value = false;
};

/**
 * Call this from any "view cart" trigger (nav icon, add-to-cart toast, etc).
 * On desktop it opens the slide-in drawer, same as before.
 * On mobile it skips the drawer entirely and routes straight to /cart.
 */
const triggerCart = (router: Router) => {
  if (isMobile.value) {
    router.push("/cart");
  } else {
    openCart();
  }
};

/**
 * Add an item to the cart. If an item with the same id (and same color/size,
 * since those make it functionally a different line item) already exists,
 * bump its quantity instead of creating a duplicate row.
 */
const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
  const existing = items.value.find(
    (i) => i.id === item.id && i.color === item.color && i.size === item.size,
  );

  if (existing) {
    existing.quantity += item.quantity ?? 1;
  } else {
    items.value.push({ ...item, quantity: item.quantity ?? 1 });
  }
};

const increaseQty = (id: number) => {
  const item = items.value.find((i) => i.id === id);
  if (item) item.quantity++;
};

const decreaseQty = (id: number) => {
  const item = items.value.find((i) => i.id === id);
  if (item && item.quantity > 1) item.quantity--;
};

const removeItem = (id: number) => {
  items.value = items.value.filter((i) => i.id !== id);
};

export const useCart = () => ({
  items,
  isOpen,
  isMobile,
  total,
  itemCount,
  openCart,
  closeCart,
  triggerCart,
  addItem,
  increaseQty,
  decreaseQty,
  removeItem,
});