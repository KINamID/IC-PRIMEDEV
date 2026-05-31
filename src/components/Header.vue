<template>
  <header
    class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between md:justify-between relative"
    >
      <div class="flex items-center md:hidden order-first z-10">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-500 hover:text-blue-600 focus:outline-none transition-all"
          :aria-expanded="isMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            v-if="!isMenuOpen"
            class="block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        class="absolute inset-0 flex items-center justify-center pointer-events-none md:static md:inset-auto md:flex-row md:justify-start md:pointer-events-auto md:gap-4 flex-shrink-0"
      >
        <RouterLink to="/" class="flex items-center gap-4 group pointer-events-auto select-none">
          <div class="relative hidden md:block">
            <img
              src="/public/Logo Digimon v2 nobg.png"
              alt="DigiCenter Logo"
              class="h-12 sm:h-15 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div class="flex flex-col text-center md:text-left">
            <span
              class="text-2xl font-['Space Grotesk'] font-black tracking-tighter text-gray-900 leading-none group-hover:text-blue-600 transition-colors"
            >
              DIGICENTER
            </span>
            <span
              class="text-[10px] font-['Space Mono'] uppercase tracking-[0.2em] text-gray-400 leading-none mt-1"
            >
              Tamer Evolution Database
            </span>
          </div>
        </RouterLink>
      </div>

      <div class="w-10 h-10 md:hidden pointer-events-none"></div>

      <nav class="hidden md:flex items-center space-x-8 font-['Space Mono'] h-full">
        <RouterLink
          to="/"
          class="nav-link text-sm font-bold tracking-wider uppercase relative py-2 transition-colors duration-300"
          :class="[
            $route.path === '/' ? 'text-blue-600 active-link' : 'text-gray-600 hover:text-blue-600',
          ]"
        >
          Home
        </RouterLink>

        <RouterLink
          to="/Stats"
          class="nav-link text-sm font-bold tracking-wider uppercase relative py-2 transition-colors duration-300"
          :class="[
            $route.path.includes('/Stats')
              ? 'text-blue-600 active-link'
              : 'text-gray-600 hover:text-blue-600',
          ]"
        >
          Stats
        </RouterLink>

        <RouterLink
          to="/AllDigimon"
          class="nav-link text-sm font-bold tracking-wider uppercase relative py-2 transition-colors duration-300"
          :class="[
            $route.path.includes('/AllDigimon')
              ? 'text-blue-600 active-link'
              : 'text-gray-600 hover:text-blue-600',
          ]"
        >
          All Digimon
        </RouterLink>

        <RouterLink
          to="/Community"
          class="nav-link text-sm font-bold tracking-wider uppercase relative py-2 transition-colors duration-300"
          :class="[
            $route.path.includes('/Community')
              ? 'text-blue-600 active-link'
              : 'text-gray-600 hover:text-blue-600',
          ]"
        >
          Community
        </RouterLink>
      </nav>
    </div>

    <div
      v-show="isMenuOpen"
      class="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md shadow-inner transition-all duration-300"
    >
      <div class="px-4 py-3 space-y-1.5 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <RouterLink
          to="/"
          @click="isMenuOpen = false"
          class="flex items-center justify-between px-4 py-3 rounded-xl text-base font-['Share_Tech_Mono'] font-bold transition-all"
          :class="[
            $route.path === '/'
              ? 'text-blue-600 bg-blue-50/50'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
          ]"
        >
          Home
          <span class="text-xs opacity-50">→</span>
        </RouterLink>

        <RouterLink
          to="/Stats"
          @click="isMenuOpen = false"
          class="flex items-center justify-between px-4 py-3 rounded-xl text-base font-['Share_Tech_Mono'] font-bold transition-all"
          :class="[
            $route.path.includes('/Stats')
              ? 'text-blue-600 bg-blue-50/50'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
          ]"
        >
          Stats
          <span class="text-xs opacity-50">→</span>
        </RouterLink>

        <RouterLink
          to="/AllDigimon"
          @click="isMenuOpen = false"
          class="flex items-center justify-between px-4 py-3 rounded-xl text-base font-['Share_Tech_Mono'] font-bold transition-all"
          :class="[
            $route.path.includes('/AllDigimon')
              ? 'text-blue-600 bg-blue-50/50'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
          ]"
        >
          All Digimon
          <span class="text-xs opacity-50">→</span>
        </RouterLink>

        <RouterLink
          to="/Community"
          @click="isMenuOpen = false"
          class="flex items-center justify-between px-4 py-3 rounded-xl text-base font-['Share_Tech_Mono'] font-bold transition-all"
          :class="[
            $route.path.includes('/Community')
              ? 'text-blue-600 bg-blue-50/50'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
          ]"
        >
          Community
          <span class="text-xs opacity-50">→</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
</script>

<style scoped>
/* Kode css underline hover bawaan Anda tetap dipertahankan 100% */
.nav-link::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #2563eb;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.active-link::after {
  transform: scaleX(1) !important;
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
