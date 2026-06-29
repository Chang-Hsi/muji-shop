<script setup lang="ts">
const categories = [
  {
    title: '生活用品',
    description: '簡潔實用的日常選品',
    to: '/products?category=living'
  },
  {
    title: '服飾',
    description: '自然舒適的基本穿搭',
    to: '/products?category=clothes'
  },
  {
    title: '食品',
    description: '安心樸實的日常滋味',
    to: '/products?category=food'
  }
]

const featuredProducts = [
  {
    id: 1,
    name: '棉質白色襯衫',
    price: 790,
    image: '/images/product-shirt.jpg'
  },
  {
    id: 2,
    name: '木質收納盒',
    price: 490,
    image: '/images/product-box.jpg'
  },
  {
    id: 3,
    name: '亞麻托特包',
    price: 390,
    image: '/images/product-bag.jpg'
  }
]
</script>

<template>
  <div>
    <section class="grid min-h-130 items-center gap-10 md:grid-cols-2">
      <div>
        <p class="text-sm tracking-[0.3em] text-neutral-400">
          SIMPLE LIFE
        </p>

        <h1 class="mt-4 text-4xl font-light leading-tight tracking-wide text-neutral-900 md:text-5xl">
          簡潔生活，
          <br>
          從日常選品開始。
        </h1>

        <p class="mt-6 max-w-lg text-base leading-8 text-neutral-500">
          挑選自然、耐用、沒有過度裝飾的商品，讓生活回到舒服的狀態。
        </p>

        <div class="mt-8">
          <NuxtLink
            to="/products"
            class="inline-flex border border-neutral-800 px-8 py-3 text-sm tracking-wide text-neutral-800 transition hover:bg-neutral-800 hover:text-white"
          >
            查看商品
          </NuxtLink>
        </div>
      </div>

      <div class="aspect-4/3 bg-stone-200">
        <div class="flex h-full items-center justify-center text-sm tracking-[0.2em] text-stone-400">
          HERO IMAGE
        </div>
      </div>
    </section>

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

      <div class="grid gap-4 md:grid-cols-3">
        <NuxtLink
          v-for="category in categories"
          :key="category.title"
          :to="category.to"
          class="border border-stone-200 bg-white p-8 transition hover:border-neutral-800"
        >
          <h3 class="text-lg font-light text-neutral-900">
            {{ category.title }}
          </h3>

          <p class="mt-3 text-sm leading-6 text-neutral-500">
            {{ category.description }}
          </p>
        </NuxtLink>
      </div>
    </section>

    <section class="mt-20">
      <div class="mb-8 flex items-end justify-between">
        <div>
          <p class="text-sm tracking-[0.3em] text-neutral-400">
            FEATURED
          </p>

          <h2 class="mt-2 text-2xl font-light text-neutral-900">
            精選商品
          </h2>
        </div>

        <NuxtLink
          to="/products"
          class="text-sm text-neutral-500 hover:text-neutral-900"
        >
          查看全部
        </NuxtLink>
      </div>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-3">
        <NuxtLink
          v-for="product in featuredProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="group"
        >
          <div class="aspect-square overflow-hidden bg-stone-200">
            <img
              :src="product.image"
              :alt="product.name"
              class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            >
          </div>

          <div class="mt-4">
            <h3 class="text-sm text-neutral-700">
              {{ product.name }}
            </h3>

            <p class="mt-1 text-sm text-neutral-500">
              NT$ {{ product.price }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>