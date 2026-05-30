<template>
  <MainContent />
  <AboutSection />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import MainContent from '../components/Hero.vue'

const bgm = new Audio('/OST.mp3')
bgm.loop = true

const handleGlobalAutoplay = () => {
  bgm
    .play()
    .then(() => {
      removeGlobalListeners()
    })
    .catch((err) => {})
}

const removeGlobalListeners = () => {
  window.removeEventListener('click', handleGlobalAutoplay)
  window.removeEventListener('touchstart', handleGlobalAutoplay)
  window.removeEventListener('scroll', handleGlobalAutoplay)
}

onMounted(() => {
  bgm.play().catch(() => {
    window.addEventListener('click', handleGlobalAutoplay)
    window.addEventListener('touchstart', handleGlobalAutoplay)
    window.addEventListener('scroll', handleGlobalAutoplay)
  })
})

onUnmounted(() => {
  bgm.pause()
  bgm.currentTime = 0
  removeGlobalListeners()
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
