<template>
  <svg
    v-bind="$attrs"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Background Spiked Frame (Rotated Square) -->
    <rect opacity="0.25" x="14" y="14" width="36" height="36" fill="white" transform="rotate(45 32 32)" />

    <!-- Outer Rim Ring -->
    <circle opacity="0.4" cx="32" cy="32" r="28" stroke="white" stroke-width="1.2" />

    <!-- Main Iris Body -->
    <circle opacity="0.15" cx="32" cy="32" r="22" fill="white" />
    
    <!-- Iris Concentric Rings (Strokes for sharpness) -->
    <circle opacity="0.8" cx="32" cy="32" r="19" stroke="white" stroke-width="3" />
    <circle opacity="0.4" cx="32" cy="32" r="13" stroke="white" stroke-width="1.5" />
    
    <!-- Central Pupil Core -->
    <circle opacity="0.7" cx="32" cy="32" r="8" fill="white" />
    <circle opacity="1" cx="32" cy="32" r="3.5" fill="black" />
    
    <!-- Eye Glint (Sharp highlight) -->
    <circle opacity="1" cx="42" cy="42" r="4.5" fill="white" />
  </svg>
</template>
