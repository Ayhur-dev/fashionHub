<template>
  <Navbar />
  <div
    class="min-h-screen px-6! lg:px-10 pt-28! pb-24!"
    :style="{ backgroundColor: 'var(--bg)' }"
  >
    <!-- Header -->
    <div>
      <h1 class="text-lg font-normal" :style="{ color: 'var(--text-primary)' }">
        {{ title }}
      </h1>

      <div
        class="mt-8! h-px w-full"
        :style="{ backgroundColor: 'var(--border-secondary)' }"
      ></div>
    </div>

    <!-- Form -->
    <div class="mx-auto! mt-7! md:mt-24! max-w-180">
      <p
        class="mb-16! text-center text-sm tracking-wide"
        :style="{ color: 'var(--text-primary)' }"
      >
        Please enter your email address, order number and zip code.
      </p>

      <form class="flex flex-col gap-12" @submit.prevent="handleSubmit">
        <!-- Email -->
        <div>
          <label
            class="block text-sm"
            :style="{ color: 'var(--text-secondary)' }"
          >
            E-mail*
          </label>

          <input
            v-model="form.email"
            @blur="markTouched('email')"
            type="email"
            class="w-full text-base border-b bg-transparent pb-3! outline-none transition-all duration-300"
            :class="{
              'border-red-500': showError('email', emailRegex.test(form.email)),
            }"
            :style="{
              borderColor: showError('email', emailRegex.test(form.email))
                ? ''
                : 'var(--border-secondary)',
              color: 'var(--text-primary)',
            }"
          />

          <p
            v-if="showError('email', emailRegex.test(form.email))"
            class="mt-2 text-xs text-red-500"
          >
            Please enter a valid email address.
          </p>
        </div>

        <!-- Order Number -->
        <div>
          <label
            class="block text-sm"
            :style="{ color: 'var(--text-secondary)' }"
          >
            Order Number*
          </label>

          <input
            v-model="form.orderNumber"
            @blur="markTouched('orderNumber')"
            type="text"
            class="w-full border-b text-base bg-transparent pb-3! outline-none transition-all duration-300"
            :class="{
              'border-red-500': showError(
                'orderNumber',
                form.orderNumber.trim() !== '',
              ),
            }"
            :style="{
              borderColor: showError(
                'orderNumber',
                form.orderNumber.trim() !== '',
              )
                ? ''
                : 'var(--border-secondary)',
              color: 'var(--text-primary)',
            }"
          />

          <p
            v-if="showError('orderNumber', form.orderNumber.trim() !== '')"
            class="mt-2 text-xs text-red-500"
          >
            Please enter your order number.
          </p>
        </div>

        <!-- Zip -->
        <div>
          <label
            class="block text-sm"
            :style="{ color: 'var(--text-secondary)' }"
          >
            Delivery Zip Code*
          </label>

          <input
            v-model="form.zipCode"
            @blur="markTouched('zipCode')"
            type="text"
            class="w-full border-b text-base bg-transparent pb-3! outline-none transition-all duration-300"
            :class="{
              'border-red-500': showError(
                'zipCode',
                form.zipCode.trim() !== '',
              ),
            }"
            :style="{
              borderColor: showError('zipCode', form.zipCode.trim() !== '')
                ? ''
                : 'var(--border-secondary)',
              color: 'var(--text-primary)',
            }"
          />

          <p
            v-if="showError('zipCode', form.zipCode.trim() !== '')"
            class="mt-2 text-xs text-red-500"
          >
            Please enter your delivery zip code.
          </p>
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="mt-4! h-14! w-full tracking-[0.18em] uppercase text-sm font-medium transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
          :style="{
            backgroundColor: 'var(--button-bg)',
            color: 'var(--bg)',
          }"
        >
          {{ buttonText }}
        </button>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { useToast } from "../composables/stores/useToast";

const props = defineProps<{
  title: string;
  buttonText: string;
}>();

const { showToast } = useToast();

const form = reactive({
  email: "",
  orderNumber: "",
  zipCode: "",
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const touched = reactive({
  email: false,
  orderNumber: false,
  zipCode: false,
});

const submitAttempted = ref(false);

const markTouched = (field: keyof typeof touched) => {
  touched[field] = true;
};

const showError = (field: keyof typeof touched, isFieldValid: boolean) =>
  (touched[field] || submitAttempted.value) && !isFieldValid;

const isValid = computed(() => {
  return (
    emailRegex.test(form.email) &&
    form.orderNumber.trim() !== "" &&
    form.zipCode.trim() !== ""
  );
});

const handleSubmit = () => {
  submitAttempted.value = true;

  if (!isValid.value) return;

  console.log("Track order:", { ...form });

  showToast("Tracking order...");

  form.email = "";
  form.orderNumber = "";
  form.zipCode = "";

  submitAttempted.value = false;

  Object.keys(touched).forEach((key) => {
    touched[key as keyof typeof touched] = false;
  });
};
</script>
