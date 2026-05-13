import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { useTheme } from './composables/useTheme'
import './style.css'

const { initTheme } = useTheme()
initTheme()

createApp(App).use(router).mount('#app')