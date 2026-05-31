<template>
  <section class="py-16 bg-gray-50 min-h-screen text-gray-700 font-['Share_Tech_Mono']">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <span
          class="text-xs font-['Press_Start_2P'] tracking-[0.2em] text-blue-600 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full uppercase"
        >
          Tamer Network
        </span>
        <h2
          class="mt-4 text-3xl md:text-4xl font-['Space Grotesk'] font-black tracking-tight text-gray-900 uppercase"
        >
          Community Forum
        </h2>
        <p class="text-gray-500 mt-2 text-sm font-['Plus Jakarta Sans'] tracking-wide">
          Exchange intel, strategy guides, and coordinate real-time digital operations.
        </p>
        <div class="mt-3 h-[2px] w-16 bg-blue-600 mx-auto"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-4 space-y-6">
          <div
            class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm font-['Space Mono']"
          >
            <h3
              class="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2"
            >
              Channel Sectors
            </h3>
            <div class="flex flex-col gap-2">
              <button
                @click="selectedCategory = 'All'"
                :class="[
                  'w-full text-left px-4 py-2.5 rounded-xl transition-all border uppercase text-xs font-bold tracking-wider',
                  selectedCategory === 'All'
                    ? 'bg-blue-50 text-blue-600 border-blue-200'
                    : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-900',
                ]"
              >
                All Transmissions
              </button>
              <button
                v-for="cat in categories"
                :key="cat.name"
                @click="selectedCategory = cat.name"
                :class="[
                  'w-full text-left px-4 py-2.5 rounded-xl transition-all border uppercase text-xs font-bold tracking-wider flex justify-between items-center',
                  selectedCategory === cat.name
                    ? 'bg-blue-50 text-blue-600 border-blue-200'
                    : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-900',
                ]"
              >
                <span>{{ cat.icon }} {{ cat.name }}</span>
                <span
                  class="text-[10px] bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full"
                  >{{ getCategoryCount(cat.name) }}</span
                >
              </button>
            </div>
          </div>

          <div
            class="bg-white border border-gray-200 rounded-2xl p-5 text-xs text-gray-500 space-y-3 shadow-sm font-['Space Mono']"
          >
            <h3
              class="text-sm font-bold text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-2"
            >
              Terminal Status
            </h3>
            <div class="flex justify-between">
              <span>Online Tamers:</span
              ><span class="text-emerald-600 font-bold">1,402 Active</span>
            </div>
            <div class="flex justify-between">
              <span>Database Sync:</span><span class="text-blue-600">100% Operational</span>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8 space-y-6">
          <form
            @submit.prevent="createPost"
            class="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm"
          >
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              <h3 class="text-xs font-bold uppercase tracking-widest text-gray-600">
                Broadcast New Intelligence
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
              <input
                v-model="newPost.title"
                type="text"
                placeholder="Topic Title / Heading..."
                required
                class="md:col-span-8 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none rounded-xl px-4 py-2.5 text-sm text-gray-900 transition-all"
              />
              <select
                v-model="newPost.category"
                class="md:col-span-4 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none rounded-xl px-3 py-2.5 text-sm text-gray-600 cursor-pointer"
              >
                <option v-for="cat in categories" :key="cat.name" :value="cat.name">
                  {{ cat.icon }} {{ cat.name }}
                </option>
              </select>
            </div>

            <textarea
              v-model="newPost.content"
              rows="3"
              placeholder="Share details, coordinates, or evolutionary secrets..."
              required
              class="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none rounded-xl p-4 text-sm text-gray-900 resize-none transition-all"
            ></textarea>

            <div class="flex justify-between items-center">
              <input
                v-model="newPost.author"
                type="text"
                placeholder="Tamer Name"
                required
                class="bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none rounded-xl px-4 py-2 text-xs text-gray-900 max-w-[180px]"
              />
              <button
                type="submit"
                class="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors shadow-sm border border-blue-500"
              >
                Transmit
              </button>
            </div>
          </form>

          <div class="space-y-4">
            <div
              v-if="filteredPosts.length === 0"
              class="text-center py-12 bg-white border border-gray-200 rounded-2xl shadow-sm"
            >
              <p class="text-gray-400 uppercase tracking-wider">
                No transmissions detected in this sector.
              </p>
            </div>

            <div
              v-for="post in filteredPosts"
              :key="post.id"
              class="bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-5 transition-all space-y-4 shadow-sm"
            >
              <div class="flex items-center justify-between text-xs border-b border-gray-100 pb-3">
                <div class="flex items-center gap-3">
                  <span class="font-bold text-blue-600 uppercase tracking-wide">
                    {{ post.author }}</span
                  >
                  <span class="text-gray-300">•</span>
                  <span class="text-gray-400">{{ post.timestamp }}</span>
                </div>
                <span
                  class="px-2.5 py-0.5 rounded-md bg-gray-50 border border-gray-200 text-gray-600 font-bold text-[10px] uppercase tracking-wider"
                >
                  {{ post.category }}
                </span>
              </div>

              <div>
                <h4 class="text-base font-bold text-gray-900 uppercase tracking-wide mb-1.5">
                  {{ post.title }}
                </h4>
                <p class="text-sm text-gray-600 leading-relaxed font-sans">{{ post.content }}</p>
              </div>

              <div class="flex items-center gap-6 text-xs text-gray-400 pt-1">
                <button
                  @click="likePost(post)"
                  class="flex items-center gap-1.5 hover:text-rose-500 transition-colors group"
                >
                  <span></span>
                  <span class="font-bold text-gray-500 group-hover:text-rose-500"
                    >{{ post.likes }} Like</span
                  >
                </button>
                <button
                  @click="post.showComments = !post.showComments"
                  class="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <span></span>
                  <span class="font-bold text-gray-500 hover:text-blue-600"
                    >{{ post.comments.length }} Comment</span
                  >
                </button>
              </div>

              <div
                v-if="post.showComments"
                class="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4"
              >
                <div
                  v-if="post.comments.length > 0"
                  class="space-y-3 max-h-48 overflow-y-auto pr-2"
                >
                  <div
                    v-for="(comment, index) in post.comments"
                    :key="index"
                    class="text-xs bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div
                      class="flex justify-between font-bold text-blue-600 mb-1 uppercase text-[10px]"
                    >
                      <span> {{ comment.user }}</span>
                      <span class="text-gray-400 font-normal">{{ comment.time }}</span>
                    </div>
                    <p class="text-gray-600 font-sans leading-relaxed">{{ comment.text }}</p>
                  </div>
                </div>

                <div class="flex gap-2 pt-2 border-t border-gray-200">
                  <input
                    v-model="post.newCommentUser"
                    type="text"
                    placeholder="Sign"
                    class="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-900 max-w-[80px] focus:outline-none focus:border-blue-500"
                  />
                  <input
                    v-model="post.newCommentText"
                    type="text"
                    placeholder="Type reply..."
                    @keyup.enter="addComment(post)"
                    class="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    @click="addComment(post)"
                    class="px-3 bg-gray-200 hover:bg-blue-600 hover:text-white border border-gray-300 text-[11px] font-bold rounded-lg uppercase tracking-wider transition-all"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('All')

