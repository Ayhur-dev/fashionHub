<template>
  <Transition name="scroll-btn">
    <button
      v-if="showButton"
      @click="scrollPage"
      aria-label="Scroll"
      class="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
      :style="{
        backgroundColor: 'var(--bg)',
        color: 'var(--icon-color)',
        borderColor: 'var(--border)',
      }"
    >
      <ChevronUp
        v-if="isScrolled"
        :size="18"
        :stroke-width="2.5"
      />

      <ChevronDown
        v-else
        :size="18"
        :stroke-width="2.5"
      />
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ChevronDown, ChevronUp } from "lucide-vue-next";

const showButton = ref(false);
const isScrolled = ref(false);

const handleScroll = () => {
  const y = window.scrollY;
  const halfway =
    (document.documentElement.scrollHeight - window.innerHeight) / 2;

  showButton.value = y > 150;
  isScrolled.value = y > halfway;
};

const scrollPage = () => {
  window.scrollTo({
    top: isScrolled.value ? 0 : document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>