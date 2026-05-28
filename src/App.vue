<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header />

    <div class="flex-grow">
      <MainContent />
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Header from './layouts/Header.vue'
import Footer from './layouts/Footer.vue'
import MainContent from './views/MainContent.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
