<template>
  <section class="py-16 bg-gray-50 min-h-screen text-gray-850">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12 font-['Share_Tech_Mono']">
        <span
          class="text-xs font-['Press_Start_2P'] tracking-[0.2em] text-blue-600 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full uppercase"
        >
          Evolutions Lab
        </span>
        <h2
          class="mt-4 text-3xl md:text-4xl font-['Orbitron'] font-black tracking-tight text-gray-900 uppercase"
        >
          DigiEgg Evolution Matrix
        </h2>
        <p class="text-gray-500 mt-2 text-sm">
          Select a DigiEgg to initialize the evolutionary tree sequence.
        </p>
        <div class="mt-4 h-[2px] w-16 bg-blue-600 mx-auto"></div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 font-['Share_Tech_Mono']">
        <button
          v-for="egg in digiEggs"
          :key="egg.id"
          @click="selectEgg(egg)"
          :class="[
            'bg-white border-2 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm',
            activeEgg?.id === egg.id
              ? 'border-blue-500 shadow-[0_4px_20px_rgba(59,130,246,0.15)] bg-blue-50/30'
              : 'border-gray-200 hover:border-gray-300',
          ]"
        >
          <img
            :src="egg.image"
            :alt="egg.name"
            class="w-24 h-24 object-contain mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 relative z-10"
          />
          <span
            class="text-sm font-bold tracking-widest uppercase relative z-10 group-hover:text-blue-600 transition-colors text-gray-800"
          >
            {{ egg.name }}
          </span>
        </button>
      </div>

      <transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="transform translate-y-8 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
      >
        <div
          v-if="activeEgg"
          class="bg-white border border-gray-200 rounded-3xl p-8 font-['Share_Tech_Mono'] relative shadow-sm"
        >
          <div class="absolute top-4 left-6 text-xs tracking-widest text-gray-400 uppercase">
            MAPPED SECTOR // {{ activeEgg.name }}
          </div>

          <div class="flex flex-col lg:flex-row items-center justify-around gap-12 pt-6 relative">
            <div class="flex flex-col items-center min-w-[120px]">
              <div
                class="text-[10px] text-blue-600 font-bold uppercase tracking-widest mb-3 bg-blue-50 px-2.5 py-1 rounded border border-blue-200/50"
              >
                STAGE 00
              </div>
              <div
                class="w-20 h-20 bg-gray-50 border border-gray-200 rounded-2xl p-3 flex items-center justify-center shadow-inner"
              >
                <img :src="activeEgg.image" class="w-full h-full object-contain opacity-60" />
              </div>
              <p class="text-xs text-gray-500 mt-2 uppercase text-center font-bold">
                {{ activeEgg.name }}
              </p>
            </div>

            <div class="hidden lg:block text-gray-300 text-xl font-bold">➔</div>

            <div class="flex flex-col items-center min-w-[140px]">
              <div
                class="text-[10px] text-amber-600 font-bold uppercase tracking-widest mb-3 bg-amber-50 px-2.5 py-1 rounded border border-amber-200/50"
              >
                BABY I (FRESH)
              </div>
              <button
                @click="openRequirement(activeEgg.tree.babyI)"
                class="w-24 h-24 bg-gray-50 border border-gray-200 hover:border-blue-500 rounded-2xl p-3 flex items-center justify-center transition-all group shadow-sm"
              >
                <img
                  :src="activeEgg.tree.babyI.image"
                  class="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </button>
              <p class="text-sm font-bold mt-2 text-gray-800 uppercase tracking-wide text-center">
                {{ activeEgg.tree.babyI.name }}
              </p>
            </div>

            <div class="hidden lg:block text-gray-300 text-xl font-bold">➔</div>

            <div class="flex flex-col items-center min-w-[140px]">
              <div
                class="text-[10px] text-purple-600 font-bold uppercase tracking-widest mb-3 bg-purple-50 px-2.5 py-1 rounded border border-purple-200/50"
              >
                BABY II (IN-TRAINING)
              </div>
              <button
                @click="openRequirement(activeEgg.tree.babyII)"
                class="w-24 h-24 bg-gray-50 border border-gray-200 hover:border-blue-500 rounded-2xl p-3 flex items-center justify-center transition-all group shadow-sm"
              >
                <img
                  :src="activeEgg.tree.babyII.image"
                  class="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </button>
              <p class="text-sm font-bold mt-2 text-gray-800 uppercase tracking-wide text-center">
                {{ activeEgg.tree.babyII.name }}
              </p>
            </div>

            <div class="hidden lg:block text-gray-300 text-xl font-bold">➔</div>

            <div class="flex flex-col gap-6 min-w-[180px]">
              <div
                class="text-[10px] text-emerald-600 font-bold uppercase tracking-widest text-center bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/50 mb-1"
              >
                ROOKIE BRANCHES
              </div>

              <div
                v-for="rookie in activeEgg.tree.rookies"
                :key="rookie.name"
                class="flex items-center gap-3 bg-gray-50 border border-gray-200 hover:border-blue-500 rounded-xl p-2.5 transition-all cursor-pointer group shadow-sm"
                @click="openRequirement(rookie)"
              >
                <div
                  class="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center border border-gray-200"
                >
                  <img :src="rookie.image" class="w-full h-full object-contain" />
                </div>
                <div>
                  <h4
                    class="text-xs font-bold uppercase tracking-wider text-gray-800 group-hover:text-blue-600 transition-colors"
                  >
                    {{ rookie.name }}
                  </h4>
                  <p class="text-[10px] text-gray-400 uppercase">Click for specs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="selectedDigimon"
          class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/40 backdrop-blur-sm font-['Share_Tech_Mono']"
        >
          <div
            class="bg-white border border-gray-200 rounded-2xl max-w-md w-full overflow-hidden shadow-xl"
          >
            <div
              class="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between"
            >
              <span class="text-xs font-bold text-blue-600 tracking-widest uppercase"
                >EVOLUTION REQUIREMENT DATA</span
              >
              <button
                @click="selectedDigimon = null"
                class="text-gray-400 hover:text-gray-600 transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            <div class="p-6 flex flex-col items-center">
              <div
                class="w-28 h-28 bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-center mb-4 shadow-inner"
              >
                <img
                  :src="selectedDigimon.image"
                  :alt="selectedDigimon.name"
                  class="max-w-full max-h-full object-contain"
                />
              </div>

              <h3 class="text-xl font-bold tracking-wider uppercase text-gray-900 mb-1">
                {{ selectedDigimon.name }}
              </h3>
              <span
                class="text-xs px-3 py-0.5 border border-blue-200 bg-blue-50 text-blue-600 rounded uppercase tracking-widest font-bold mb-6"
              >
                {{ selectedDigimon.stage }}
              </span>

              <div class="w-full space-y-3.5 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div
                  v-for="(val, key) in selectedDigimon.reqs"
                  :key="key"
                  class="flex justify-between items-center border-b border-gray-200/60 pb-2 last:border-0 last:pb-0"
                >
                  <span class="text-xs text-gray-500 uppercase tracking-widest">{{
                    key.replace('_', ' ')
                  }}</span>
                  <span class="text-sm font-bold text-blue-600 uppercase tracking-wider">{{
                    val
                  }}</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                @click="selectedDigimon = null"
                class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-widest transition-colors shadow-sm"
              >
                Close Core
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

