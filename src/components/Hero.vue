<template>
 <section class="w-full flex h-[100vh] md:h-[120vh]">
    <!-- Left Image -->
    <div
      ref="leftRef"
      class="relative w-full md:w-1/2 h-full overflow-hidden cursor-pointer group"
    >
      <img
        src="/hero-left.avif"
        alt="New In Women"
        class="object-cover w-full h-full object-[50%_0]"
      />
      <div
        class="absolute bottom-8 left-6"
        :style="`
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? 'translateY(0)' : 'translateY(16px)'};
          transition: opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s;
        `"
      >
        <p
          class="text-white text-xs tracking-widest uppercase font-medium drop-shadow-md"
        >
          New In Women
        </p>
      </div>
    </div>

    <!-- Right Image — hidden on mobile -->
    <div
      ref="rightRef"
      class="relative hidden md:block w-1/2 h-full overflow-hidden cursor-pointer group"
    >
      <img
        src="/hero-right.avif"
        alt="New In Bags"
        class="w-full h-full object-cover object-top"
      />
      <div
        class="absolute bottom-8 left-6"
        :style="`
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? 'translateY(0)' : 'translateY(16px)'};
          transition: opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s;
        `"
      >
        <p
          class="text-white text-xs tracking-widest uppercase font-medium drop-shadow-md"
        >
          New In Bags
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";


const mounted = ref(false);

onMounted(() => {
  mounted.value = true;

});
</script>
