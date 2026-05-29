<template>
  <section class="py-16 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span
          class="text-xs font-['Press_Start_2P'] tracking-[0.2em] text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase"
        >
          Tamer Terminal
        </span>
        <h2
          class="mt-4 text-3xl font-['Orbitron'] font-black tracking-tight text-gray-900 uppercase"
        >
          Digimon Database
        </h2>
        <div class="mt-2 h-[2px] w-12 bg-blue-600 mx-auto"></div>
      </div>

      <div class="bg-blue-600 rounded-xl p-6 shadow-md mb-12 border border-blue-500/30">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end font-['Share_Tech_Mono']">
          <div class="md:col-span-5 flex flex-col gap-1.5">
            <label class="text-xs text-blue-100 uppercase tracking-widest font-bold"
              >🔍 Search By Name</label
            >
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Type name & press Enter..."
              class="w-full bg-white text-gray-900 px-4 py-2.5 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-300 transition text-sm"
            />
          </div>

          <div class="md:col-span-3 flex flex-col gap-1.5">
            <label class="text-xs text-blue-100 uppercase tracking-widest font-bold">Level</label>
            <select
              v-model="selectedLevel"
              @change="fetchByFilter"
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
              >Attribute</label
            >
            <select
              v-model="selectedAttribute"
              @change="fetchByFilter"
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
              Reset
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-12 font-['Share_Tech_Mono']"
      >
        <div class="relative max-w-xs w-full mb-2 animate-pulse">
          <img
            src="@/assets/img/loading screen digimon-Nobg.png"
            alt="Crest and Digimon Loading Matrix"
            class="w-full h-auto object-contain mx-auto"
          />
        </div>
        <div
          class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"
        ></div>
        <p class="text-gray-500 text-sm tracking-[0.2em] uppercase">
          Synchronizing Digital World Network...
        </p>
      </div>

      <div v-else-if="error" class="text-center py-20 font-['Share_Tech_Mono']">
        <p class="text-red-500 text-base font-bold uppercase tracking-wide mb-4">⚠️ {{ error }}</p>
        <button
          @click="initInitialData"
          class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm uppercase tracking-wider transition-colors shadow-md"
        >
          Retry Connection
        </button>
      </div>

      <div v-else>
        <div v-if="digimonList.length === 0" class="text-center py-20 font-['Share_Tech_Mono']">
          <p class="text-gray-400 text-lg uppercase tracking-widest">
            No Digimon found in this sector.
          </p>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div
            v-for="digimon in digimonList"
            :key="digimon.id"
            class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between group hover:-translate-y-1 relative overflow-hidden"
          >
            <div
              class="w-full aspect-square bg-gray-50 rounded-lg p-3 flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-50/50"
            >
              <img
                :src="digimon.image"
                :alt="digimon.name"
                class="max-w-full max-h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div class="w-full text-center font-['Share_Tech_Mono']">
              <span
                class="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-500/30 text-amber-600 bg-amber-50 mb-1.5"
              >
                {{ digimon.level }}
              </span>

              <h3
                class="text-sm font-bold text-gray-800 uppercase tracking-wide group-hover:text-blue-600 transition-colors line-clamp-1"
              >
                {{ digimon.name }}
              </h3>

              <p class="text-[11px] text-gray-400 mt-1 uppercase tracking-widest">
                ID: #{{ String(digimon.id).padStart(3, '0') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// State utama
const digimonList = ref([])
const isLoading = ref(true)
const error = ref(null)

// State filter pencarian
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedAttribute = ref('')

// PERBAIKAN KEDUA: Pemetaan opsi dropdown sesuai standar parameter sensitif casing dari DAPI
const levels = ref([
  { name: 'Baby I (Fresh)', value: 'Baby I' },
  { name: 'Baby II (In-Training)', value: 'Baby II' },
  { name: 'Rookie', value: 'Rookie' },
  { name: 'Champion', value: 'Champion' },
  { name: 'Ultimate', value: 'Ultimate' },
  { name: 'Mega', value: 'Mega' },
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

// Helper internal untuk mengamankan data bertingkat dari response DAPI
const mapDigimonContent = (contentArray) => {
  return contentArray.map((item) => {
    let currentLevel = 'Unknown'
    if (item.levels && item.levels.length > 0) {
      currentLevel = item.levels[0].level || 'Unknown'
    } else if (selectedLevel.value) {
      // Jika memanggil via filter level, pasang levelnya agar tidak kosong saat dirender
      currentLevel = selectedLevel.value
    }

    return {
      id: item.id,
      name: item.name,
      image: item.image,
      level: currentLevel,
    }
  })
}

// 1. Ambil Data Awal (Gabungan beberapa halaman/parameter default agar bervariasi)
const initInitialData = async () => {
  isLoading.value = true
  error.value = null
  try {
    // Memanggil list awal dengan pageSize besar agar bervariasi
    const response = await axios.get('https://digi-api.com/api/v1/digimon?page=0&pageSize=120')
    if (response.data && response.data.content) {
      digimonList.value = mapDigimonContent(response.data.content)
    }
  } catch (err) {
    console.error(err)
    error.value = 'CONNECTION ERROR WITH DIGITAL WORLD.'
  } finally {
    isLoading.value = false
  }
}

// 2. Ambil Data Berdasarkan Pilihan Dropdown Level / Atribut
const fetchByFilter = async () => {
  if (!selectedLevel.value && !selectedAttribute.value) {
    await initInitialData()
    return
  }

  isLoading.value = true
  error.value = null
  let url = 'https://digi-api.com/api/v1/digimon'

  if (selectedLevel.value) {
    url += `?level=${selectedLevel.value}&pageSize=100`
    selectedAttribute.value = '' // Reset salah satu agar query tunggal bersih
  } else if (selectedAttribute.value) {
    url += `?attribute=${selectedAttribute.value}&pageSize=100`
  }

  try {
    const response = await axios.get(url)
    if (response.data && response.data.content) {
      digimonList.value = mapDigimonContent(response.data.content)
    } else {
      digimonList.value = []
    }
  } catch (err) {
    console.error(err)
    digimonList.value = []
  } finally {
    isLoading.value = false
  }
}

// 3. Fungsi Pencarian Teks Nama Spesifik via Enter
const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    await initInitialData()
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const response = await axios.get(
      `https://digi-api.com/api/v1/digimon?name=${searchQuery.value.trim()}&pageSize=20`,
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

// Bersihkan Semua Filter Terminal
const resetFilters = async () => {
  searchQuery.value = ''
  selectedLevel.value = ''
  selectedAttribute.value = ''
  await initInitialData()
}

onMounted(() => {
  initInitialData()
})
</script>
