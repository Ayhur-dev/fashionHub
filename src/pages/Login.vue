<template>
  <div
    style="
      background-color: var(--bg);
      min-height: 100vh;
      font-family:
        Futura PT,
        sans-serif;
    "
  >
    <Navbar />

    <div style="padding-top: 100px">
      <!-- Top Bar -->
      <div
        class="flex items-center"
        style="padding: 1rem 2rem; border-bottom: 1px solid var(--border)"
      >
        <p class="text-md" :style="{ color: 'var(--text-primary)' }">Account</p>
        <p class="text-md mx-auto!" style="color: #8b6343">Hello!</p>
      </div>

      <!-- Form Container -->
      <div class="mx-auto!" style="max-width: 700px; padding: 3rem 2rem">
        <!-- Instruction -->
        <p class="text-sm mb-6!" style="color: #8b6343">
          Please enter your email
        </p>

        <!-- Email Input -->
        <div class="mb-6!">
          <label
            class="text-xs mb-1! block"
            :style="{ color: 'var(--text-secondary)' }"
          >
            Email *
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full text-base bg-transparent outline-none pb-2!"
            style="
              border-bottom: 2px solid var(--border-secondary);
              color: var(--text-primary);
            "
            placeholder=""
          />
          <p v-if="error" class="text-xs mt-2! text-red-500">{{ error }}</p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-2 mb-8!">
          <!-- Login -->
          <button
            @click="handleLogin"
            class="flex-1 py-4! text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-80"
            :style="{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--bg)',
            }"
          >
            Login
          </button>
          <!-- Create Account -->
          <button
            @click="router.push('/register')"
            class="flex-1 py-4! text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-80"
            :style="{
              backgroundColor: 'var(--bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--text-primary)',
            }"
          >
            Create an account
          </button>
        </div>

        <!-- Or connect with -->
        <p class="text-sm mb-4!" style="color: #8b6343">Or connect with</p>

        <!-- Social Buttons Desktop -->
        <div class="hidden md:flex gap-3!">
          <!-- Facebook -->
          <button
            class="flex-1 flex items-center justify-center gap-2! py-3.5! text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-70"
            :style="{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Facebook
          </button>

          <!-- Google -->
          <button
            class="flex-1 flex items-center justify-center gap-2! py-3.5! text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-70"
            :style="{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <!-- Apple -->
          <button
            class="flex-1 flex items-center justify-center gap-2! py-3.5! text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-70"
            :style="{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 814 1000"
              :fill="isDark ? '#ffffff' : '#000000'"
            >
              <path
                d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.7-317.9 269-317.9 71 0 130.5 46.4 174.9 46.4 42.8 0 109.7-49 190.8-49 30.5.1 108.2 5.5 164.4 72.6zm-234.5-172.8c31.5-36.3 54.3-86.6 54.3-136.9 0-7.1-.6-14.3-1.9-20.1-51.6 1.9-112.7 35.2-149.4 77.2-28.5 32.4-55.1 83.3-55.1 134.2 0 7.7 1.3 15.5 1.9 18 3.2.6 8.4 1.3 13.6 1.3 46.4.1 101.5-31.2 136.6-73.7z"
              />
            </svg>
            Apple
          </button>
        </div>

        <!-- Social Buttons Mobile -->
        <div class="flex md:hidden flex-col gap-3!">
          <button
            class="w-full flex items-center justify-center gap-2! py-3.5! text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-70"
            :style="{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
            Facebook
          </button>

          <button
            class="w-full flex items-center justify-center gap-2! py-3.5! text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-70"
            :style="{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <button
            class="w-full flex items-center justify-center gap-2! py-3.5! text-xs font-medium tracking-widest uppercase transition-opacity hover:opacity-70"
            :style="{
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 814 1000"
              :fill="isDark ? '#ffffff' : '#000000'"
            >
              <path
                d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.7-317.9 269-317.9 71 0 130.5 46.4 174.9 46.4 42.8 0 109.7-49 190.8-49 30.5.1 108.2 5.5 164.4 72.6zm-234.5-172.8c31.5-36.3 54.3-86.6 54.3-136.9 0-7.1-.6-14.3-1.9-20.1-51.6 1.9-112.7 35.2-149.4 77.2-28.5 32.4-55.1 83.3-55.1 134.2 0 7.7 1.3 15.5 1.9 18 3.2.6 8.4 1.3 13.6 1.3 46.4.1 101.5-31.2 136.6-73.7z"
              />
            </svg>
            Apple
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { useTheme } from "../composables/useTheme";
import { useAuth } from "../composables/stores/useAuth";

const { isDark } = useTheme();
const router = useRouter();
const route = useRoute();
const { login } = useAuth();
const email = ref("");
const error = ref("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleLogin = async () => {
  if (!email.value.trim()) {
    error.value = "Please enter your email";
    return;
  }

  if (!emailRegex.test(email.value)) {
    error.value = "Please enter a valid email address";
    return;
  }

  error.value = "";

  // TEMP MOCK — no backend yet, so this just flips the shared isLoggedIn
  // flag rather than checking credentials. Once the auth API is ready,
  // replace this block with a real request and only call login() on success.
  console.log("Login with:", email.value);
  login();

  const redirectTo =
    typeof route.query.redirect === "string" ? route.query.redirect : "/favorites";
  router.push(redirectTo);
};
</script>