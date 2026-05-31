<template>
  <section
    class="py-16 min-h-screen bg-cover bg-center bg-no-repeat relative"
    style="background-image: url('/src/assets/img/background digimon.jpg')"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span
          class="text-xs font-['Press_Start_2P'] tracking-[0.2em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase"
        >
          Tamer Terminal
        </span>
        <h2
          class="mt-4 text-3xl font-['Space Grotesk'] font-black tracking-tight text-gray-900 uppercase"
        >
          Digimon Database
        </h2>
        <div class="mt-2 h-[2px] w-12 bg-blue-600 mx-auto"></div>
      </div>

      <div class="bg-blue-600 rounded-xl p-6 shadow-md mb-12 border border-blue-500/30">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end font-['Space Mono']">
          <div class="md:col-span-5 flex flex-col gap-1.5">
            <label class="text-xs text-blue-100 uppercase tracking-widest font-bold">
              SEARCH
            </label>
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Agumon"
              class="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 transition text-sm"
            />
          </div>

          <div class="md:col-span-3 flex flex-col gap-1.5">
            <label class="text-xs text-blue-100 uppercase tracking-widest font-bold">LEVEL</label>
            <select
              v-model="selectedLevel"
              @change="fetchByFilter('level')"
              class="w-full bg-white text-gray-900 px-3 py-2.5 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 transition text-sm cursor-pointer"
            >
              <option value="">All Levels</option>
              <option v-for="level in levels" :key="level.value" :value="level.value">
                {{ level.name }}
              </option>
            </select>
          </div>

          <div class="md:col-span-3 flex flex-col gap-1.5">
            <label class="text-xs text-blue-100 uppercase tracking-widest font-bold"
              >ATTRIBUTE</label
            >
            <select
              v-model="selectedAttribute"
              @change="fetchByFilter('attribute')"
              class="w-full bg-white text-gray-900 px-3 py-2.5 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 transition text-sm cursor-pointer"
            >
              <option value="">All Attributes</option>
              <option v-for="attr in attributes" :key="attr.value" :value="attr.value">
                {{ attr.name }}
              </option>
            </select>
          </div>

          <div class="md:col-span-1">
            <button
              @click="resetFilters"
              class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg transition text-sm uppercase tracking-wider border border-blue-800"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-12 font-['Share_Tech_Mono']"
      >
        <div
          class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"
        ></div>
        <p class="text-gray-500 text-sm tracking-[0.2em] uppercase">
          Synchronizing Digital World Network...
        </p>
      </div>

      <div v-else-if="error" class="text-center py-20 font-['Space Mono']">
        <p class="text-red-500 text-base font-bold uppercase tracking-wide mb-4">⚠️ {{ error }}</p>
        <button
          @click="resetFilters"
          class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm uppercase tracking-wider transition-colors shadow-md"
        >
          Reset Terminal
        </button>
      </div>

      <div v-else>
        <div
          v-if="hasSearched === false"
          class="flex flex-col items-center justify-center py-12 font-['Space Mono']"
        >
          <div class="relative w-full max-w-md mx-auto flex flex-col items-center">
            <img
              src="/src/assets/img/loading screen digimon-Nobg.png"
              alt="Terminal Standby"
              class="w-48 h-auto object-contain animate-bounce z-10"
              style="animation-duration: 2s"
            />
            <div class="w-64 h-8 bg-blue-400/20 rounded-full blur-sm -mt-2"></div>
          </div>
          <p class="text-gray-400 text-sm uppercase tracking-[0.2em] text-center mt-6">
            Terminal Standby. Please initiate search query or select a category channel.
          </p>
        </div>

        <div v-else-if="digimonList.length === 0" class="text-center py-20 font-['Space Mono']">
          <p class="text-gray-400 text-sm uppercase tracking-widest">
            No Digimon signals detected in this digital sector.
          </p>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div
            v-for="digimon in digimonList"
            :key="digimon.id"
            class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between group hover:-translate-y-1 relative overflow-hidden"
          >
            <div
              class="w-full aspect-square bg-gray-50 rounded-xl p-3 flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-50/40"
            >
              <img
                :src="digimon.image"
                :alt="digimon.name"
                class="max-w-full max-h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div class="w-full text-center font-['Space Mono'] mb-4">
              <div
                v-if="digimon.level || digimon.attribute"
                class="flex items-center justify-center gap-1 mb-2 flex-wrap"
              >
                <span
                  v-if="digimon.level"
                  class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-500/20 text-amber-700 bg-amber-50/60"
                >
                  {{ digimon.level }}
                </span>
                <span
                  v-if="digimon.attribute"
                  class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-purple-500/20 text-purple-700 bg-purple-50/60"
                >
                  {{ digimon.attribute }}
                </span>
              </div>

              <h3
                class="text-sm font-bold text-gray-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors line-clamp-1"
              >
                {{ digimon.name }}
              </h3>

              <p class="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest">
                ID: #{{ String(digimon.id).padStart(3, '0') }}
              </p>
            </div>

            <RouterLink
              :to="`/Stats/${digimon.name}`"
              class="block text-center w-full py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl transition-colors uppercase font-['Space Mono'] tracking-wider border border-blue-500"
            >
              View Stats
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'

