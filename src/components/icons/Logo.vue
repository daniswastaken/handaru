<template>
  <svg
    v-bind="$attrs"
    width="48"
    height="28"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <!-- H: left V-shape -->
    <path d="M23 11L14.75 32M6.5 53L14.75 32" />

    <!-- H: right V-shape -->
    <path d="M39.5 11L31.25 32M23 53L31.25 32" />

    <!-- H: crossbar connecting both V apexes -->
    <path d="M14.75 32H31.25" />

    <!-- Crossbar extending left -->
    <path d="M14.75 32H3" />

    <!-- Crossbar extending right (wide) -->
    <path d="M31.25 32H60.5" />

    <!-- 'a' bracket below: left stem -->
    <path d="M29.5 53L32.75 45" />

    <!-- 'a' bracket below: right stem -->
    <path d="M46 53L49.25 45" />

    <!-- 'a' bracket below: top bar -->
    <path d="M32.75 45L36 37H52.5L49.25 45" />

    <!-- 'a' bracket below: bottom bar -->
    <path d="M32.75 45H49.25" />
  </svg>
</template>
