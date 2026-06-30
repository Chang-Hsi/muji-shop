<template>
  <div class="mt-6 space-y-4">
    <article
      v-for="product in products"
      :key="product.id"
      class="group pb-2 transition hover:shadow-md"
    >
      <div class="flex gap-4">
        <NuxtLink :to="`/products/${product.slug}`" class="block shrink-0 overflow-hidden rounded-2xl bg-stone-100">
          <img
            :src="product.image"
            :alt="product.name"
            class="h-32 w-28 object-cover transition duration-500 group-hover:scale-105 sm:h-40 sm:w-36"
          >
        </NuxtLink>

        <div class="min-w-0 flex-1">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="text-xs text-stone-400">
                {{ getCategoryLabel(product.category) }}
              </p>

              <NuxtLink
                :to="`/products/${product.slug}`"
                class="mt-1 block text-lg font-medium text-stone-950 transition hover:text-stone-600"
              >
                {{ product.name }}
              </NuxtLink>
            </div>

            <p class="text-lg font-semibold text-stone-950">
              {{ formatPrice(product.price) }}
            </p>
          </div>

          <p class="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
            {{ product.description }}
          </p>

          <div class="mt-4 flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500">
              {{ getMaterialLabel(product.material) }}
            </span>

            <span
              v-for="topic in product.topics"
              :key="`${product.id}-${topic}`"
              class="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500"
            >
              {{ getTopicLabel(topic) }}
            </span>
          </div>
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
  getMaterialLabel: (value: string) => string;
  getTopicLabel: (value: string) => string;
  formatPrice: (price: number) => string;
}>();
</script>