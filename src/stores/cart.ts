import { ref, computed } from 'vue'

export interface CartItem {
  id: number
  name: string
  price: number
  color: string
  size?: string
  quantity: number
  image: string
}

const items = ref<CartItem[]>([
  {
    id: 1,
    name: 'The Valérie clutch',
    price: 1550,
    color: 'Black',
    quantity: 1,
    image: '/product-2a.png',
  },
  {
    id: 2,
    name: 'The low Cubisto slingbacks',
    price: 850,
    color: 'Black',
    size: 'Size 36',
    quantity: 1,
    image: '/product-4a.jpeg',
  },
])

const isOpen = ref(false)

const total = computed(() =>
  items.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
)

const itemCount = computed(() =>
  items.value.reduce((acc, item) => acc + item.quantity, 0)
)

const openCart = () => { isOpen.value = true }
const closeCart = () => { isOpen.value = false }

const increaseQty = (id: number) => {
  const item = items.value.find(i => i.id === id)
  if (item) item.quantity++
}

const decreaseQty = (id: number) => {
  const item = items.value.find(i => i.id === id)
  if (item && item.quantity > 1) item.quantity--
}

const removeItem = (id: number) => {
  items.value = items.value.filter(i => i.id !== id)
}

export const useCart = () => ({
  items,
  isOpen,
  total,
  itemCount,
  openCart,
  closeCart,
  increaseQty,
  decreaseQty,
  removeItem,
})