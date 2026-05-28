<template>
  <footer class="bg-white border-t border-gray-100 text-gray-500 text-sm">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-center md:text-left">
          <p class="font-semibold text-gray-700 mb-1">DigiCenter © 2026</p>
          <p class="text-xs text-gray-400">KINamGamers.</p>
        </div>

        <div
          class="italic text-xs text-indigo-500 font-medium tracking-wide bg-indigo-50/50 px-3 py-1 rounded-full"
        >
          "Commit, Collaborate, and Make it Happen"
        </div>

        <div class="flex gap-4 text-xs font-medium">
          <router-link to="/evolution" class="hover:text-indigo-600 transition-colors"
            >Evolution</router-link
          >
          <router-link to="/stats" class="hover:text-indigo-600 transition-colors"
            >Stats</router-link
          >
          <router-link to="/community" class="hover:text-indigo-600 transition-colors"
            >Community</router-link
          >
        </div>
      </div>
    </div>
  </footer>
</template>
