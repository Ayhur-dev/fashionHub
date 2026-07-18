import { ref, computed } from "vue";

export interface FavoriteItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
}

const items = ref<FavoriteItem[]>([]);

const isFavorite = (id: number | string) =>
  items.value.some((i) => i.id === id);

const addFavorite = (item: FavoriteItem) => {
  if (!isFavorite(item.id)) {
    items.value.push(item);
  }
};

const removeFavorite = (id: number | string) => {
  items.value = items.value.filter((i) => i.id !== id);
};

const toggleFavorite = (item: FavoriteItem) => {
  if (isFavorite(item.id)) {
    removeFavorite(item.id);
    return false; // now removed
  } else {
    addFavorite(item);
    return true; // now added
  }
};

const itemCount = computed(() => items.value.length);

export const useFavorites = () => ({
  items,
  itemCount,
  isFavorite,
  addFavorite,
  removeFavorite,
  toggleFavorite,
});