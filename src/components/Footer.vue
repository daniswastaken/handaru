<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="w-full mt-32 mb-10 flex justify-center text-[#8b8b8b] text-sm font-sans">
    <div class="flex flex-col items-center gap-4">
      <div class="flex items-center gap-6 text-xl">
        <a href="https://twitter.com/daniswastaken" target="_blank" rel="noopener noreferrer" class="i-ph-twitter-logo hover:text-white transition-colors" title="Twitter" aria-label="Twitter"></a>
        <a href="mailto:hi@handaru.dev" target="_blank" rel="noopener noreferrer" class="i-ph-envelope-simple hover:text-white transition-colors" title="Email" aria-label="Email"></a>
        <a href="https://discord.com/users/1114776568854749296" target="_blank" rel="noopener noreferrer" class="i-ph-discord-logo hover:text-white transition-colors" title="Discord" aria-label="Discord"></a>
      </div>
      <div class="opacity-75 flex items-center gap-2">
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors no-underline text-[#8b8b8b]">CC BY-NC-SA 4.0</a>
        <span>0000-{{ currentYear }} © Handaru</span>
      </div>
    </div>
  </footer>
</template>
