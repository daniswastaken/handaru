<script setup lang="ts">
// NavBar component implemented based on Figma design
</script>

<template>
  <nav class="w-full flex items-center justify-between px-8 pt-4 pb-8 box-border">
    <a href="/" class="text-[#8b8b8b] hover:text-white transition-colors no-underline font-mono">cd ~</a>
    <div class="flex items-center gap-5 font-sans text-base font-500 text-[#8b8b8b]">
      <a href="/projects" class="text-[#8b8b8b] hover:text-white transition-colors no-underline">Projects</a>
      <a href="/blog" class="text-[#8b8b8b] hover:text-white transition-colors no-underline">Blog</a>
      <a href="/paper" class="i-ph-feather text-xl text-[#8b8b8b] hover:text-white transition-colors no-underline" title="Paper" aria-label="Paper"></a>
      <a href="https://github.com/daniswastaken?tab=overview&from=2026-05-01&to=2026-05-02" target="_blank" rel="noopener noreferrer" class="i-ph-github-logo text-xl text-[#8b8b8b] hover:text-white transition-colors no-underline" title="GitHub" aria-label="GitHub"></a>
    </div>
  </nav>
</template>
