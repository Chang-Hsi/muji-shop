<template>
  <main class="min-h-screen bg-stone-50 text-stone-900">
    <section class="mx-auto py-8">
      <nav class="flex items-center gap-2 text-sm text-stone-500">
        <NuxtLink to="/" class="transition hover:text-stone-900">
          首頁
        </NuxtLink>

        <span>/</span>

        <span class="font-medium text-stone-900">
          Launch
        </span>
      </nav>

      <header class="mt-10 border-b border-stone-200 pb-10">
        <p class="text-sm tracking-[0.3em] text-stone-400">
          PRODUCT LAUNCH
        </p>

        <h1 class="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
          即將上市
        </h1>

        <p class="mt-4 max-w-2xl text-sm leading-7 text-stone-500">
          探索即將登場的生活選品。商品目前尚未開放販售，也不提供預購，歡迎先查看商品細節與上市資訊。
        </p>
      </header>

      <section class="mt-10">
        <div class="space-y-12">
          <NuxtLink
            v-for="product in launchProducts"
            :key="product.id"
            :to="`/launch/${product.slug}`"
            class="group grid grid-cols-1 gap-6 border-b border-stone-200 pb-12 md:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] md:items-center"
          >
            <div class="overflow-hidden bg-stone-100">
              <img
                :src="product.image"
                :alt="product.name"
                class="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105"
              >
            </div>

            <div>
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">
                  即將上市
                </span>

                <span class="text-xs font-medium tracking-[0.18em] text-stone-400">
                  {{ product.releaseDate }}
                </span>
              </div>

              <p class="mt-5 text-sm text-stone-400">
                {{ getCategoryLabel(product.category) }}
              </p>

              <h2 class="mt-2 text-3xl font-semibold tracking-tight text-stone-950 transition group-hover:text-stone-500">
                {{ product.name }}
              </h2>

              <p class="mt-5 max-w-2xl text-sm leading-7 text-stone-500">
                {{ product.description }}
              </p>

              <div class="mt-8 inline-flex items-center gap-2 text-sm font-medium text-stone-950">
                查看商品
                <Icon
                  name="lucide:arrow-right"
                  class="h-4 w-4 transition group-hover:translate-x-1"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
type LaunchProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  releaseDate: string;
  image: string;
  galleryImages: string[];
};

useSeoMeta({
  title: "即將上市",
  description: "查看即將上市的商品與新品預告。",
});

const categoryOptions = [
  {
    label: "文創用品",
    value: "creative",
  },
  {
    label: "生活用品",
    value: "living",
  },
  {
    label: "家具",
    value: "furniture",
  },
  {
    label: "服飾",
    value: "clothes",
  },
  {
    label: "期間限定",
    value: "limited",
  },
];

const launchProducts: LaunchProduct[] = [
  {
    id: 1,
    name: "【日本限定】Beams ✕ nanamica「GORE-TEX」軽量マウンテンコート",
    slug: "beams-nanamica-goretex-coat",
    description:
      "日本原宿旗艦店限定聯名款。採用最新獨家 GORE-TEX 輕量機能面料，專為都市通勤與極簡戶外風格設計。目前僅在日本國內指定門市限量販售，台灣尚未引進。",
    category: "clothes",
    releaseDate: "預計 2026.07.15 上市",
    image: "https://nllys.store-image.jp/img02/wp-content/uploads/2021/11/11104950/w_940/40db50eca854d88ceb93f629cb40e0b11.jpg",
    galleryImages: [
      "https://nllys.store-image.jp/img02/wp-content/uploads/2021/11/17150926/w_940/mods1.jpg",
      "https://nllys.store-image.jp/img02/wp-content/uploads/2021/11/17150957/w_940/mods2.jpg",
    ],
  },
  {
    id: 2,
    name: "Seoul Object「오브제」Retro Wood Desk-Organizer",
    slug: "seoul-object-retro-organizer",
    description:
      "來自韓國聖水洞獨立設計師品牌。復古胡桃木搭配包浩斯風格的幾何分格，專為極簡桌面美學打造。手工限量製作，目前僅支援韓國境內配送，海外無官方直營通路。",
    category: "living",
    releaseDate: "預計 2026.07.22 上市",
    image: "https://i.etsystatic.com/46766389/r/il/945ded/7726341946/il_794xN.7726341946_obql.jpg",
    galleryImages: [
      "https://i.etsystatic.com/46766389/r/il/945ded/7726341946/il_794xN.7726341946_obql.jpg",
      "https://i.etsystatic.com/46766389/r/il/b14a74/7726341938/il_794xN.7726341938_9tts.jpg",
      "https://i.etsystatic.com/46766389/r/il/bc0fde/7726341940/il_794xN.7726341940_hgv6.jpg",
      "https://i.etsystatic.com/46766389/r/il/9e4939/7726341956/il_794xN.7726341956_tq8d.jpg",
    ],
  },
  {
    id: 3,
    name: "Aēsop「The Karst」Matte Ceramic Room Diffuser",
    slug: "aesop-karst-ceramic-diffuser",
    description:
      "澳洲 Aēsop 實驗室最新研發的霧面陶瓷室內香氛擴香器，靈感來自地中海沿岸岩石。採用極致工藝低飽和陶土製成，目前僅在巴黎與墨爾本概念店首發，亞洲尚未公布上市排程。",
    category: "limited",
    releaseDate: "預計 2026.08.01 上市",
    image: "https://i.etsystatic.com/16261468/r/il/9705de/8056504211/il_794xN.8056504211_3b4z.jpg",
    galleryImages: [
      "https://i.etsystatic.com/16261468/r/il/9705de/8056504211/il_794xN.8056504211_3b4z.jpg",
      "https://i.etsystatic.com/16261468/r/il/d82147/7951780328/il_794xN.7951780328_i0lm.jpg",
      "https://i.etsystatic.com/16261468/r/il/6b4dce/7999739423/il_794xN.7999739423_6t0t.jpg",
    ],
  },
  {
    id: 4,
    name: "【北歐限定】Midori 北欧の森 Weekly Planner (2027)",
    slug: "midori-nordic-forest-planner",
    description:
      "日本傳奇文具品牌與哥本哈根設計工作室的跨國巨獻。使用北歐森林認證再生紙與特製裸背線裝，封面印有專屬限定流水編號。僅在北歐特約書店販售，台灣文具迷渴望的夢幻逸品。",
    category: "creative",
    releaseDate: "預計 2026.08.08 上市",
    image: "https://i.pinimg.com/1200x/e7/77/02/e77702967d829681c43bc3fa76fcbe5c.jpg",
    galleryImages: [
      "https://i.pinimg.com/1200x/e7/77/02/e77702967d829681c43bc3fa76fcbe5c.jpg",
      "https://i.pinimg.com/1200x/ab/4b/f1/ab4bf17f346d68bc92aed1500110376d.jpg",
      "https://i.pinimg.com/1200x/cc/e7/b3/cce7b35efbc0d7a1500a596b0b780d10.jpg",
    ],
  },
];

function getCategoryLabel(value: string) {
  return categoryOptions.find((option) => option.value === value)?.label ?? value;
}
</script>