import eggBlue from '@/assets/img/Digimon Eggs Blue.png'
import eggGreen from '@/assets/img/Digimon Eggs Green.png'
import eggRed from '@/assets/img/Digimon Eggs Red.png'
import eggYellow from '@/assets/img/Digimon Eggs Yellow.png'

const activeEgg = ref(null)
const selectedDigimon = ref(null)

const digiEggs = ref([
  {
    id: 'blue',
    name: 'Nature DigiEgg',
    image: eggBlue,
    tree: {
      babyI: {
        name: 'Punimon',
        stage: 'Baby I (Fresh)',
        image: 'https://digi-api.com/images/digimon/w/Punimon.png',
        reqs: { min_level: 'Lv. 1', care_mistakes: '0-1 Time', training_points: '8+ Points' },
      },
      babyII: {
        name: 'Tsunomon',
        stage: 'Baby II (In-Training)',
        image: 'https://digi-api.com/images/digimon/w/Tsunomon.png',
        reqs: { min_level: 'Lv. 5', min_speed: '30 SPD', friendship: '75%+' },
      },
      rookies: [
        {
          name: 'Gabumon',
          stage: 'Rookie',
          image: 'https://digi-api.com/images/digimon/w/Gabumon.png',
          reqs: {
            min_level: 'Lv. 10',
            attack_power: '70 ATK',
            win_rate: '55%+',
            friendship: '80%+',
          },
        },
        {
          name: 'Psychemon',
          stage: 'Rookie',
          image: 'https://digi-api.com/images/digimon/w/Psychemon.png',
          reqs: { min_level: 'Lv. 10', mutant_exp: '40+ PTS', care_mistakes: '3+ Times' },
        },
      ],
    },
  },
  {
    id: 'yellow',
    name: 'Holy DigiEgg',
    image: eggYellow,
    tree: {
      babyI: {
        name: 'Botamon',
        stage: 'Baby I (Fresh)',
        image: 'https://digi-api.com/images/digimon/w/Botamon.png',
        reqs: { min_level: 'Lv. 1', care_mistakes: '0-2 Times', training_points: '10+ Points' },
      },
      babyII: {
        name: 'Koromon',
        stage: 'Baby II (In-Training)',
        image: 'https://digi-api.com/images/digimon/w/Koromon.png',
        reqs: { min_level: 'Lv. 5', min_attack: '35 ATK', happiness: '80%+' },
      },
      rookies: [
        {
          name: 'Agumon',
          stage: 'Rookie',
          image: 'https://digi-api.com/images/digimon/w/Agumon.png',
          reqs: {
            min_level: 'Lv. 10',
            attack_power: '75 ATK',
            win_rate: '50%+',
            care_mistakes: 'Under 3',
          },
        },
        {
          name: 'ToyAgumon',
          stage: 'Rookie',
          image: 'https://digi-api.com/images/digimon/w/ToyAgumon.png',
          reqs: {
            min_level: 'Lv. 10',
            defense_power: '65 DEF',
            tech_score: '40+ PTS',
            care_mistakes: '4+ Times',
          },
        },
      ],
    },
  },
  {
    id: 'red',
    name: 'Dragon DigiEgg',
    image: eggRed,
    tree: {
      babyI: {
        name: 'Jyarimon',
        stage: 'Baby I (Fresh)',
        image: 'https://digi-api.com/images/digimon/w/Jyarimon.png',
        reqs: { min_level: 'Lv. 1', training_points: '15+ Points', care_mistakes: '0-1 Time' },
      },
      babyII: {
        name: 'Gigimon',
        stage: 'Baby II (In-Training)',
        image: 'https://digi-api.com/images/digimon/w/Gigimon.png',
        reqs: { min_level: 'Lv. 6', min_attack: '45 ATK', combat_exp: '100+' },
      },
      rookies: [
        {
          name: 'Guilmon',
          stage: 'Rookie',
          image: 'https://digi-api.com/images/digimon/w/Guilmon.png',
          reqs: {
            min_level: 'Lv. 12',
            attack_power: '90 ATK',
            win_rate: '65%+',
            battle_count: '10+',
          },
        },
        {
          name: 'Growlmon (R)',
          stage: 'Rookie',
          image: 'https://digi-api.com/images/digimon/w/Growlmon.png',
          reqs: { min_level: 'Lv. 11', virus_points: '30+ PTS', care_mistakes: '5+ Times' },
        },
      ],
    },
  },
  {
    id: 'green',
    name: 'Forest DigiEgg',
    image: eggGreen,
    tree: {
      babyI: {
        name: 'Yuramon',
        stage: 'Baby I (Fresh)',
        image: 'https://digi-api.com/images/digimon/w/Yuramon.png',
        reqs: { min_level: 'Lv. 1', sleep_schedule: 'Perfect', happiness: '70%+' },
      },
      babyII: {
        name: 'Tanemon',
        stage: 'Baby II (In-Training)',
        image: 'https://digi-api.com/images/digimon/w/Tanemon.png',
        reqs: { min_level: 'Lv. 5', min_speed: '35 SPD', care_mistakes: '0-3 Times' },
      },
      rookies: [
        {
          name: 'Palmon',
          stage: 'Rookie',
          image: 'https://digi-api.com/images/digimon/w/Palmon.png',
          reqs: {
            min_level: 'Lv. 10',
            wisdom_score: '50 WIS',
            nature_exp: '120+',
            win_rate: '40%+',
          },
        },
        {
          name: 'Lalamon',
          stage: 'Rookie',
          image: 'https://digi-api.com/images/digimon/w/Lalamon.png',
          reqs: {
            min_level: 'Lv. 9',
            speed_score: '60 SPD',
            friendship: '85%+',
            care_mistakes: '0-1 Time',
          },
        },
      ],
    },
  },
])

const selectEgg = (egg) => {
  activeEgg.value = egg
  selectedDigimon.value = null
}

const openRequirement = (digimonObj) => {
  selectedDigimon.value = digimonObj
}
</script>
