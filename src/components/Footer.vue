<template>
  <footer class="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col items-center gap-10">
        <div class="text-center">
          <h2 class="text-2xl font-['Space Grotesk'] font-black tracking-[0.3em] text-gray-800">
            DIGICENTER
          </h2>
          <p class="text-[10px] font-['Space Mono'] uppercase tracking-[0.4em] text-gray-400 mt-2">
            World Portal Digimon
          </p>
        </div>

        <div class="relative py-4 px-8 border-y border-gray-200">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-50 px-4 text-blue-500">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.89543 1.91243 3 3.017 3H6.017C8.22614 3 10.017 4.79086 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H1.017Z"
              />
            </svg>
          </span>
          <p
            class="text-sm md:text-base font-['Space Mono'] font-bold text-gray-600 tracking-widest text-center uppercase"
          >
            "TRAIN. FIGHT. AND EVOLVE"
          </p>
        </div>

        <div class="flex font-['Space Mono'] flex-wrap justify-center gap-x-12 gap-y-4">
          <RouterLink
            to="/Evolution"
            class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors"
            >Evolution</RouterLink
          >
          <RouterLink
            to="/Stats"
            class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors"
            >Stats</RouterLink
          >
          <RouterLink
            to="/Community"
            class="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-blue-500 transition-colors"
            >Community</RouterLink
          >
        </div>

        <div
          class="w-full flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-8 gap-4"
        >
          <p
            class="text-[10px] font-['Space Mono'] font-medium text-gray-400 uppercase tracking-widest"
          >
            DigiCenter 2026 <span class="mx-2">|</span> @KINamGamers
          </p>
          <p
            class="text-[10px] font-['Space Mono'] text-gray-400 font-bold tracking-widest uppercase"
          >
            Developed for Primakara Final Project
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
