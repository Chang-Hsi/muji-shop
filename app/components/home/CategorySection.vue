<script setup lang="ts">
import type { CSSProperties } from "vue";

interface CategoryItem {
  title: string;
  description: string;
  to: string;
  image: string;
  tag: string;
}

defineProps<{
  categories: CategoryItem[];
}>();

const activeIndex = ref(0);

function setActiveIndex(index: number) {
  activeIndex.value = index;
}

function getCardStyle(index: number): CSSProperties {
  const isActive = activeIndex.value === index;

  return {
    flex: isActive ? "1 1 560px" : "0 0 74px",
  };
}
</script>

<template>
  <section class="mt-16">
    <div class="mb-8 flex items-end justify-between">
      <div>
        <p class="text-sm tracking-[0.3em] text-neutral-400">
          CATEGORY
        </p>

        <h2 class="mt-2 text-2xl font-light text-neutral-900">
          商品分類
        </h2>
      </div>
    </div>

    <div
      class="flex h-100 w-full gap-4 overflow-hidden rounded-4xl"
      @mouseleave="setActiveIndex(0)"
    >
      <NuxtLink
        v-for="(category, index) in categories"
        :key="category.title"
        :to="category.to"
        class="group relative block overflow-hidden rounded-4xl bg-stone-200 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :style="getCardStyle(index)"
        @mouseenter="setActiveIndex(index)"
        @focus="setActiveIndex(index)"
      >
        <img
          :src="category.image"
          :alt="category.title"
          class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          draggable="false"
        >

        <div class="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />

        <div
          class="absolute inset-x-0 bottom-0 z-10 p-6 text-white transition duration-500"
          :class="
            activeIndex === index
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'
          "
        >
          <p class="text-xs tracking-[0.25em] text-white/70">
            {{ category.tag }}
          </p>

          <h3 class="mt-2 text-3xl font-light tracking-wide">
            {{ category.title }}
          </h3>

          <p class="mt-3 max-w-md text-sm leading-6 text-white/75">
            {{ category.description }}
          </p>

          <div class="mt-5 inline-flex items-center gap-2 text-sm tracking-wide text-white">
            查看分類

            <Icon
              name="lucide:arrow-right"
              class="size-4 transition group-hover:translate-x-1"
            />
          </div>
        </div>

        <div
          class="absolute bottom-5 left-1/2 z-20 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-white text-xs font-medium text-neutral-800 shadow transition duration-500"
          :class="
            activeIndex === index
              ? 'scale-0 opacity-0'
              : 'scale-100 opacity-100'
          "
        >
          {{ category.title.slice(0, 1) }}
        </div>

        <div
          class="absolute inset-x-0 bottom-22 z-10 flex justify-center transition duration-500"
          :class="
            activeIndex === index
              ? 'translate-y-4 opacity-0'
              : 'translate-y-0 opacity-100'
          "
        >
          <p class="origin-center -rotate-90 whitespace-nowrap text-xs tracking-[0.25em] text-white/80">
            {{ category.title }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>