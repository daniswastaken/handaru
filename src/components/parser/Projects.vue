<script setup lang="ts">
import BedrockPerfected from "../icons/BedrockPerfected.vue";
import Grafika from "../icons/Grafika.vue";
import InfiniteChemistry from "../icons/InfiniteChemistry.vue";
import Prefect from "../icons/Prefect.vue";

defineProps<{ projects: Record<string, any[]> }>();

function slug(name: string) {
    return name.toLowerCase().replace(/[\s\\/]+/g, "-");
}
</script>

<template>
    <div class="max-w-250 mx-auto">
        <p text-center mt--6 mb5 op50 text-lg>
            Creator, contributor, or maintainer.
        </p>
        <div class="pb5 mx-auto mt10 text-center">
            <div flex="~ gap-2 justify-center">
                <a
                    href="https://github.com/daniswastaken"
                    target="_blank"
                    class="group btn-blue"
                >
                    <div i-ph-github-logo group-hover="text-blue" />
                    GitHub
                </a>
                <a
                    href="https://www.curseforge.com/members/daniswastaken/projects"
                    target="_blank"
                    class="group btn-orange"
                >
                    <div i-simple-icons-curseforge group-hover="text-orange" />
                    CurseForge
                </a>
            </div>
            <hr class="w-50px mx-auto my-8 border-t border-0 border-hex-888 op30" />
        </div>
        <div v-for="key in Object.keys(projects)" :key="key" class="mb-10">
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
                    class="backgroundKey"
                    >{{ key }}</span
                >
                <!-- The normal text on top -->
                <span
                    absolute
                    text-3.5em
                    left--2rem
                    top="1/2"
                    translate-y="-1/2"
                    font-black
                    uppercase
                >
                    {{ key }}
                </span>
            </div>
            <div
                class="project-grid py-2 mb-8 mx-auto w-fit"
                grid="~ cols-1 md:cols-2 lg:cols-3 gap-x-8 gap-y-4"
            >
                <a
                    v-for="(item, idx) in projects[key]"
                    :key="idx"
                    class="item relative flex items-center"
                    :href="item.link"
                    target="_blank"
                    :title="item.name"
                >
                    <div v-if="item.icon" class="pt-2 pr-5">
                        <BedrockPerfected
                            v-if="item.icon === 'BedrockPerfected'"
                            style="width: 2.25rem; height: 2.25rem;"
                            class="opacity-50"
                        />
                        <Grafika
                            v-else-if="item.icon === 'Grafika'"
                            style="width: 2.25rem; height: 2.25rem;"
                            class="opacity-50"
                        />
                        <InfiniteChemistry
                            v-else-if="item.icon === 'InfiniteChemistry'"
                            style="width: 2.25rem; height: 2.25rem;"
                            class="opacity-50"
                        />
                        <Prefect
                            v-else-if="item.icon === 'Prefect'"
                            style="width: 2.25rem; height: 2.25rem;"
                            class="opacity-50"
                        />
                        <div
                            v-else
                            class="text-3xl opacity-50"
                            :class="item.icon || 'i-ph-cube-duotone'"
                        />
                    </div>
                    <div class="flex-auto">
                        <div class="text-normal">{{ item.name }}</div>
                        <div
                            class="desc text-sm font-normal transition-colors"
                            v-html="item.desc"
                        />
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.project-grid a.item {
    background: transparent;
    font-size: 1.1rem;
    width: 350px;
    max-width: 100%;
    padding: 0.5rem 0.875rem 0.875rem;
    border-radius: 3px;
    color: #8a8b8c;
    text-decoration: none;
    transition: all 0.3s ease;
}

.project-grid a.item .desc {
    color: #3d3e3f;
}

.project-grid a.item:hover {
    background: #88888811;
    color: inherit;
}

.project-grid a.item:hover .desc {
    color: #8a8b8c;
}
</style>
