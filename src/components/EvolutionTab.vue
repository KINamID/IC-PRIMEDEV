<template>
  <div class="space-y-8">
    <section class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <span class="text-2xl">🥚</span> Langkah 1: Pilih Digitama (Digi-Egg)
      </h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button
          v-for="egg in eggs"
          :key="egg.id"
          @click="selectEgg(egg)"
          :class="[
            'p-4 rounded-xl border text-center transition-all duration-300 transform hover:-translate-y-1',
            selectedEgg?.id === egg.id
              ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
              : 'border-gray-200 bg-white hover:border-indigo-300',
          ]"
        >
          <div class="text-4xl mb-2 animate-bounce" :style="{ animationDuration: egg.speed }">
            {{ egg.emoji }}
          </div>
          <p class="font-semibold text-sm">{{ egg.name }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ egg.type }}</p>
        </button>
      </div>
    </section>

    <section v-if="selectedEgg" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 class="text-xl font-bold mb-6 text-gray-800">🧬 Lini Evolusi {{ selectedEgg.name }}</h2>

      <div class="flex flex-col lg:flex-row items-center justify-between gap-6 position-relative">
        <div
          v-for="(stage, index) in evolutionLine"
          :key="index"
          class="w-full lg:w-auto flex flex-col lg:flex-row items-center w-full"
        >
          <div
            class="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center w-full lg:w-48 shadow-sm"
          >
            <span
              class="inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-2"
            >
              {{ stage.level }}
            </span>
            <h3 class="font-bold text-gray-800 text-base mb-1">{{ stage.name }}</h3>
            <p class="text-xs text-gray-500 mb-3 line-clamp-2" :title="stage.description">
              {{ stage.description }}
            </p>
            <div class="bg-white p-2 rounded-lg border border-gray-100 inline-block shadow-inner">
              <div
                class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400"
              >
                [API Img]
              </div>
            </div>
          </div>

          <div
            v-if="index < evolutionLine.length - 1"
            class="flex flex-col items-center justify-center py-4 lg:py-0 lg:px-6 text-center w-full lg:w-auto"
          >
            <span class="text-indigo-500 text-xl lg:rotate-0 rotate-90">➡️</span>
            <div
              class="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] px-2 py-1 rounded-md mt-1 max-w-[150px] font-medium"
            >
              {{ stage.requirement }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const eggs = ref([
  { id: 1, name: 'Dragon Egg', emoji: '🔴', type: 'Fire / Dragon', speed: '2s' },
  { id: 2, name: 'Nature Egg', emoji: '🟢', type: 'Plant / Insect', speed: '2.5s' },
  { id: 3, name: 'Aquatic Egg', emoji: '🔵', type: 'Water / Ice', speed: '1.8s' },
  { id: 4, name: 'Holy Egg', emoji: '🟡', type: 'Angel / Vaccine', speed: '3s' },
])

const selectedEgg = ref(null)
const evolutionLine = ref([])

const selectEgg = (egg) => {
  selectedEgg.value = egg
  // Data dummy simulasi parsing dari Digimon API
  evolutionLine.value = [
    {
      level: 'Fresh',
      name: 'Botamon',
      description: 'Digimon lendir hitam yang baru menetas.',
      requirement: 'Menetas otomatis',
    },
    {
      level: 'In-Training',
      name: 'Koromon',
      description: 'Digimon kecil yang lincah dan bisa mengeluarkan gelembung.',
      requirement: 'Level 5 + 10 Data',
    },
    {
      level: 'Rookie',
      name: 'Agumon',
      description: 'Digimon reptil yang sangat terkenal dengan serangan oranye apinya.',
      requirement: 'Level 16 + Attack > 50',
    },
    {
      level: 'Champion',
      name: 'Greymon',
      description: 'Digimon dinosaurus perkasa berhelm tanduk keras.',
      requirement: 'Level 30 + 80% Win Rate',
    },
  ]
}
</script>
