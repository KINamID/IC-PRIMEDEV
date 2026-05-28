<template>
  <div class="space-y-6">
    <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <h3 class="font-bold text-gray-800 text-base mb-3">Bagikan Pendapat / Taktik-mu 📝</h3>
      <div class="space-y-3">
        <input
          v-model="newTamer"
          type="text"
          placeholder="Nama Tamer kamu..."
          class="w-full md:w-1/3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
        />
        <textarea
          v-model="newOpinion"
          rows="3"
          placeholder="Wargreymon vs Omnimon bagusan mana buat PvE? Yuk diskusi..."
          class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500"
        ></textarea>
        <div class="text-right">
          <button
            @click="addPost"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            Kirim Diskusi
          </button>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xs"
            >
              {{ post.tamer[0].toUpperCase() }}
            </div>
            <div>
              <span class="text-sm font-bold text-gray-800 block leading-tight"
                >Tamer {{ post.tamer }}</span
              >
              <span class="text-[10px] text-gray-400">{{ post.date }}</span>
            </div>
          </div>
          <span
            class="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100"
          >
            💬 {{ post.replies }} Balasan
          </span>
        </div>
        <p class="text-sm text-gray-600 leading-relaxed">
          {{ post.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTamer = ref('')
const newOpinion = ref('')

const posts = ref([
  {
    id: 1,
    tamer: 'Taichi_99',
    date: '5 Menit yang lalu',
    content:
      'Rekomendasi build Greymon di early game fokus naikin DEF dulu aja guys, biar pas raid ga gampang mati konyol.',
    replies: 4,
  },
  {
    id: 2,
    tamer: 'Yamato_Cool',
    date: '2 Jam yang lalu',
    content:
      'Ada yang tahu cara dapet Holy Egg dengan cepat selain nunggu login harian? Rate gacha-nya ampun deh.',
    replies: 12,
  },
])

const addPost = () => {
  if (!newTamer.value || !newOpinion.value) return alert('Isi nama dan pendapatmu dulu ya!')
  posts.value.unshift({
    id: Date.now(),
    tamer: newTamer.value,
    date: 'Baru saja',
    content: newOpinion.value,
    replies: 0,
  })
  newTamer.value = ''
  newOpinion.value = ''
}
</script>
