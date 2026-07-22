<template>
  <footer
    style="
      background-color: var(--bg);
      border-top: 1px solid var(--border-secondary);
    "
  >
    <!-- Section 1: Info Strip -->
    <div style="border-bottom: 1px solid var(--border-secondary)">
      <!-- Mobile: Auto Carousel -->
      <div
        class="md:hidden relative overflow-hidden"
        style="padding: 4rem 1.5rem"
      >
        <div
          class="flex transition-transform duration-700 ease-in-out"
          :style="`transform: translateX(-${activeSlide * 100}%)`"
        >
          <div
            v-for="item in infoItems"
            :key="item.title"
            class="w-full shrink-0 text-center"
          >
            <p
              class="text-lg font-medium mb-4!"
              style="color: var(--text-primary)"
            >
              {{ item.title }}
            </p>
            <p
              class="text-sm leading-relaxed"
              style="color: var(--text-secondary)"
              v-html="item.description"
            ></p>
          </div>
        </div>

        <!-- Dots -->
      </div>

      <!-- Desktop: Static 3 columns -->
      <div class="hidden md:grid md:grid-cols-3 gap-0">
        <div class="text-center" style="padding: 5rem 2rem">
          <p
            class="text-lg font-medium mb-6"
            style="color: var(--text-primary)"
          >
            Book an appointment in store
          </p>
          <p
            class="text-md leading-relaxed"
            style="color: var(--text-secondary)"
          >
            Lagos, Toronto, Paris, London, New York, Los Angeles ...
          </p>
        </div>
        <div class="text-center" style="padding: 5rem 2rem">
          <p
            class="text-lg font-medium mb-6"
            style="color: var(--text-primary)"
          >
            Free shipping and returns
          </p>
          <p
            class="text-md leading-relaxed"
            style="color: var(--text-secondary)"
          >
            Free delivery and <br />
            easy returns within 14 days.
          </p>
        </div>
        <div class="text-center" style="padding: 5rem 2rem">
          <p
            class="text-lg font-medium mb-6"
            style="color: var(--text-primary)"
          >
            Secure payment
          </p>
          <p
            class="text-md leading-relaxed"
            style="color: var(--text-secondary)"
          >
            Visa, Mastercard, Paypal, Apple pay, <br />
            American express, Klarna
          </p>
        </div>
      </div>
    </div>

    <!-- Section 2: Newsletter + Contact -->
    <div
      class="grid grid-cols-1 md:grid-cols-2"
      style="border-bottom: 1px solid var(--border-secondary)"
    >
      <!-- Newsletter -->
      <div
        class="flex flex-col gap-5"
        style="
          padding: 2.5rem 1.5rem;
          border-right: 1px solid var(--border-secondary);
        "
      >
        <div
          class="flex items-center gap-3 cursor-pointer"
          @click="newsletterOpen = !newsletterOpen"
        >
          <p class="text-lg font-book" style="color: var(--text-primary)">
            Subscribe to the newsletter
          </p>
          <ChevronDown
            :size="16"
            style="color: var(--text-secondary)"
            class="transition-transform duration-300 shrink-0"
            :style="
              newsletterOpen
                ? 'transform: rotate(180deg)'
                : 'transform: rotate(0deg)'
            "
          />
        </div>

        <p class="text-md leading-relaxed" style="color: var(--text-secondary)">
          Subscribe to receive all the information by email on our latest <br />
          collections, our products, our fashion shows and our projects.
        </p>

        <div
          class="flex flex-col gap-5 overflow-hidden transition-all duration-500"
          :style="
            newsletterOpen
              ? 'max-height: 600px; opacity: 1'
              : 'max-height: 0px; opacity: 0'
          "
        >
          <!-- Email -->
          <div class="flex flex-col gap-1">
            <label class="text-xs" style="color: var(--text-secondary)">
              Email <span style="color: var(--text-primary)">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              class="w-full text-sm bg-transparent outline-none pb-2"
              style="
                border-bottom: 1px solid var(--border);
                color: var(--text-primary);
              "
            />
            <p
              v-if="showErrors && !form.email"
              class="text-[11px] text-red-500"
            >
              This field is required.
            </p>
          </div>

          <!-- Gender -->
          <div class="flex flex-col gap-3">
            <label class="text-xs" style="color: var(--text-secondary)">
              Gender <span style="color: var(--text-primary)">*</span>
            </label>
            <div class="flex items-center gap-4 flex-wrap">
              <label
                v-for="option in genderOptions"
                :key="option"
                class="flex items-center gap-2 cursor-pointer text-xs"
                style="color: var(--text-primary)"
              >
                <div
                  class="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200"
                  style="border-color: var(--text-secondary)"
                  :style="
                    form.gender === option
                      ? 'border-color: var(--text-primary)'
                      : ''
                  "
                  @click="form.gender = option"
                >
                  <div
                    v-if="form.gender === option"
                    class="w-2.5 h-2.5 rounded-full"
                    style="background-color: var(--text-primary)"
                  ></div>
                </div>
                {{ option }}
              </label>
            </div>
          </div>

          <!-- Last Name -->
          <div class="flex flex-col gap-1">
            <label class="text-xs" style="color: var(--text-secondary)">
              Last Name <span style="color: var(--text-primary)">*</span>
            </label>
            <input
              v-model="form.lastName"
              type="text"
              class="w-full text-sm bg-transparent outline-none pb-2"
              style="
                border-bottom: 1px solid var(--border);
                color: var(--text-primary);
              "
            />
          </div>

          <!-- First Name -->
          <div class="flex flex-col gap-1">
            <label class="text-xs" style="color: var(--text-secondary)">
              First Name <span style="color: var(--text-primary)">*</span>
            </label>
            <input
              v-model="form.firstName"
              type="text"
              class="w-full text-sm bg-transparent outline-none pb-2"
              style="
                border-bottom: 1px solid var(--border);
                color: var(--text-primary);
              "
            />
          </div>
        </div>

        <button
          @click="newsletterOpen ? handleSubmit() : (newsletterOpen = true)"
          class="w-full py-4! text-xs font-medium tracking-widest uppercase duration-300"
          :style="
            newsletterOpen
              ? 'background-color: var(--bg); color: var(--text-primary); border: 1px solid var(--text-primary);'
              : 'background-color: var(--button-bg); color: var(--bg); border: 1px solid var(--text-primary);'
          "
        >
          Register - Test
        </button>
      </div>

      <!-- Contact -->
      <div class="flex flex-col gap-5" style="padding: 2.5rem 1.5rem">
        <p class="text-base font-medium" style="color: var(--text-primary)">
          Need help? Contact us
        </p>
        <p class="text-md leading-relaxed" style="color: var(--text-secondary)">
          Monday to Friday from 10:00 am to 9:00pm CET. <br />
          Saturdays from 10:00am to 6:00 CET.
        </p>
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mt-2"
        >
          <RouterLink
            to="/contact"
            class="text-xs transition-opacity duration-200 hover:opacity-60"
            style="
              color: var(--text-primary);
              text-decoration: underline;
              text-underline-offset: 3px;
            "
          >
            Contact form
          </RouterLink>

          <RouterLink
            to="/track-order"
            class="text-xs transition-opacity duration-200 hover:opacity-60"
            style="
              color: var(--text-primary);
              text-decoration: underline;
              text-underline-offset: 3px;
            "
          >
            Track an order
          </RouterLink>

          <RouterLink
            to="/register-return"
            class="text-xs transition-opacity duration-200 hover:opacity-60"
            style="
              color: var(--text-primary);
              text-decoration: underline;
              text-underline-offset: 3px;
            "
          >
            Register a return
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Section 3: Legal / FAQ / Company / Follow -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0"
      style="border-bottom: 1px solid var(--border-secondary)"
    >
      <!-- Legal -->
      <div
        class="flex flex-col footer-section-pad"
        style="padding: 2rem 1.5rem"
      >
        <div
          class="flex items-center mb-3! gap-2 cursor-pointer"
          @click="legalOpen = !legalOpen"
        >
          <p class="text-sm" style="color: var(--text-primary)">Legal</p>
          <ChevronDown
            :size="14"
            style="color: var(--text-secondary)"
            class="transition-transform duration-300"
            :style="
              legalOpen
                ? 'transform: rotate(180deg)'
                : 'transform: rotate(0deg)'
            "
          />
        </div>
        <div
          class="flex flex-col mb-5! gap-3 overflow-hidden transition-all duration-500"
          :style="
            legalOpen
              ? 'max-height: 300px; opacity: 1'
              : 'max-height: 0px; opacity: 0'
          "
        >
          <a
            v-for="link in legalLinks"
            :key="link"
            href="#"
            class="text-xs leading-loose hover:opacity-60 transition-opacity duration-200"
            style="color: var(--text-secondary)"
            >{{ link }}</a
          >
        </div>
      </div>

      <!-- FAQ -->
      <div
        class="flex flex-col footer-section-pad"
        style="padding: 2rem 1.5rem"
      >
        <div
          class="flex items-center mb-5! gap-2 cursor-pointer"
          @click="faqOpen = !faqOpen"
        >
          <p class="text-sm" style="color: var(--text-primary)">FAQ</p>
          <ChevronDown
            :size="14"
            style="color: var(--text-secondary)"
            class="transition-transform duration-300"
            :style="
              faqOpen ? 'transform: rotate(180deg)' : 'transform: rotate(0deg)'
            "
          />
        </div>
        <div
          class="flex flex-col gap-3 overflow-hidden transition-all duration-500"
          :style="
            faqOpen
              ? 'max-height: 300px; opacity: 1'
              : 'max-height: 0px; opacity: 0'
          "
        >
          <a
            v-for="link in faqLinks"
            :key="link"
            href="#"
            class="text-xs leading-loose hover:opacity-60 transition-opacity duration-200"
            style="color: var(--text-secondary)"
            >{{ link }}</a
          >
        </div>
      </div>

      <!-- Company -->
      <div
        class="flex flex-col footer-section-pad"
        style="padding: 2rem 1.5rem"
      >
        <div
          class="flex items-center mb-5! gap-2 cursor-pointer"
          @click="companyOpen = !companyOpen"
        >
          <p class="text-sm" style="color: var(--text-primary)">Company</p>
          <ChevronDown
            :size="14"
            style="color: var(--text-secondary)"
            class="transition-transform duration-300"
            :style="
              companyOpen
                ? 'transform: rotate(180deg)'
                : 'transform: rotate(0deg)'
            "
          />
        </div>
        <div
          class="flex flex-col gap-3 overflow-hidden transition-all duration-500"
          :style="
            companyOpen
              ? 'max-height: 300px; opacity: 1'
              : 'max-height: 0px; opacity: 0'
          "
        >
          <template v-for="link in companyLinks" :key="link.label">
            <RouterLink
              v-if="link.to"
              :to="link.to"
              class="text-xs leading-loose hover:opacity-60 transition-opacity duration-200"
              style="color: var(--text-secondary)"
            >
              {{ link.label }}
            </RouterLink>
            <a
              v-else
              href="#"
              class="text-xs leading-loose hover:opacity-60 transition-opacity duration-200"
              style="color: var(--text-secondary)"
            >
              {{ link.label }}
            </a>
          </template>
        </div>
      </div>

      <!-- Follow -->
      <div class="flex flex-col gap-4" style="padding: 2rem 1.5rem">
        <p class="text-sm" style="color: var(--text-primary)">Follow</p>
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            class="text-xs transition-opacity duration-200 hover:opacity-60"
            style="
              color: var(--text-primary);
              text-decoration: underline;
              text-underline-offset: 3px;
            "
          >
            {{ social.label }}
          </a>
        </div>
      </div>
    </div>

    <!-- Section 4: Bottom Bar -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0"
      style="padding: 2rem 1.5rem"
    >
      <!-- Left: Copyright -->
      <p
        class="text-xs text-center md:text-left order-3 md:order-1"
        style="color: var(--text-secondary)"
      >
        © Nyx Collective 2026
      </p>

      <!-- Center: Logo -->
      <div class="flex items-center justify-center order-1 md:order-2">
        <p
          class="font-black text-xl tracking-[0.2em] uppercase"
          :style="{
            color: 'var(--text-primary)',
            fontFamily: 'Inter, sans-serif',
          }"
        >
          Nyx Collective
        </p>
      </div>

      <!-- Right: Country + Language -->
      <div
        class="flex flex-col items-center md:items-end gap-1 order-2 md:order-3"
      >
        <a
          href="#"
          class="text-xs transition-opacity duration-200 hover:opacity-60"
          style="
            color: var(--text-primary);
            text-decoration: underline;
            text-underline-offset: 3px;
          "
        >
          Country : Nigeria (NAIRA)
        </a>
        <div class="flex items-center gap-1">
          <a
            href="#"
            class="text-xs transition-opacity duration-200 hover:opacity-60"
            style="
              color: var(--text-primary);
              text-decoration: underline;
              text-underline-offset: 3px;
            "
          >
            Language : english
          </a>
          <ChevronDown :size="12" style="color: var(--text-primary)" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import { ChevronDown } from "lucide-vue-next";

