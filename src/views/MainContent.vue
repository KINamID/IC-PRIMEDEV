<template>
  <main class="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased pb-12">
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4 shadow-md mb-8">
      <div class="max-w-6xl mx-auto text-center md:text-left">
        <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">DigiCenter Hub</h1>
        <p class="text-blue-100 text-sm md:text-base max-w-xl">
          Jelajahi lini evolusi, analisis stats & moves, dan diskusikan Digimon favoritmu bersama
          Tamer lainnya!
        </p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 mb-8">
      <div
        class="flex bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 overflow-x-auto space-x-1"
      >
        <router-link
          to="/evolution"
          class="flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap text-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
          active-class="bg-indigo-600 !text-white shadow-sm"
        >
          🧬 Evolution Tree
        </router-link>

        <router-link
          to="/stats"
          class="flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap text-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
          active-class="bg-indigo-600 !text-white shadow-sm"
        >
          ⚔️ Moves & Stats
        </router-link>

        <router-link
          to="/community"
          class="flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap text-center text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
          active-class="bg-indigo-600 !text-white shadow-sm"
        >
          💬 Tamer Community
        </router-link>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
