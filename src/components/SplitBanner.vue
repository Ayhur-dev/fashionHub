<template>
  <section class="w-full">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <!-- Image 1 -->
      <div
        ref="el => imgRefs[0] = el"
        class="relative overflow-hidden cursor-pointer group h-[60vh] md:h-[120vh]"
      >
        <img
          :src="images[0].src"
          :alt="images[0].label"
          class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"
        ></div>
        <div class="absolute bottom-6 left-6">
          <p class="text-white text-xs tracking-widest uppercase font-medium">
            {{ images[0].label }}
          </p>
        </div>
      </div>

      <!-- Image 2 -->
      <div
        class="relative overflow-hidden cursor-pointer group h-[60vh] md:h-[120vh]"
      >
        <img
          :src="images[1].src"
          :alt="images[1].label"
          class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"
        ></div>
        <div class="absolute bottom-6 left-6">
          <p class="text-white text-xs tracking-widest uppercase font-medium">
            {{ images[1].label }}
          </p>
        </div>
      </div>

      <!-- Image 3 -->
      <div
        class="relative overflow-hidden cursor-pointer group h-[60vh] md:h-[120vh]"
      >
        <img
          :src="images[2].src"
          :alt="images[2].label"
          class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"
        ></div>
        <div class="absolute bottom-6 left-6">
          <p class="text-white text-xs tracking-widest uppercase font-medium">
            {{ images[2].label }}
          </p>
        </div>
      </div>

      <!-- Image 4 -->
      <div
        class="relative overflow-hidden cursor-pointer group h-[60vh] md:h-[120vh]"
      >
        <img
          :src="images[3].src"
          :alt="images[3].label"
          class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"
        ></div>
        <div class="absolute bottom-6 left-6">
          <p class="text-white text-xs tracking-widest uppercase font-medium">
            {{ images[3].label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { animate, inView } from "motion";

const props = defineProps<{
  images: {
    src: string;
    label: string;
  }[];
}>();

onMounted(() => {
  const cards = document.querySelectorAll(".banner-card");
  cards.forEach((card, i) => {
    inView(
      card as HTMLElement,
      () => {
        animate(
          card as Element,
          { opacity: [0, 1], y: [30, 0] } as any,
          { duration: 0.7, easing: [0.22, 1, 0.36, 1], delay: i * 0.1 } as any,
        );
      },
      { margin: "-60px" } as any,
    );
  });
});
</script>
