<script setup lang="ts">
defineProps<{ 
  title: string,
  message: string 
}>();
</script>

<template>
  <main class="flex-none flex flex-col items-center pt-[15vh] pb-5 gap-4">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4 font-mono">{{ title }}</h1>
      <p class="text-[#8b8b8b] text-lg mb-6">{{ message }}</p>
      <a
        href="/"
        class="font-mono text-[#8b8b8b] hover:text-white transition-colors text-lg cursor-pointer"
      >
        &gt; cd ~
      </a>
    </div>
  </main>
</template>