const categories = ref([
  { name: 'Guides', icon: '' },
  { name: 'Events', icon: '' },
  { name: 'Secrets', icon: '' },
  { name: 'Stories', icon: '' },
])

const newPost = ref({
  title: '',
  category: 'Guides',
  content: '',
  author: '',
})

const posts = ref([
  {
    id: 1,
    author: 'Tamer_Taichi01',
    title: 'Secret Agumon Evolution Trigger found in File Island!',
    category: 'Guides',
    content:
      'Guys, jika kalian melatih Agumon di area vulkanik selama 3 siklus berturut-turut tanpa mengalami Care Mistakes, rasio mutasi untuk memicu evolusi rahasia menuju Greymon Blue meningkat drastis hingga 85%! Pastikan status ATK sudah menyentuh angka minimal 75 sebelum siklus berakhir.',
    timestamp: '2 mins ago',
    likes: 24,
    showComments: true,
    newCommentUser: '',
    newCommentText: '',
    comments: [
      {
        user: 'Yamato_99',
        text: 'Info tervalid! Barusan saya coba di server regional timur dan berhasil memicu jalurnya.',
        time: 'Just now',
      },
      {
        user: 'Koushiro_Iz',
        text: 'Apakah ini juga berlaku jika kita menggunakan item chip modifier?',
        time: '1 min ago',
      },
    ],
  },
  {
    id: 2,
    author: 'Sora_Bird',
    title: 'Worldwide Raid Boss Event: Machinedramon Spawn Notice',
    category: 'Events',
    content:
      'Pemberitahuan darurat untuk semua sektor aliansi! Machinedramon level Mega dikonfirmasi akan muncul di koordinat Server Gurun besok jam 19.00 WIB. Disarankan membawa tipe Vaccine dengan pertahanan tinggi karena serangannya bertipe data Virus yang masif.',
    timestamp: '1 hour ago',
    likes: 56,
    showComments: false,
    newCommentUser: '',
    newCommentText: '',
    comments: [],
  },
])

const getCategoryCount = (catName) => {
  return posts.value.filter((p) => p.category === catName).length
}

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'All') return posts.value
  return posts.value.filter((p) => p.category === selectedCategory.value)
})

const createPost = () => {
  posts.value.unshift({
    id: Date.now(),
    author: newPost.value.author,
    title: newPost.value.title,
    category: newPost.value.category,
    content: newPost.value.content,
    timestamp: 'Just now',
    likes: 0,
    showComments: false,
    newCommentUser: '',
    newCommentText: '',
    comments: [],
  })

  newPost.value.title = ''
  newPost.value.content = ''
  newPost.value.author = ''
}

const likePost = (postObj) => {
  postObj.likes++
}

const addComment = (postObj) => {
  if (!postObj.newCommentText.trim() || !postObj.newCommentUser.trim()) return

  postObj.comments.push({
    user: postObj.newCommentUser.trim(),
    text: postObj.newCommentText.trim(),
    time: 'Just now',
  })

  postObj.newCommentUser = ''
  postObj.newCommentText = ''
}
</script>
