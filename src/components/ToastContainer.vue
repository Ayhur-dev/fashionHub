<template>
  <Teleport to="body">
    <div
      class="fixed left-1/2 z-100 flex flex-col items-center gap-2"
      style="bottom: 24px; transform: translateX(-50%)"
    >
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="text-xs font-medium tracking-wide px-5! py-3!"
          :style="{
            backgroundColor: 'var(--bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            whiteSpace: 'nowrap',
          }"
        >
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from "../composables/stores/useToast";

const { toasts } = useToast();
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>