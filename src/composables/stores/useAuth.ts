import { ref } from "vue";

// TEMP MOCK — no backend yet. Flip this to true in the console
// (or call login()) to test logged-in behavior.
// Once auth is real, replace the ref's source with a token/session check
// (e.g. computed(() => !!localStorage.getItem('token'))) and keep the
// same exported shape so nothing calling useAuth() needs to change.
const isLoggedIn = ref(false);

const login = () => {
  isLoggedIn.value = true;
};

const logout = () => {
  isLoggedIn.value = false;
};

export const useAuth = () => ({
  isLoggedIn,
  login,
  logout,
});