const legalOpen = ref(false);
const faqOpen = ref(false);
const companyOpen = ref(false);

const legalLinks = [
  "Legal notice",
  "Terms of sale",
  "Privacy policy",
  "Terms of Use",
  "Manage cookies",
  "Accessibility",
];

const faqLinks = [
  "Account",
  "Shipping informations",
  "Orders",
  "Payments",
  "Returns & exchanges",
  "Size guide",
  "Gift Card",
];

// Only "Contact us" gets a real route for now; the rest stay as plain
// placeholder links (`to: undefined`) until those pages exist.
const companyLinks: { label: string; to?: string }[] = [
  { label: "Contact us", to: "/contact" },
  { label: "Stores" },
  { label: "Book an appointment in store" },
  { label: "Career" },
];

const newsletterOpen = ref(false);
const showErrors = ref(false);

const form = ref({
  email: "",
  gender: "",
  lastName: "",
  firstName: "",
});

const genderOptions = ["Mrs", "Mr", "Mx", "I prefer not to say"];

const handleSubmit = () => {
  if (!form.value.email) {
    showErrors.value = true;
    return;
  }
  showErrors.value = false;
  console.log("Form submitted:", form.value);
};

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Tiktok", href: "#" },
  { label: "X", href: "#" },
  { label: "Pinterest", href: "#" },
];

const activeSlide = ref(0);

const infoItems = [
  {
    title: "Book an appointment in store",
    description: "Lagos, Toronto, Paris, London, New York, Los Angeles ...",
  },
  {
    title: "Free shipping and returns",
    description: "Free delivery and<br/>easy returns within 14 days.",
  },
  {
    title: "Secure payment",
    description:
      "Visa, Mastercard, Paypal, Apple pay,<br/>American express, Klarna",
  },
];

// Auto advance carousel
let carouselTimer: ReturnType<typeof setInterval>;

onMounted(() => {
  carouselTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % infoItems.length;
  }, 3000);
});

onUnmounted(() => {
  clearInterval(carouselTimer);
});
</script>
