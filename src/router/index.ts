import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Collection from "../pages/Collection.vue";
import Product from "../pages/Product.vue";
import Cart from "../pages/Cart.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Favorites from "../pages/favorites.vue";
import Contact from "../pages/Contact.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/new-in", component: Collection },
    { path: "/bags", component: Collection },
    { path: "/women", component: Collection },
    { path: "/men", component: Collection },
    { path: "/valerie-bag", component: Collection },
    { path: "/gifts", component: Collection },
    { path: "/explore", component: Collection },
    { path: "/collection", component: Collection },
    { path: "/product/:id", component: Product },
    { path: "/cart", component: Cart },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/favorites", name: "favorites", component: Favorites },
    { path: "/contact", name: "contact", component: Contact },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
