import { ref, computed } from "vue";

const API_URL = "http://localhost:5000/api/auth";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

const user = ref<User | null>(
  JSON.parse(localStorage.getItem("user") || "null")
);
const token = ref<string | null>(localStorage.getItem("token"));

const isLoggedIn = computed(() => !!token.value);

const setSession = (data: User & { token: string }) => {
  const { token: t, ...userData } = data;
  token.value = t;
  user.value = userData;
  localStorage.setItem("token", t);
  localStorage.setItem("user", JSON.stringify(userData));
};

const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  setSession(data);
  return data;
};

const register = async (name: string, email: string, password: string) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");

  setSession(data);
  return data;
};

const logout = () => {
  token.value = null;
  user.value = null;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const useAuth = () => ({
  user,
  token,
  isLoggedIn,
  login,
  register,
  logout,
});