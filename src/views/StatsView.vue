<template>
  <section
    class="py-16 min-h-screen bg-cover bg-center bg-no-repeat relative text-gray-850 font-['Share_Tech_Mono']"
    style="background-image: url('/src/assets/img/background digimon.jpg')"
  >
    <div class="absolute inset-0 bg-white/10 pointer-events-none"></div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <button
        @click="$router.back()"
        class="mb-8 flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase bg-white/90 px-4 py-2 rounded-xl border border-gray-200 backdrop-blur-md shadow-sm"
      >
        ← Back to Database Terminal
      </button>

      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-20 bg-white/90 border border-gray-200 rounded-3xl shadow-xl backdrop-blur-md"
      >
        <div class="relative max-w-xs w-full mb-6 animate-pulse">
          <img
            src="/src/assets/img/loading screen digimon-Nobg.png"
            alt="Crest and Digimon Loading Matrix"
            class="w-48 h-auto object-contain mx-auto"
          />
        </div>
        <div
          class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold">
          Synchronizing Digital World Archive...
        </p>
      </div>

      <div
        v-else-if="error"
        class="text-center py-20 bg-white/90 border border-gray-200 rounded-3xl shadow-lg backdrop-blur-md p-6"
      >
        <p class="text-rose-600 font-bold uppercase tracking-wide mb-4">⚠️ {{ error }}</p>
        <button
          @click="loadDefaultAgumon"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-all shadow-md"
        >
          Re-initialize Agumon Core
        </button>
      </div>

      <div v-else-if="digimonDetail" class="space-y-8">
        <div
          class="bg-white/95 border border-gray-200 rounded-3xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-center gap-8"
        >
          <div
            class="w-48 h-48 bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-center flex-shrink-0 shadow-inner"
          >
            <img
              :src="digimonDetail.image"
              :alt="digimonDetail.name"
              class="max-w-full max-h-full object-contain transform transition-transform hover:scale-110 duration-500"
            />
          </div>

          <div class="flex-1 text-center md:text-left space-y-3">
            <span
              class="inline-block text-[10px] font-['Press_Start_2P'] tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full uppercase"
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
                class="text-[11px] px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 font-bold rounded uppercase"
              >
                Level: {{ digimonDetail.level }}
              </span>
              <span
                class="text-[11px] px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 font-bold rounded uppercase"
              >
                Attribute: {{ digimonDetail.attribute }}
              </span>
              <span
                v-if="digimonDetail.type"
                class="text-[11px] px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold rounded uppercase"
              >
                Type: {{ digimonDetail.type }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div
            class="md:col-span-5 bg-white/95 border border-gray-200 rounded-3xl p-6 shadow-md space-y-4"
          >
            <h3
              class="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2"
            >
              Profile Digimon
            </h3>
            <p
              class="text-[13px] text-gray-600 font-sans leading-relaxed text-justify whitespace-pre-line"
            >
              {{ digimonDetail.description || 'No digital archive logs found for this entity.' }}
            </p>
          </div>

          <div
            class="md:col-span-7 bg-white/95 border border-gray-200 rounded-3xl p-6 shadow-md space-y-4"
          >
            <h3
              class="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2 flex items-center gap-2"
            >
              Digimon Battle Skills
            </h3>

            <div
              v-if="digimonDetail.moves.length === 0"
              class="text-center py-12 text-gray-400 text-xs uppercase"
            >
              No battle skills decoded for {{ digimonDetail.name }}.
            </div>

            <div v-else class="space-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scroll">
              <div
                v-for="(move, index) in digimonDetail.moves"
                :key="index"
                class="bg-gray-50/80 border border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:bg-white transition-all shadow-sm"
              >
                <div class="flex justify-between items-center gap-2 mb-2">
                  <h4 class="text-xs font-bold text-blue-600 uppercase tracking-widest">
                    {{ move.name }}
                  </h4>
                  <span
                    v-if="move.type"
                    class="text-[9px] font-bold px-2 py-0.5 bg-white border border-gray-200 text-gray-500 rounded uppercase"
                  >
                    {{ move.type }}
                  </span>
                </div>
                <p class="text-[12px] text-gray-500 font-sans leading-relaxed">
                  {{ move.description || 'No tactical breakdown available.' }}
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()

const digimonDetail = ref(null)
const isLoading = ref(false)
const error = ref(null)

const fetchDigimonDetail = async () => {
  let digimonIdentifier = route.params.id

  if (!digimonIdentifier || digimonIdentifier === 'undefined') {
    digimonIdentifier = 'Agumon'
  }

  try {
    isLoading.value = true
    error.value = null

    let targetId = digimonIdentifier

    if (isNaN(digimonIdentifier)) {
      const searchRes = await axios.get(
        `https://digi-api.com/api/v1/digimon?name=${digimonIdentifier.trim()}`,
      )
      if (searchRes.data && searchRes.data.content && searchRes.data.content.length > 0) {
        targetId = searchRes.data.content[0].id
      } else {
        error.value = `Unable to locate "${digimonIdentifier}" in the Digital Network.`
        isLoading.value = false
        return
      }
    }

    const response = await axios.get(`https://digi-api.com/api/v1/digimon/${targetId}`)

    if (response.data) {
      const data = response.data
      const englishDesc =
        data.descriptions?.find((d) => d.language === 'en_us')?.description ||
        data.descriptions?.[0]?.description ||
        ''

      digimonDetail.value = {
        id: data.id,
        name: data.name,
        image: data.images && data.images.length > 0 ? data.images[0].href : '',
        level: data.levels?.[0]?.level || 'Unknown',
        attribute: data.attributes?.[0]?.attribute || 'Unknown',
        type: data.types?.[0]?.type || '',
        description: englishDesc,
        moves:
          data.skills?.map((s) => ({
            name: s.skill,
            description: s.description,
            type: s.translation || '',
          })) || [],
      }
    }
  } catch (err) {
    error.value = 'Failed to establish connection with the central database.'
  } finally {
    isLoading.value = false
  }
}

const loadDefaultAgumon = () => {
  if (route.params) {
    route.params.id = 'Agumon'
  }
  fetchDigimonDetail()
}

watch(
  () => route.params.id,
  () => {
    fetchDigimonDetail()
  },
)

onMounted(() => {
  fetchDigimonDetail()
})
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 5px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 8px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #3b82f6;
}
</style>
