<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ groupedPosts: Record<string | number, any[]> }>();
const isFiltering = ref(false);

function toggleFilter() {
    isFiltering.value = !isFiltering.value;
}

const filteredGroups = computed(() => {
    return props.groupedPosts;
});

function slug(name: string) {
    return name
        .toString()
        .toLowerCase()
        .replace(/[\s\\/]+/g, "-");
}
</script>

<template>
    <div class="max-w-250 mx-auto font-sans">
        <p text-center mt--6 mb5 op50 text-lg>Perspectives I wrote.</p>

        <div class="pb5 mx-auto mt10 text-center">
            <div flex="~ gap-2 justify-center">
                <a
                    class="group btn-yellow transition-all duration-300 cursor-pointer select-none"
                    :class="isFiltering ? 'op100! text-yellow! bg-yellow/10' : ''"
                    @click="toggleFilter"
                >
                    <div :class="isFiltering ? 'i-ph-star-duotone' : 'i-ph-star'" group-hover:i-ph-star-duotone transition-all duration-200 />
                    Recommendations
                </a>
            </div>
            <hr
                class="w-50px mx-auto my-8 border-t border-0 border-hex-888 op30"
            />
        </div>


        <div
            v-for="year in Object.keys(filteredGroups).sort(
                (a, b) => Number(b) - Number(a),
            )"
            :key="year"
            class="mb-10"
        >
            <div
                :id="slug(year)"
                select-none
                relative
                h18
                mt5
                mb-2
                pointer-events-none
            >
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ml--250px flex items-center justify-center">
                    <span
                        text-7em
                        color-transparent
                        font-black
                        leading-1em
                        text-stroke-1.5
                        text-stroke-hex-aaa
                        op20
                        dark:op20
                        uppercase
                        class="backgroundKey"
                    >
                        {{ year }}
                    </span>
                    <span
                        absolute
                        text-3.5em
                        font-black
                        uppercase
                    >
                        {{ year }}
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-1 py-2 mb-8 mx-auto w-fit">
                <a
                    v-for="post in filteredGroups[year]"
                    :key="post.url"
                    :href="post.url"
                    class="item relative flex items-center justify-between no-underline transition-all"
                >
                    <div v-if="isFiltering && post.recommend" i-ph-star-duotone class="absolute left--10 top-1/2 -translate-y-1/2 text-yellow op100" title="Recommended" />
                    <div class="flex-auto">
                        <div class="text-base font-normal">
                            {{ post.title }}
                        </div>
                    </div>
                    <div class="text-sm font-mono op50 ml-4 whitespace-nowrap">
                        {{ post.dateFormatted }} · {{ post.duration }}
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.item {
    background: transparent;
    font-size: 1.1rem;
    width: 500px;
    max-width: 100%;
    padding: 0.5rem 0.875rem;
    border-radius: 3px;
    color: #8a8b8c;
    text-decoration: none;
    transition: all 0.3s ease;
}

.item:hover {
    background: #88888811;
    color: #ccc;
}
</style>
