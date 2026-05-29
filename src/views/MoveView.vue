<template>
  <section class="py-16 bg-gray-50 min-h-screen text-gray-850 font-['Share_Tech_Mono']">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        @click="$router.back()"
        class="mb-8 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase"
      >
        ← Back to Database
      </button>

      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-3xl shadow-sm"
      >
        <div
          class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 uppercase tracking-widest text-sm">
          Extracting Digimon Core Data...
        </p>
      </div>

      <div
        v-else-if="error"
        class="text-center py-20 bg-white border border-gray-200 rounded-3xl shadow-sm"
      >
        <p class="text-rose-600 font-bold uppercase tracking-wide">{{ error }}</p>
      </div>

      <div v-else-if="digimonDetail" class="space-y-8">
        <div
          class="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8"
        >
          <div
            class="w-48 h-48 bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-center flex-shrink-0 shadow-inner"
          >
            <img
              :src="digimonDetail.image"
              :alt="digimonDetail.name"
              class="max-w-full max-h-full object-contain"
            />
          </div>

          <div class="flex-1 text-center md:text-left space-y-3">
            <span
              class="inline-block text-xs font-['Press_Start_2P'] tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase"
            >
              ID: #{{ String(digimonDetail.id).padStart(3, '0') }}
            </span>
            <h2
              class="text-3xl md:text-4xl font-['Orbitron'] font-black text-gray-900 uppercase tracking-tight"
            >
              {{ digimonDetail.name }}
            </h2>

            <div class="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
              <span
                class="text-xs px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 font-bold rounded uppercase"
              >
                Level: {{ digimonDetail.level }}
              </span>
              <span
                class="text-xs px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 font-bold rounded uppercase"
              >
                Attribute: {{ digimonDetail.attribute }}
              </span>
              <span
                v-if="digimonDetail.type"
                class="text-xs px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded uppercase"
              >
                Type: {{ digimonDetail.type }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div
            class="md:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5"
          >
            <h3
              class="text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2"
            >
              📊 Core Status Stats
            </h3>

            <div class="space-y-4">
              <div v-for="stat in stats" :key="stat.name" class="space-y-1">
                <div class="flex justify-between text-xs font-bold uppercase tracking-wide">
                  <span class="text-gray-500">{{ stat.name }}</span>
                  <span class="text-blue-600">{{ stat.value }} / 100</span>
                </div>
                <div
                  class="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden border border-gray-200/50"
                >
                  <div
                    class="bg-blue-600 h-full rounded-full transition-all duration-1000"
                    :style="{ width: stat.value + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="md:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4"
          >
            <h3
              class="text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2"
            >
              ⚔️ Database Skill Moves
            </h3>

            <div
              v-if="digimonDetail.moves.length === 0"
              class="text-center py-8 text-gray-400 text-sm uppercase"
            >
              No special moves logged in the central terminal.
            </div>

            <div v-else class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              <div
                v-for="(move, index) in digimonDetail.moves"
                :key="index"
                class="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors"
              >
                <div class="flex justify-between items-start gap-2 mb-2">
                  <h4 class="text-sm font-bold text-blue-600 uppercase tracking-wide">
                    🔥 {{ move.name }}
                  </h4>
                  <span
                    v-if="move.type"
                    class="text-[10px] font-bold px-2 py-0.5 bg-gray-200/60 border border-gray-300 text-gray-600 rounded uppercase"
                  >
                    {{ move.type }}
                  </span>
                </div>
                <p class="text-xs text-gray-600 font-sans leading-relaxed">
                  {{
                    move.description ||
                    'No database breakdown available for this specific tactical skill.'
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

// State Data Manajemen
const digimonDetail = ref(null)
const isLoading = ref(false)
const error = ref(null)

// Simulasi Data Stats Parameter Lokal (karena DAPI murni tidak menyediakan objek status numerik HP/ATK)
const stats = ref([
  { name: 'Hit Points (HP)', value: Math.floor(Math.random() * 40) + 55 },
  { name: 'Attack Power (ATK)', value: Math.floor(Math.random() * 40) + 50 },
  { name: 'Defense Shield (DEF)', value: Math.floor(Math.random() * 35) + 45 },
  { name: 'Velocity Speed (SPD)', value: Math.floor(Math.random() * 50) + 45 },
])

// FUNGSI FETCH DETAIL UNTUK MENANGKAP JURUS & PENJELASAN DARI API
const fetchDigimonDetail = async () => {
  // Ambil ID atau Name yang dilemparkan lewat parameter Router (contoh rute: /stats/:id)
  const digimonIdentifier = route.params.id || 'Agumon'

  try {
    isLoading.value = true
    error.value = null

    const response = await axios.get(`https://digi-api.com/api/v1/digimon/${digimonIdentifier}`)

    if (response.data) {
      const data = response.data

      // Sanitasi dan mapping struktur data respons agar mudah dikonsumsi template
      digimonDetail.value = {
        id: data.id,
        name: data.name,
        image: data.image,
        level: data.levels && data.levels.length > 0 ? data.levels[0].level : 'Unknown',
        attribute:
          data.attributes && data.attributes.length > 0 ? data.attributes[0].attribute : 'Unknown',
        type: data.types && data.types.length > 0 ? data.types[0].type : '',
        // Mapping array skills bawaan API untuk dipasang ke kolom Moves
        moves: data.skills
          ? data.skills.map((s) => ({
              name: s.skill,
              description: s.description,
              type: s.translation || '',
            }))
          : [],
      }
    } else {
      error.value = 'Digimon core registry could not be found.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Network decryption failure. Check terminal link.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDigimonDetail()
})
</script>

<style scoped>
/* Scrollbar halus untuk box list jurus moves */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 99px;
}
::-webkit-scrollbar-thumb:hover {
  background: #3b82f6;
}
</style>
