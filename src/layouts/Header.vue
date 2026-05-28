<template>
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2 group">
        <span class="text-2xl group-hover:scale-110 transition-transform duration-200">🤖</span>
        <span
          class="font-black text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
        >
          DigiDevs
        </span>
      </router-link>

      <nav class="hidden md:flex items-center space-x-1">
        <router-link
          to="/evolution"
          class="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all"
          active-class="text-indigo-600 bg-indigo-50/50"
        >
          Evolution
        </router-link>
        <router-link
          to="/stats"
          class="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all"
          active-class="text-indigo-600 bg-indigo-50/50"
        >
          Stats & Moves
        </router-link>
        <router-link
          to="/community"
          class="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all"
          active-class="text-indigo-600 bg-indigo-50/50"
        >
          Community
        </router-link>
      </nav>

      <button
        @click="isMenuOpen = !isMenuOpen"
        class="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div
      v-show="isMenuOpen"
      class="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-inner"
    >
      <router-link
        to="/evolution"
        @click="isMenuOpen = false"
        class="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
        active-class="text-indigo-600 bg-indigo-50"
      >
        🧬 Evolution Tree
      </router-link>
      <router-link
        to="/stats"
        @click="isMenuOpen = false"
        class="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
        active-class="text-indigo-600 bg-indigo-50"
      >
        ⚔️ Moves & Stats
      </router-link>
      <router-link
        to="/community"
        @click="isMenuOpen = false"
        class="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
        active-class="text-indigo-600 bg-indigo-50"
      >
        💬 Tamer Community
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
</script>
