<script setup lang="ts">
defineProps<{
    mainTitle: string;
    backgroundTitle: string;
}>();
</script>

<template>
    <div class="mb-10 mt-10">
        <div
            select-none
            relative
            h18
            mt5
            mb-2
            pointer-events-none
        >
            <span
                text-7em
                color-transparent
                absolute
                left--6rem
                top="1/2"
                translate-y="-1/2"
                font-black
                leading-1em
                text-stroke-1.5
                text-stroke-hex-aaa
                op20
                dark:op20
                uppercase
                whitespace-nowrap
                class="backgroundKey"
            >
                {{ backgroundTitle }}
            </span>
            <!-- The normal text on top -->
            <span
                absolute
                text-3.5em
                left--3rem
                top="1/2"
                translate-y="-1/2"
                font-black
                uppercase
                whitespace-nowrap
            >
                {{ mainTitle }}
            </span>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 768px) {
    /* Mobile Section Title Adjustments */
    .backgroundKey {
        left: -4.5rem !important;
    }
    
    .backgroundKey + span {
        left: 0rem !important;
    }
}
</style>
