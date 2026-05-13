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
      <linearGradient id="leg-grad" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="white" stop-opacity="1" />
        <stop offset="100%" stop-color="white" stop-opacity="0.3" />
      </linearGradient>
    </defs>

    <!-- Background drafting arc -->
    <path opacity="0.1" d="M12 56C12 56 20 62 32 62C44 62 52 56 52 56" stroke="white" stroke-width="1.5" stroke-dasharray="2 4" />

    <!-- Top Handle -->
    <rect opacity="0.9" x="30" y="4" width="4" height="8" rx="1" fill="white" />
    <circle opacity="1" cx="32" cy="14" r="4.5" fill="white" />
    <circle opacity="1" cx="32" cy="14" r="1.5" fill="black" />

    <!-- Left Leg (Arched) -->
    <path opacity="0.8" d="M30 14C30 14 18 36 8 56H14C24 36 32 18 32 14H30Z" fill="url(#leg-grad)" />
    <!-- Needle Tip -->
    <path opacity="1" d="M8 56L10 62L12 56H8Z" fill="white" />

    <!-- Right Leg (Arched) -->
    <path opacity="0.6" d="M34 14C34 14 46 36 56 56H50C40 36 32 18 32 14H34Z" fill="url(#leg-grad)" />
    <!-- Pencil Lead Tip -->
    <path opacity="0.9" d="M56 56L53 51H59L56 56Z" fill="white" />

    <!-- Adjustment Bar & Thumb Screw -->
    <rect opacity="0.4" x="22" y="38" width="20" height="1.5" fill="white" />
    <circle opacity="0.9" cx="32" cy="38.75" r="3" fill="white" />
    <circle opacity="1" cx="32" cy="38.75" r="0.8" fill="black" />

    <!-- Details -->
    <path opacity="0.3" d="M32 14L28 24L32 28L36 24L32 14Z" fill="white" />
    <rect opacity="0.5" x="31.75" y="16" width="0.5" height="15" fill="white" />
  </svg>
</template>
