<script setup lang="ts">
defineProps<{ projects: Record<string, any[]> }>();

function slug(name: string) {
    return name.toLowerCase().replace(/[\s\\/]+/g, "-");
}
</script>

<template>
    <div class="max-w-300 mx-auto">
        <p text-center mt--6 mb5 op50 text-lg>
            Creator, contributor, or maintainer.
        </p>
        <div class="pb5 mx-auto mt10 text-center">
            <div flex="~ gap-2 justify-center">
                <a
                    href="https://github.com/daniswastaken"
                    target="_blank"
                    class="group btn-blue inline-block"
                >
                    <div
                        i-ph-github-logo
                        group-hover="text-blue"
                    />
                    GitHub
                </a>
                <a
                    href="https://www.curseforge.com/members/daniswastaken/projects"
                    target="_blank"
                    class="group btn-orange inline-block"
                >
                    <div
                        i-simple-icons-curseforge
                        group-hover="text-orange"
                    />
                    CurseForge
                </a>
            </div>
            <hr class="mt-8 opacity-20" />
        </div>
        <div
            v-for="(key) in Object.keys(projects)"
            :key="key"
            class="mb-10"
        >
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
                class="project-grid py-2 mb-8 max-w-500 w-max mx-auto"
                grid="~ cols-1 md:cols-2 gap-4 lg:cols-3"
            >
                <a
                    v-for="(item, idx) in projects[key]"
                    :key="idx"
                    class="item relative flex items-center"
                    :href="item.link"
                    target="_blank"
                    :title="item.name"
                >
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
    color: #8A8B8C;
    text-decoration: none;
    transition: all 0.3s ease;
}

.project-grid a.item .desc {
    color: #3D3E3F;
}

.project-grid a.item:hover {
    background: #88888811;
    color: inherit;
}

.project-grid a.item:hover .desc {
    color: #8A8B8C;
}
</style>
