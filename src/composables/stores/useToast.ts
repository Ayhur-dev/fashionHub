import { ref } from "vue";

export interface Toast {
  id: number;
  message: string;
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

const showToast = (message: string, duration = 2500) => {
  const id = nextId++;
  toasts.value.push({ id, message });

  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }, duration);
};

export const useToast = () => ({
  toasts,
  showToast,
});
