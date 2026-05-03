<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ papers: Record<string, any[]> }>();

const searchQuery = ref('');
const activeLang = ref('all');
const sortBy = ref('date'); // 'date' or 'name'

const filteredPapers = computed(() => {
    const result: Record<string, any[]> = {};
    const query = searchQuery.value.toLowerCase();

    for (const key in props.papers) {
        const filtered = props.papers[key].filter(paper => {
            const matchesQuery = paper.name.toLowerCase().includes(query) || paper.desc.toLowerCase().includes(query);
            const matchesLang = activeLang.value === 'all' || paper.lang === activeLang.value;
            return matchesQuery && matchesLang;
        });

        if (filtered.length > 0) {
            filtered.sort((a, b) => {
                if (sortBy.value === 'date') {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                } else {
                    return a.name.localeCompare(b.name);
                }
            });
            result[key] = filtered;
        }
    }

    return result;
});

function slug(name: string) {
    return name.toLowerCase().replace(/[\s\\/]+/g, "-");
}
</script>

<template>
    <div class="max-w-250 mx-auto font-sans">
        <p text-center mt--6 mb5 op50 text-lg>
            Academic writings and research papers.
        </p>

        <div class="pb5 mx-auto mt10 text-center">
            <div class="inline-flex flex-col gap-3 items-stretch">
                <div class="relative w-full op50 hover:op100 focus-within:op100 transition-all duration-300">
                    <div class="absolute left-3 top-1/2 -translate-y-1/2 i-ph-magnifying-glass text-zinc-200" />
                    <input 
                        v-model="searchQuery" 
                        type="text" 
                        placeholder="Search papers..." 
                        class="box-border w-full bg-transparent border border-solid border-base rounded-2px pl-9 pr-4 h-35px font-sans text-sm text-zinc-200 focus:outline-none placeholder-zinc-400"
                    />
                </div>
                <div flex="~ gap-2 justify-center">
                    <a 
                        @click="activeLang = 'all'"
                        class="bg-transparent group btn-emerald transition-all duration-300 cursor-pointer select-none"
                        :class="activeLang === 'all' ? 'op100! text-emerald! bg-emerald/10' : ''"
                    >
                        <div :class="activeLang === 'all' ? 'i-ph-asterisk-duotone' : 'i-ph-asterisk'" group-hover:i-ph-asterisk-duotone transition-all duration-200 /><span>All</span>
                    </a>
                    <a 
                        @click="activeLang = 'en'"
                        class="bg-transparent group btn-blue transition-all duration-300 cursor-pointer select-none"
                        :class="activeLang === 'en' ? 'op100! text-blue! bg-blue/10' : ''"
                    >
                        <div :class="activeLang === 'en' ? 'i-ph-translate-duotone' : 'i-ph-translate'" group-hover:i-ph-translate-duotone transition-all duration-200 /><span>EN</span>
                    </a>
                    <a 
                        @click="activeLang = 'id'"
                        class="bg-transparent group btn-red transition-all duration-300 cursor-pointer select-none"
                        :class="activeLang === 'id' ? 'op100! text-red! bg-red/10' : ''"
                    >
                        <div :class="activeLang === 'id' ? 'i-ph-translate-duotone' : 'i-ph-translate'" group-hover:i-ph-translate-duotone transition-all duration-200 /><span>ID</span>
                    </a>
                    <a 
                        @click="sortBy = sortBy === 'date' ? 'name' : 'date'"
                        class="bg-transparent group btn-zinc w-22 justify-center transition-all duration-300 cursor-pointer select-none"
                    >
                        <div :class="sortBy === 'name' ? 'i-ph-sort-ascending' : 'i-ph-calendar-blank'" /><span>{{ sortBy === 'date' ? 'Recent' : 'A-Z' }}</span>
                    </a>
                </div>
            </div>
            <hr class="w-50px mx-auto my-8 border-t border-0 border-hex-888 op30" />
        </div>

        <div v-if="Object.keys(filteredPapers).length === 0" class="text-center py-10 op50 italic">
            No papers found matching your criteria.
        </div>

        <div v-for="key in Object.keys(filteredPapers)" :key="key" class="mb-10">
            <div
                :id="slug(key)"
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
                    left-0rem
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
                    >{{ key }}</span
                >
                <span
                    absolute
                    text-3.5em
                    left-15
                    top="1/2"
                    translate-y="-1/2"
                    font-black
                    uppercase
                    whitespace-nowrap
                >
                    {{ key }}
                </span>
            </div>

            <div class="flex flex-col items-center md:items-start gap-1 py-2 mb-8 mx-auto w-fit">
                <a
                    v-for="(item, idx) in filteredPapers[key]"
                    :key="idx"
                    class="item relative flex items-center justify-between no-underline transition-all"
                    :href="item.link"
                    target="_blank"
                >
                    <div class="flex-auto">
                        <div class="flex items-center gap-2">
                            <div i-ph-file-pdf-duotone class="text-xl op70" />
                            <div class="text-base font-normal">
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="desc text-sm font-normal mt-1 op50">
                            {{ item.desc }}
                        </div>
                    </div>
                    <div class="text-sm font-mono op50 ml-4 whitespace-nowrap self-start mt-1 tracking-tighter">
                        {{ item.date }}
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
    width: 600px;
    max-width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    color: #8a8b8c;
    text-decoration: none;
    transition: all 0.3s ease;
}

.item:hover {
    background: #88888811;
    color: #ccc;
}

.item:hover .desc {
    color: #8a8b8c;
    opacity: 0.8;
}

@media (max-width: 640px) {
    .item {
        width: 100%;
    }
    
    .item > div:last-child {
        margin-left: 0;
        margin-top: 0.5rem;
    }
}
</style>
