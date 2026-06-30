<template>
  <div class="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <article
      v-for="product in products"
      :key="product.id"
      class="group"
    >
      <div class="relative overflow-hidden rounded-3xl bg-stone-100">
        <NuxtLink :to="`/products/${product.slug}`" class="block">
          <img
            :src="product.image"
            :alt="product.name"
            class="aspect-4/5 w-full object-cover transition duration-500 group-hover:scale-105"
          >
        </NuxtLink>

        <div class="absolute left-3 top-3 flex gap-2">
          <span
            v-if="product.isNew"
            class="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-stone-900 shadow-sm backdrop-blur"
          >
            New
          </span>

          <span
            v-if="product.isLimited"
            class="rounded-full bg-stone-900/90 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur"
          >
            Limited
          </span>
        </div>

        <button
          type="button"
          class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-500 shadow-sm backdrop-blur transition hover:text-stone-950"
          aria-label="加入收藏"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <div class="mt-4">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-xs text-stone-400">
              {{ getCategoryLabel(product.category) }}
            </p>

            <NuxtLink
              :to="`/products/${product.slug}`"
              class="mt-1 block truncate text-base font-medium text-stone-950 transition hover:text-stone-600"
            >
              {{ product.name }}
            </NuxtLink>
          </div>

          <p class="shrink-0 text-base font-semibold text-stone-950">
            {{ formatPrice(product.price) }}
          </p>
        </div>

        <p class="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
          {{ product.description }}
        </p>

        <div class="mt-3 flex items-center gap-2">
          <span
            v-for="swatch in product.swatches"
            :key="`${product.id}-${swatch}`"
            class="h-4 w-4 rounded-full border border-stone-200"
            :style="{ backgroundColor: swatch }"
          />
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  material: string;
  color: string;
  image: string;
  swatches: string[];
  topics: string[];
  sales: number;
  isNew: boolean;
  isLimited: boolean;
};

defineProps<{
  products: Product[];
  getCategoryLabel: (value: string) => string;
  formatPrice: (price: number) => string;
}>();
</script>