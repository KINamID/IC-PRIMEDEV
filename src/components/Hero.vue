<template>
  <div
    class="relative w-full h-screen flex items-center justify-center bg-[#0081d5] bg-no-repeat bg-center overflow-hidden transition-all duration-300"
    style="background-image: url('/src/assets/img/Home\ Digimon.jpg'); background-size: cover"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/40"></div>

    <div class="relative z-10 text-center px-6 max-w-5xl select-none">
      <span
        class="inline-block text-[10px] sm:text-xs font-['Press_Start_2P'] tracking-widest text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-4 py-2 rounded-full mb-8 shadow-md uppercase animate-pulse"
      >
        Digital World Entrance
      </span>

      <div class="h-28 sm:h-36 md:h-44 flex items-center justify-center mb-8">
        <transition name="text-slide" mode="out-in">
          <h1
            :key="currentTextIndex"
            :class="[
              'font-black tracking-wider drop-shadow-[0_5px_30px_rgba(0,0,0,0.95)] transition-all duration-500 text-transparent bg-clip-text',
              isFinalStage
                ? 'text-6xl sm:text-8xl md:text-9xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 font-sans'
                : 'text-4xl sm:text-6xl md:text-7xl bg-gradient-to-r from-white via-blue-100 to-indigo-200 font-[Orbitron]',
            ]"
          >
            {{ textVariations[currentTextIndex] }}
          </h1>
        </transition>
      </div>

      <p
        class="text-sm sm:text-base md:text-xl text-white font-['Share_Tech_Mono'] tracking-wide max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-12"
      >
        Selamat datang di DigiCenter Hub. Analisis Digimon, telusuri rantai evolusi monster digital,
        dan bangun strategi terbaikmu.
      </p>

      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
        <RouterLink
          to="/Evolution"
          class="min-w-64 px-8 py-4 text-sm font-['Press_Start_2P'] tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-[0_5px_15px_rgba(37,99,235,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(37,99,235,0.6)] uppercase"
        >
          Mulai Petualangan
        </RouterLink>
        <RouterLink
          to="/AllDigimon"
          class="min-w-64 px-8 py-4 text-sm font-['Press_Start_2P'] tracking-wider text-blue-200 bg-transparent border-2 border-blue-500/50 hover:bg-blue-900/30 rounded-md transition-all duration-300 transform hover:-translate-y-1 uppercase"
        >
          Lihat Digimon
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Variasi teks tiga bahasa yang berganti secara otomatis
const textVariations = ['Monster Digital', 'Digital Monster', 'デジモン']
const currentTextIndex = ref(0)
const isFinalStage = ref(false)
let intervalId = null

onMounted(() => {
  // Interval transisi teks diatur setiap 2.2 detik
  intervalId = setInterval(() => {
    if (currentTextIndex.value < textVariations.length - 1) {
      currentTextIndex.value++

      // Jika sudah mencapai bahasa Jepang (indeks terakhir), hentikan perulangan teks
      if (currentTextIndex.value === textVariations.length - 1) {
        isFinalStage.value = true
        clearInterval(intervalId)
      }
    }
  }, 2200)
})

onUnmounted(() => {
  // Membersihkan memori interval jika user berpindah halaman rute
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
/* Efek Transisi Slide-Fade yang Lembut Saat Teks Berganti */
.text-slide-enter-active,
.text-slide-leave-active {
  transition: all 0.4s ease;
}
.text-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.text-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(1.05);
}
</style>
