import { ref, watch } from 'vue'

const isDark = ref(false)

export const useTheme = () => {
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (val) => {
    if (val) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, { immediate: false })

  // Persist theme on page reload
  const initTheme = () => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  }

  return {
    isDark,
    toggleTheme,
    initTheme,
  }
}