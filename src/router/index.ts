import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Collection from '../pages/Collection.vue'
import Product from '../pages/Product.vue'
import Cart from '../pages/Cart.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/collection', component: Collection },
    { path: '/product/:id', component: Product },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router