<template>
  <header
    class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-4 group flex-shrink-0">
        <div class="relative">
          <img
            src="/public/Logo Digimon v2 nobg.png"
            alt="DigiCenter Logo"
            class="h-12 sm:h-15 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div class="flex flex-col">
          <span
            class="text-2xl font-['Orbitron'] font-black tracking-tighter text-gray-900 leading-none"
          >
            DIGICENTER
          </span>
          <span
            class="text-[10px] font-['Share_Tech_Mono'] uppercase tracking-[0.2em] text-gray-400 leading-none mt-1"
          >
            Tamer Evolution Database
          </span>
        </div>
      </RouterLink>

      <nav class="hidden md:flex items-center space-x-1 font-['Share_Tech_Mono']">
        <RouterLink
          to="/Evolution"
          class="relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 group/nav"
          :class="[
            $route.path.includes('/Evolution')
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-blue-600',
          ]"
        >
          Evolution
          <span
            class="absolute bottom-0 left-4 right-4 h-[2px] bg-blue-600 transition-transform duration-300 origin-left"
            :class="[
              $route.path.includes('/Evolution')
                ? 'scale-x-100'
                : 'scale-x-0 group-hover/nav:scale-x-100',
            ]"
          ></span>
        </RouterLink>

        <RouterLink
          to="/Stats"
          class="relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 group/nav"
          :class="[
            $route.path.includes('/Stats') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600',
          ]"
        >
          Stats
          <span
            class="absolute bottom-0 left-4 right-4 h-[2px] bg-blue-600 transition-transform duration-300 origin-left"
            :class="[
              $route.path.includes('/Stats')
                ? 'scale-x-100'
                : 'scale-x-0 group-hover/nav:scale-x-100',
            ]"
          ></span>
        </RouterLink>

        <RouterLink
          to="/AllDigimon"
          class="relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 group/nav"
          :class="[
            $route.path.includes('/AllDigimon')
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-blue-600',
          ]"
        >
          All Digimon
          <span
            class="absolute bottom-0 left-4 right-4 h-[2px] bg-blue-600 transition-transform duration-300 origin-left"
            :class="[
              $route.path.includes('/AllDigimon')
                ? 'scale-x-100'
                : 'scale-x-0 group-hover/nav:scale-x-100',
            ]"
          ></span>
        </RouterLink>

        <RouterLink
          to="/Community"
          class="relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 group/nav"
          :class="[
            $route.path.includes('/Community')
              ? 'text-blue-600'
              : 'text-gray-500 hover:text-blue-600',
          ]"
        >
          Community
          <span
            class="absolute bottom-0 left-4 right-4 h-[2px] bg-blue-600 transition-transform duration-300 origin-left"
            :class="[
              $route.path.includes('/Community')
                ? 'scale-x-100'
                : 'scale-x-0 group-hover/nav:scale-x-100',
            ]"
          ></span>
        </RouterLink>
      </nav>

      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <div class="w-6 h-5 relative flex flex-col justify-between">
          <span
            :class="[
              'w-full h-0.5 bg-current transition-all',
              isMenuOpen ? 'rotate-45 translate-y-2' : '',
            ]"
          ></span>
          <span
            :class="['w-full h-0.5 bg-current transition-all', isMenuOpen ? 'opacity-0' : '']"
          ></span>
          <span
            :class="[
              'w-full h-0.5 bg-current transition-all',
              isMenuOpen ? '-rotate-45 -translate-y-2' : '',
            ]"
          ></span>
        </div>
      </button>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-show="isMenuOpen"
        class="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-1 shadow-xl"
      >
        <RouterLink
          to="/Evolution"
          @click="isMenuOpen = false"
          class="flex items-center justify-between px-4 py-3 rounded-xl text-base font-['Share_Tech_Mono'] font-bold transition-all"
          :class="[
            $route.path.includes('/Evolution')
              ? 'text-blue-600 bg-blue-50/50'
              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50',
          ]"
        >
          Evolution
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
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)
</script>