// State Utama
const digimonList = ref([])
const isLoading = ref(false)
const error = ref(null)

// Penanda Kontrol Pencarian
const hasSearched = ref(false)
const activeFilterType = ref('')

// State Filter Input
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedAttribute = ref('')

const levels = ref([
  { name: 'Baby I (Fresh)', value: 'Baby I' },
  { name: 'Baby II (In-Training)', value: 'Baby II' },
  { name: 'Rookie', value: 'Child' },
  { name: 'Champion', value: 'Adult' },
  { name: 'Ultimate', value: 'Ultimate' },
  { name: 'Armor', value: 'Armor' },
  { name: 'Hybrid', value: 'Hybrid' },
])

const attributes = ref([
  { name: 'Vaccine', value: 'Vaccine' },
  { name: 'Data', value: 'Data' },
  { name: 'Virus', value: 'Virus' },
  { name: 'Free', value: 'Free' },
  { name: 'Unknown', value: 'Unknown' },
])

const mapDigimonContent = (contentArray) => {
  return contentArray.map((item) => {
    let currentLevel = ''
    let currentAttribute = ''

    if (activeFilterType.value === 'level') {
      if (item.levels && item.levels.length > 0) {
        currentLevel = item.levels[0].level || 'Unknown'
      } else {
        currentLevel = selectedLevel.value || 'Unknown'
      }
    } else if (activeFilterType.value === 'attribute') {
      if (item.attributes && item.attributes.length > 0) {
        currentAttribute = item.attributes[0].attribute || 'Unknown'
      } else {
        currentAttribute = selectedAttribute.value || 'Unknown'
      }
    } else {
      currentLevel = item.levels && item.levels.length > 0 ? item.levels[0].level : 'Unknown'
      currentAttribute =
        item.attributes && item.attributes.length > 0 ? item.attributes[0].attribute : 'Unknown'
    }

    return {
      id: item.id,
      name: item.name,
      image: item.image,
      level: currentLevel,
      attribute: currentAttribute,
    }
  })
}

const fetchByFilter = async (type) => {
  activeFilterType.value = type

  if (type === 'level' && !selectedLevel.value) return
  if (type === 'attribute' && !selectedAttribute.value) return

  isLoading.value = true
  error.value = null
  hasSearched.value = true

  let url = 'https://digi-api.com/api/v1/digimon'

  if (type === 'level') {
    url += `?level=${selectedLevel.value}&pageSize=100`
    selectedAttribute.value = ''
    searchQuery.value = ''
  } else if (type === 'attribute') {
    url += `?attribute=${selectedAttribute.value}&pageSize=100`
    selectedLevel.value = ''
    searchQuery.value = ''
  }

  try {
    const response = await axios.get(url)
    if (response.data && response.data.content) {
      digimonList.value = mapDigimonContent(response.data.content)
    } else {
      digimonList.value = []
    }
  } catch (err) {
    digimonList.value = []
    error.value = 'Failed to fetch data filter.'
  } finally {
    isLoading.value = false
  }
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    return
  }

  activeFilterType.value = 'search'
  isLoading.value = true
  error.value = null
  hasSearched.value = true

  selectedLevel.value = ''
  selectedAttribute.value = ''

  try {
    const response = await axios.get(
      `https://digi-api.com/api/v1/digimon?name=${searchQuery.value.trim()}&pageSize=40`,
    )
    if (response.data && response.data.content) {
      digimonList.value = mapDigimonContent(response.data.content)
    } else {
      digimonList.value = []
    }
  } catch (err) {
    digimonList.value = []
  } finally {
    isLoading.value = false
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedLevel.value = ''
  selectedAttribute.value = ''
  digimonList.value = []
  hasSearched.value = false
  activeFilterType.value = ''
  error.value = null
}
</script>
