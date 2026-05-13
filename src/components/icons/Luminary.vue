<template>
  <svg
    v-bind="$attrs"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sparkle-grad" x1="0" y1="32" x2="64" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="white" stop-opacity="1" />
        <stop offset="100%" stop-color="white" stop-opacity="0.3" />
      </linearGradient>
    </defs>

    <!-- Main AI-style Sparkle Star -->
    <path
      d="M32 4C32 19.464 44.536 32 60 32C44.536 32 32 44.536 32 60C32 44.536 19.464 32 4 32C19.464 32 32 19.464 32 4Z"
      fill="url(#sparkle-grad)"
    />
  </svg>
</template>
