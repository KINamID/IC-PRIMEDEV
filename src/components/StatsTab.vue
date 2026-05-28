<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="md:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-fit">
      <h3 class="font-bold text-gray-800 mb-3 text-lg">Cari Digimon</h3>
      <div class="relative mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Contoh: Wargreymon..."
          class="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
      </div>

      <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
        <div
          v-for="d in ['Agumon', 'Gabumon', 'Patamon', 'Tailmon']"
          :key="d"
          class="p-2.5 text-sm rounded-lg hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer border border-transparent hover:border-indigo-100 transition-all font-medium text-gray-600"
        >
          🔍 {{ d }}
        </div>
      </div>
    </div>

    <div class="md:col-span-2 space-y-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div class="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4">
          <div
            class="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
          >
            🔥
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-800">Agumon</h2>
            <p
              class="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md inline-block mt-1"
            >
              Vaccine Attribute
            </p>
          </div>
        </div>

        <h4 class="font-bold text-sm text-gray-700 mb-3">📊 Base Stats</h4>
        <div class="space-y-3 mb-6">
          <div>
            <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
              <span>HP (Hit Points)</span>
              <span class="font-bold text-gray-700">450 / 1000</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-emerald-500 h-2 rounded-full" style="width: 45%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
              <span>ATK (Attack)</span>
              <span class="font-bold text-gray-700">650 / 1000</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-rose-500 h-2 rounded-full" style="width: 65%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-medium text-gray-500 mb-1">
              <span>DEF (Defense)</span>
              <span class="font-bold text-gray-700">380 / 1000</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 38%"></div>
            </div>
          </div>
        </div>

        <h4 class="font-bold text-sm text-gray-700 mb-3">⚔️ Signature Moves</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-100">
                <th class="py-2 px-3">Nama Move</th>
                <th class="py-2 px-3">Tipe</th>
                <th class="py-2 px-3">Deskripsi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-gray-600">
              <tr>
                <td class="py-3 px-3 font-bold text-indigo-600">Baby Flame</td>
                <td class="py-3 px-3">
                  <span class="bg-red-50 text-red-600 px-2 py-0.5 rounded">Fire</span>
                </td>
                <td class="py-3 px-3">Menembakkan bola api panas dari mulutnya.</td>
              </tr>
              <tr>
                <td class="py-3 px-3 font-bold text-indigo-600">Surprise Attack</td>
                <td class="py-3 px-3">
                  <span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Combat</span>
                </td>
                <td class="py-3 px-3">Melompat dan menubruk musuh secara tiba-tiba.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const searchQuery = ref('')
</script>
