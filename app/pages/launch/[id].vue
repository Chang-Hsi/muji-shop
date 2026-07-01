<template>
  <main class="min-h-screen bg-stone-50 text-stone-900">
    <section class="mx-auto py-8">
      <nav class="flex items-center gap-2 text-sm text-stone-500">
        <NuxtLink to="/" class="transition hover:text-stone-900">
          首頁
        </NuxtLink>

        <span>/</span>

        <NuxtLink to="/launch" class="transition hover:text-stone-900">
          Launch
        </NuxtLink>

        <template v-if="product">
          <span>/</span>

          <span class="font-medium text-stone-900">
            {{ product.name }}
          </span>
        </template>
      </nav>

      <div
        v-if="product"
        class="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]"
      >
        <section>
          <div class="overflow-hidden bg-stone-100">
            <img
              :src="selectedImage"
              :alt="product.name"
              class="aspect-4/5 w-full object-cover"
            >
          </div>

          <div class="mt-4 grid grid-cols-3 gap-3">
            <button
              v-for="image in product.galleryImages"
              :key="image"
              type="button"
              class="overflow-hidden border bg-stone-100 transition"
              :class="
                selectedImage === image
                  ? 'border-stone-900'
                  : 'border-transparent hover:border-stone-300'
              "
              @click="selectedImage = image"
            >
              <img
                :src="image"
                :alt="product.name"
                class="aspect-square w-full object-cover"
              >
            </button>
          </div>
        </section>

        <section class="lg:pt-2">
          <p class="text-sm text-stone-400">
            {{ getCategoryLabel(product.category) }}
          </p>

          <h1 class="mt-3 text-4xl font-semibold tracking-tight text-stone-950">
            {{ product.name }}
          </h1>

          <div class="mt-5 flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">
              即將上市
            </span>

            <span class="rounded-full bg-white px-3 py-1 text-xs text-stone-500 shadow-sm">
              {{ product.releaseDate }}
            </span>
          </div>

          <p class="mt-8 text-sm leading-8 text-stone-500">
            {{ product.fullDescription }}
          </p>

          <div class="mt-10 border-t border-stone-200 pt-6">
            <p class="text-sm font-medium text-stone-950">
              商品說明
            </p>

            <p class="mt-4 text-sm leading-8 text-stone-500">
              {{ product.description }}
            </p>
          </div>
        </section>
      </div>

      <div
        v-else
        class="mt-8 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center"
      >
        <p class="text-lg font-medium text-stone-950">
          找不到這個 Launch 商品
        </p>

        <p class="mt-2 text-sm text-stone-500">
          商品可能已下架，或網址不正確。
        </p>

        <NuxtLink
          to="/launch"
          class="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          回 Launch 列表
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type LaunchProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: string;
  releaseDate: string;
  image: string;
  galleryImages: string[];
};

const route = useRoute();

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
    fullDescription:
      "Beams 與 nanamica 聯名推出的「GORE-TEX」軽量マウンテンコート，以日本原宿旗艦店限定形式登場。外層採用輕量機能面料，保留 GORE-TEX 的防風、防潑水與透氣特性，同時降低傳統戶外外套的厚重感。版型介於都市通勤與極簡戶外之間，適合日常穿著、旅行與季節交替時使用。目前僅於日本國內指定門市限量販售，台灣尚未引進。",
    category: "clothes",
    releaseDate: "預計 2026.07.15 上市",
    image:
      "https://nllys.store-image.jp/img02/wp-content/uploads/2021/11/11104950/w_940/40db50eca854d88ceb93f629cb40e0b11.jpg",
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
    fullDescription:
      "Seoul Object「오브제」Retro Wood Desk-Organizer 來自韓國聖水洞獨立設計師品牌，以復古胡桃木色調與包浩斯風格的幾何分格為設計核心。收納盒可用於整理文具、卡片、便條紙、鑰匙與桌面小物，讓工作區域維持乾淨秩序。每件作品皆以小批量手工製作，目前僅支援韓國境內配送，海外尚無官方直營通路。",
    category: "living",
    releaseDate: "預計 2026.07.22 上市",
    image:
      "https://i.etsystatic.com/46766389/r/il/945ded/7726341946/il_794xN.7726341946_obql.jpg",
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
    fullDescription:
      "Aēsop「The Karst」Matte Ceramic Room Diffuser 是以地中海沿岸岩石地貌為靈感的室內香氛擴香器。外觀採低飽和霧面陶瓷材質，表面質感沉穩細緻，能自然融入臥室、書房、玄關與客廳空間。此款商品目前以巴黎與墨爾本概念店首發為主，亞洲尚未公布正式上市排程，屬於極具收藏感的限定香氛器物。",
    category: "limited",
    releaseDate: "預計 2026.08.01 上市",
    image:
      "https://i.etsystatic.com/16261468/r/il/9705de/8056504211/il_794xN.8056504211_3b4z.jpg",
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
    fullDescription:
      "【北歐限定】Midori 北欧の森 Weekly Planner (2027) 是日本文具品牌 Midori 與哥本哈根設計工作室合作推出的限定週計畫本。內頁使用北歐森林認證再生紙，搭配特製裸背線裝設計，書寫時能自然攤平。封面印有專屬限定流水編號，帶有收藏品般的稀有感。目前僅於北歐特約書店販售，是台灣文具迷關注度很高的夢幻逸品。",
    category: "creative",
    releaseDate: "預計 2026.08.08 上市",
    image:
      "https://i.pinimg.com/1200x/e7/77/02/e77702967d829681c43bc3fa76fcbe5c.jpg",
    galleryImages: [
      "https://i.pinimg.com/1200x/e7/77/02/e77702967d829681c43bc3fa76fcbe5c.jpg",
      "https://i.pinimg.com/1200x/ab/4b/f1/ab4bf17f346d68bc92aed1500110376d.jpg",
      "https://i.pinimg.com/1200x/cc/e7/b3/cce7b35efbc0d7a1500a596b0b780d10.jpg",
    ],
  },
];
const currentId = computed(() => getRouteParamString(route.params.id));

const product = computed(() => {
  return (
    launchProducts.find((item) => {
      return item.slug === currentId.value || String(item.id) === currentId.value;
    }) ?? null
  );
});

const selectedImage = ref("");

watch(
  product,
  (nextProduct) => {
    selectedImage.value = nextProduct?.galleryImages[0] ?? nextProduct?.image ?? "";

    useSeoMeta({
      title: nextProduct ? nextProduct.name : "找不到 Launch 商品",
      description:
        nextProduct?.description ?? "Launch 商品可能已下架，或網址不正確。",
    });
  },
  {
    immediate: true,
  },
);

function getRouteParamString(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function getCategoryLabel(value: string) {
  return categoryOptions.find((option) => option.value === value)?.label ?? value;
}
</script>