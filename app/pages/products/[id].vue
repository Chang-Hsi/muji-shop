<template>
  <main class="min-h-screen bg-stone-50 text-stone-900">
    <section class="mx-auto py-8">
      <nav class="flex items-center gap-2 text-sm text-stone-500">
        <NuxtLink to="/" class="transition hover:text-stone-900">
          首頁
        </NuxtLink>

        <span>/</span>

        <NuxtLink to="/products" class="transition hover:text-stone-900">
          商品
        </NuxtLink>

        <template v-if="product">
          <span>/</span>

          <NuxtLink
            :to="`/products?category=${product.category}`"
            class="transition hover:text-stone-900"
          >
            {{ getCategoryLabel(product.category) }}
          </NuxtLink>

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
          <div class="overflow-hidden rounded-3xl bg-stone-100">
            <img
              :src="selectedImage"
              :alt="product.name"
              class="aspect-4/5 w-full object-cover"
            >
          </div>

          <div class="mt-4 grid grid-cols-4 gap-3">
            <button
              v-for="image in product.galleryImages"
              :key="image"
              type="button"
              class="overflow-hidden rounded-2xl border bg-stone-100 transition"
              :class="selectedImage === image ? 'border-stone-900' : 'border-transparent hover:border-stone-300'"
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
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm text-stone-400">
                {{ getCategoryLabel(product.category) }}
              </p>

              <h1 class="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
                {{ product.name }}
              </h1>
            </div>

            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-stone-500 shadow-sm transition hover:text-stone-950"
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

          <div class="mt-5 flex flex-wrap items-center gap-2">
            <span
              v-if="product.isNew"
              class="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-900 shadow-sm"
            >
              New
            </span>

            <span
              v-if="product.isLimited"
              class="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white shadow-sm"
            >
              Limited
            </span>

            <span class="rounded-full bg-white px-3 py-1 text-xs text-stone-500 shadow-sm">
              庫存 {{ product.stock }} 件
            </span>
          </div>

          <p class="mt-6 text-2xl font-semibold text-stone-950">
            {{ formatPrice(product.price) }}
          </p>

          <p class="mt-4 text-sm leading-7 text-stone-500">
            {{ product.fullDescription }}
          </p>

          <div class="mt-8 border-t border-stone-200 pt-6">
            <p class="text-sm font-medium text-stone-950">
              顏色
            </p>

            <div class="mt-3 flex items-center gap-3">
              <button
                v-for="swatch in product.swatches"
                :key="swatch.hex"
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-full border transition"
                :class="selectedColor === swatch.hex ? 'border-stone-900' : 'border-stone-200 hover:border-stone-400'"
                :aria-label="swatch.label"
                @click="selectedColor = swatch.hex"
              >
                <span
                  class="h-6 w-6 rounded-full border border-stone-200"
                  :style="{ backgroundColor: swatch.hex }"
                />
              </button>
            </div>

            <p class="mt-2 text-xs text-stone-400">
              {{ selectedColorLabel }}
            </p>
          </div>

          <div class="mt-6">
            <p class="text-sm font-medium text-stone-950">
              數量
            </p>

            <div class="mt-3 inline-flex h-11 items-center rounded-full border border-stone-200 bg-white">
              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center text-stone-500 transition hover:text-stone-950 disabled:cursor-not-allowed disabled:text-stone-300"
                :disabled="quantity <= 1"
                @click="decreaseQuantity"
              >
                －
              </button>

              <span class="w-10 text-center text-sm font-medium text-stone-950">
                {{ quantity }}
              </span>

              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center text-stone-500 transition hover:text-stone-950 disabled:cursor-not-allowed disabled:text-stone-300"
                :disabled="quantity >= product.stock"
                @click="increaseQuantity"
              >
                ＋
              </button>
            </div>
          </div>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              class="h-12 flex-1 rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-300"
              :disabled="product.stock <= 0"
            >
              加入購物車
            </button>

            <button
              type="button"
              class="h-12 flex-1 rounded-full border border-stone-200 bg-white px-6 text-sm font-medium text-stone-950 transition hover:border-stone-300"
            >
              立即購買
            </button>
          </div>

          <div class="mt-8 divide-y divide-stone-200 border-y border-stone-200">
            <details open class="group py-5">
              <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-stone-950">
                商品規格

                <span class="text-stone-400 transition-transform duration-300 group-open:rotate-180">
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </summary>

              <div class="mt-4 space-y-3">
                <div
                  v-for="spec in product.specifications"
                  :key="spec.label"
                  class="flex justify-between gap-6 text-sm"
                >
                  <span class="text-stone-400">
                    {{ spec.label }}
                  </span>

                  <span class="text-right text-stone-700">
                    {{ spec.value }}
                  </span>
                </div>
              </div>
            </details>

            <details class="group py-5">
              <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-stone-950">
                保養方式

                <span class="text-stone-400 transition-transform duration-300 group-open:rotate-180">
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </summary>

              <p class="mt-4 text-sm leading-7 text-stone-500">
                {{ product.careInstructions }}
              </p>
            </details>

            <details class="group py-5">
              <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-stone-950">
                配送與退換貨

                <span class="text-stone-400 transition-transform duration-300 group-open:rotate-180">
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </summary>

              <p class="mt-4 text-sm leading-7 text-stone-500">
                現貨商品約 2-4 個工作天出貨。商品保持全新狀態與完整包裝，可於鑑賞期內申請退換貨。
              </p>
            </details>
          </div>
        </section>
      </div>

      <section v-if="product && relatedProducts.length" class="mt-16">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-sm text-stone-400">
              Related products
            </p>

            <h2 class="mt-1 text-2xl font-semibold tracking-tight text-stone-950">
              你可能也喜歡
            </h2>
          </div>

          <NuxtLink
            to="/products"
            class="text-sm text-stone-500 transition hover:text-stone-950"
          >
            查看全部
          </NuxtLink>
        </div>

        <div class="mt-6 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="item in relatedProducts"
            :key="item.id"
            class="group"
          >
            <div class="relative overflow-hidden rounded-3xl bg-stone-100">
              <NuxtLink :to="`/products/${item.slug}`" class="block">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="aspect-4/5 w-full object-cover transition duration-500 group-hover:scale-105"
                >
              </NuxtLink>

              <div class="absolute left-3 top-3 flex gap-2">
                <span
                  v-if="item.isNew"
                  class="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-stone-900 shadow-sm backdrop-blur"
                >
                  New
                </span>

                <span
                  v-if="item.isLimited"
                  class="rounded-full bg-stone-900/90 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur"
                >
                  Limited
                </span>
              </div>
            </div>

            <div class="mt-4">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-xs text-stone-400">
                    {{ getCategoryLabel(item.category) }}
                  </p>

                  <NuxtLink
                    :to="`/products/${item.slug}`"
                    class="mt-1 block truncate text-base font-medium text-stone-950 transition hover:text-stone-600"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </div>

                <p class="shrink-0 text-base font-semibold text-stone-950">
                  {{ formatPrice(item.price) }}
                </p>
              </div>

              <p class="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
                {{ item.description }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <div
        v-if="!product"
        class="mt-8 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center"
      >
        <p class="text-lg font-medium text-stone-950">
          找不到這個商品
        </p>

        <p class="mt-2 text-sm text-stone-500">
          商品可能已下架，或網址不正確。
        </p>

        <NuxtLink
          to="/products"
          class="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          回商品列表
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getProductDetail, getProducts } from '~/apis/products';

type ProductSwatch = {
  label: string;
  hex: string;
};

type ProductSpecification = {
  label: string;
  value: string;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  price: number;
  category: string;
  material: string;
  color: string;
  image: string;
  galleryImages: string[];
  swatches: ProductSwatch[];
  topics: string[];
  sales: number;
  stock: number;
  isNew: boolean;
  isLimited: boolean;
  specifications: ProductSpecification[];
  careInstructions: string;
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

// TODO: 之後接 API 時，這裡只會依照 route.params.id 或 slug 向後端取得單一商品資料。
// 目前在詳情頁放完整假資料，是為了模擬從商品列表進入不同商品詳情頁時，
// 每一頁都能依照網址取得對應商品內容。
const products: Product[] = [
  {
    id: 1,
    name: "橡木簡約邊桌",
    slug: "oak-side-table",
    description: "適合沙發旁、床邊與閱讀角落的小型邊桌，保留自然木紋與簡潔比例。",
    fullDescription: "橡木簡約邊桌以自然木紋與俐落比例打造，適合放在沙發旁、床邊或閱讀角落。桌面保留溫潤觸感，搭配穩固結構，讓日常使用更自然耐看。",
    price: 2480,
    category: "furniture",
    material: "wood",
    color: "brown",
    image: "https://www.crapo.jp/desk/5134/1.jpg",
    galleryImages: [
      "https://www.crapo.jp/desk/5134/1.jpg",
      "https://www.crapo.jp/desk/5134/3.jpg",
      "https://www.crapo.jp/desk/5134/4.jpg",
      "https://www.crapo.jp/desk/5134/8.jpg",
    ],
    swatches: [
      {
        label: "橡木棕",
        hex: "#8a684a",
      },
      {
        label: "自然米",
        hex: "#d8c7a7",
      },
    ],
    topics: ["bedroom"],
    sales: 92,
    stock: 18,
    isNew: true,
    isLimited: false,
    specifications: [
      {
        label: "尺寸",
        value: "寬 42 × 深 42 × 高 52 cm",
      },
      {
        label: "材質",
        value: "橡木、天然木皮",
      },
      {
        label: "重量",
        value: "約 4.2 kg",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "請以乾布或微濕軟布擦拭，避免長時間日曬、潮濕與高溫環境。若有水漬請盡快擦乾，以維持木質表面狀態。",
  },
  {
    id: 2,
    name: "棉麻收納籃",
    slug: "linen-storage-basket",
    description: "柔軟棉麻材質，適合收納毛巾、衣物與日常小物，維持空間乾淨舒服。",
    fullDescription: "棉麻收納籃使用柔軟棉麻材質，能自然融入臥室、浴室或客廳空間。輕量好搬移，適合收納毛巾、衣物與日常小物。",
    price: 690,
    category: "living",
    material: "linen",
    color: "beige",
    image: "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/000001_1773825688.jpg",
    galleryImages: [
      "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/000001_1773825688.jpg",
      "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/l000001_1773825689.jpg",
      "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/l000002_1773825690.jpg",
      "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/l000004_1773825690.jpg",
    ],
    swatches: [
      {
        label: "米色",
        hex: "#d8c7a7",
      },
      {
        label: "白色",
        hex: "#f8f7f2",
      },
    ],
    topics: ["bedroom", "linen"],
    sales: 135,
    stock: 32,
    isNew: false,
    isLimited: false,
    specifications: [
      {
        label: "尺寸",
        value: "寬 36 × 深 26 × 高 24 cm",
      },
      {
        label: "材質",
        value: "棉、亞麻",
      },
      {
        label: "重量",
        value: "約 0.6 kg",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "可使用乾布輕拍灰塵。若局部髒污，請以中性清潔劑輕擦並自然陰乾，避免烘乾與長時間曝曬。",
  },
  {
    id: 3,
    name: "白瓷早餐盤",
    slug: "white-ceramic-plate",
    description: "霧面白瓷餐盤，適合早餐、甜點與日常餐桌搭配。",
    fullDescription: "白瓷早餐盤以簡潔霧面質感呈現，適合日常早餐、甜點與輕食使用。低調外型能與各式餐桌風格自然搭配。",
    price: 380,
    category: "living",
    material: "ceramic",
    color: "white",
    image: "https://i.pinimg.com/1200x/cf/99/df/cf99df4fd1b7b496eb4cc5002811bb50.jpg",
    galleryImages: [
      "https://i.pinimg.com/1200x/cf/99/df/cf99df4fd1b7b496eb4cc5002811bb50.jpg",
      "https://i.pinimg.com/736x/74/c5/2e/74c52eafe324be1894d27cdc2dcfdfed.jpg",
      "https://i.pinimg.com/736x/ec/98/a4/ec98a478af7b524fc0e49c9e3742028b.jpg",
    ],
    swatches: [
      {
        label: "白色",
        hex: "#f8f7f2",
      },
      {
        label: "灰色",
        hex: "#9ca3af",
      },
    ],
    topics: ["kitchen"],
    sales: 168,
    stock: 48,
    isNew: false,
    isLimited: false,
    specifications: [
      {
        label: "尺寸",
        value: "直徑 22 cm",
      },
      {
        label: "材質",
        value: "陶瓷",
      },
      {
        label: "重量",
        value: "約 420 g",
      },
      {
        label: "產地",
        value: "日本",
      },
    ],
    careInstructions: "可使用中性清潔劑清洗。請避免劇烈溫差與重摔碰撞，以維持陶瓷完整。",
  },
  {
    id: 4,
    name: "自然棉白色襯衫",
    slug: "natural-cotton-shirt",
    description: "寬鬆版型與柔軟棉質，適合日常通勤與週末外出穿搭。",
    fullDescription: "自然棉白色襯衫採用柔軟棉質布料與寬鬆剪裁，穿著感自然舒適。可單穿，也能作為薄外套搭配日常穿著。",
    price: 1280,
    category: "clothes",
    material: "cotton",
    color: "white",
    image: "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/000001_1725860785.jpg",
    galleryImages: [
      "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/000001_1725860785.jpg",
      "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/l000001_1725862310.jpg",
      "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/l000002_1725862310.jpg",
      "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/l000003_1725862311.jpg",
    ],
    swatches: [
      {
        label: "白色",
        hex: "#f8f7f2",
      },
      {
        label: "米色",
        hex: "#d8c7a7",
      },
    ],
    topics: ["outdoor", "linen"],
    sales: 121,
    stock: 24,
    isNew: true,
    isLimited: false,
    specifications: [
      {
        label: "尺寸",
        value: "S / M / L",
      },
      {
        label: "材質",
        value: "100% 棉",
      },
      {
        label: "版型",
        value: "寬鬆版型",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "建議反面放入洗衣袋，以低溫水洗。請避免漂白與高溫烘乾，以維持布料觸感。",
  },
  {
    id: 5,
    name: "水筒 500ml ステンレスボトル",
    slug: "steel-bottle",
    description: "簡潔瓶身與耐用不鏽鋼材質，適合通勤、辦公與旅行攜帶。",
    fullDescription: "不鏽鋼保溫瓶採用耐用不鏽鋼材質，瓶身線條簡潔，適合通勤、辦公、旅行與戶外日常使用。瓶口好飲用也方便清洗，讓外出補水更加自然順手。",
    price: 890,
    category: "living",
    material: "steel",
    color: "gray",
    image: "https://howsie-shop.jp/cdn/shop/files/483990_8.jpg?v=1752541617&width=600",
    galleryImages: [
      "https://howsie-shop.jp/cdn/shop/files/483990_8.jpg?v=1752541617&width=600",
      "https://howsie-shop.jp/cdn/shop/files/483990_12.jpg?v=1752541628&width=600",
      "https://howsie-shop.jp/cdn/shop/files/483990_4.jpg?v=1752541606&width=600",
      "https://howsie-shop.jp/cdn/shop/files/483990_1.jpg?v=1752541597&width=600",
    ],
    swatches: [
      {
        label: "霧灰",
        hex: "#9ca3af",
      },
      {
        label: "黑色",
        hex: "#1f1f1f",
      },
    ],
    topics: ["outdoor"],
    sales: 210,
    stock: 56,
    isNew: false,
    isLimited: false,
    specifications: [
      {
        label: "容量",
        value: "500 ml",
      },
      {
        label: "材質",
        value: "304 不鏽鋼、矽膠",
      },
      {
        label: "保溫效能",
        value: "約 6 小時",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "首次使用前請以中性清潔劑清洗。請勿使用鋼刷或粗糙菜瓜布刷洗瓶身，避免造成表面刮痕。",
  },
  {
    id: 6,
    name: "木質雙層收納架",
    slug: "wood-storage-shelf",
    description: "開放式雙層設計，可放置書籍、餐具、香氛與居家常用小物。",
    fullDescription: "木質雙層收納架採開放式雙層設計，可放置書籍、餐具、香氛與居家常用小物。溫潤木色能自然融入臥室、廚房與客廳，讓空間更有秩序。",
    price: 3200,
    category: "furniture",
    material: "wood",
    color: "brown",
    image: "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_2.jpg",
    galleryImages: [
      "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_2.jpg",
      "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_3.jpg",
      "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_4.jpg",
      "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_9.jpg",
    ],
    swatches: [
      {
        label: "木質棕",
        hex: "#8a684a",
      },
      {
        label: "自然米",
        hex: "#d8c7a7",
      },
    ],
    topics: ["bedroom", "kitchen"],
    sales: 74,
    stock: 14,
    isNew: false,
    isLimited: false,
    specifications: [
      {
        label: "尺寸",
        value: "寬 68 × 深 30 × 高 72 cm",
      },
      {
        label: "材質",
        value: "橡木、天然木皮",
      },
      {
        label: "重量",
        value: "約 8.5 kg",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "請以乾布擦拭，避免長時間潮濕與日曬。若放置餐具或香氛，建議保持表面乾燥。",
  },
  {
    id: 7,
    name: "亞麻托特包",
    slug: "linen-tote-bag",
    description: "輕量亞麻材質與大容量設計，適合採買、通勤與日常外出。",
    fullDescription: "亞麻托特包使用輕量亞麻材質與大容量袋型，適合採買、通勤與日常外出。柔和布面與簡潔外觀，能輕鬆搭配各種日常穿著。",
    price: 790,
    category: "clothes",
    material: "linen",
    color: "beige",
    image: "https://i.etsystatic.com/55220475/r/il/6c2b30/6781864525/il_794xN.6781864525_a1r7.jpg",
    galleryImages: [
      "https://i.etsystatic.com/55220475/r/il/6c2b30/6781864525/il_794xN.6781864525_a1r7.jpg",
      "https://i.etsystatic.com/55220475/r/il/2f25fc/7062091095/il_794xN.7062091095_8i2x.jpg",
      "https://i.etsystatic.com/55220475/r/il/9ff104/6840514578/il_794xN.6840514578_q1y6.jpg",
      "https://i.etsystatic.com/55220475/r/il/f969e5/6872704210/il_794xN.6872704210_l5as.jpg",
    ],
    swatches: [
      {
        label: "米色",
        hex: "#d8c7a7",
      },
      {
        label: "黑色",
        hex: "#1f1f1f",
      },
    ],
    topics: ["outdoor", "linen"],
    sales: 184,
    stock: 41,
    isNew: false,
    isLimited: false,
    specifications: [
      {
        label: "尺寸",
        value: "寬 38 × 高 42 cm",
      },
      {
        label: "材質",
        value: "亞麻、棉",
      },
      {
        label: "容量",
        value: "約 12 L",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "建議局部手洗並自然陰乾。請避免漂白、烘乾與長時間曝曬，以維持亞麻布料質感。",
  },
  {
    id: 8,
    name: "手作紙質筆記本",
    slug: "handmade-paper-notebook",
    description: "溫潤紙感與裸背裝訂，適合書寫、速寫與日常靈感紀錄。",
    fullDescription: "手作紙質筆記本以溫潤紙感與裸背裝訂呈現，攤平書寫更舒適。適合日常筆記、速寫、企劃發想與靈感紀錄。",
    price: 320,
    category: "creative",
    material: "cotton",
    color: "beige",
    image: "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_1.jpg?v=1742940148",
    galleryImages: [
      "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_1.jpg?v=1742940148",
      "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_2.jpg?v=1743460364",
      "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_4.jpg?v=1742940199",
      "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_20.jpg?v=1742940441",
    ],
    swatches: [
      {
        label: "紙本米",
        hex: "#d8c7a7",
      },
      {
        label: "牛皮棕",
        hex: "#8a684a",
      },
    ],
    topics: ["outdoor"],
    sales: 156,
    stock: 73,
    isNew: true,
    isLimited: false,
    specifications: [
      {
        label: "尺寸",
        value: "A5",
      },
      {
        label: "頁數",
        value: "96 頁",
      },
      {
        label: "材質",
        value: "再生紙、棉線",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "請放置於乾燥環境，避免受潮與長時間日曬。若需保存作品，建議搭配防潮袋或收納盒。",
  },
  {
    id: 9,
    name: "期間限定陶瓷香氛座",
    slug: "limited-ceramic-diffuser",
    description: "限定色陶瓷香氛座，適合放在床邊、書桌或玄關空間。",
    fullDescription: "期間限定陶瓷香氛座以低飽和限定色呈現，適合放在床邊、書桌或玄關空間。陶瓷材質能自然融入居家角落，營造乾淨安定的生活氛圍。",
    price: 1180,
    category: "limited",
    material: "ceramic",
    color: "gray",
    image: "https://ondat.kr/web/product/big/202208/547a99249d1e4ec7434c67c96134b622.jpg",
    galleryImages: [
      "https://ondat.kr/web/product/extra/big/202208/afeb90d10cd02ef708752116b8be2a67.jpg",
      "https://ondat.kr/web/product/extra/big/202204/409769262baf8e3835e6f721e6318243.jpg",
      "https://ondat.kr/web/product/extra/big/202308/ad44f4e83fa6d0bbf0b8aaab4e49a02e.jpg",
    ],
    swatches: [
      {
        label: "霧灰",
        hex: "#9ca3af",
      },
      {
        label: "白色",
        hex: "#f8f7f2",
      },
    ],
    topics: ["bedroom"],
    sales: 66,
    stock: 9,
    isNew: true,
    isLimited: true,
    specifications: [
      {
        label: "尺寸",
        value: "直徑 8 × 高 10 cm",
      },
      {
        label: "材質",
        value: "陶瓷",
      },
      {
        label: "內容物",
        value: "香氛座 1 入",
      },
      {
        label: "產地",
        value: "日本",
      },
    ],
    careInstructions: "請以乾布擦拭表面。若沾附香氛精油，請以微濕軟布輕擦並自然乾燥，避免使用刺激性清潔劑。",
  },
  {
    id: 10,
    name: "黑色棉質寬褲",
    slug: "black-cotton-pants",
    description: "寬鬆直筒剪裁，搭配柔軟棉質布料，適合四季日常穿著。",
    fullDescription: "黑色棉質寬褲採用寬鬆直筒剪裁與柔軟棉質布料，穿著舒適且方便活動。簡潔黑色能自然搭配襯衫、T-shirt 與外套，適合四季日常穿著。",
    price: 1680,
    category: "clothes",
    material: "cotton",
    color: "black",
    image: "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_1.png",
    galleryImages: [
      "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_1.png",
      "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_2.png",
      "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_4.png",
      "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_5.png",
    ],
    swatches: [
      {
        label: "黑色",
        hex: "#1f1f1f",
      },
      {
        label: "灰色",
        hex: "#9ca3af",
      },
    ],
    topics: ["outdoor"],
    sales: 104,
    stock: 21,
    isNew: false,
    isLimited: false,
    specifications: [
      {
        label: "尺寸",
        value: "S / M / L / XL",
      },
      {
        label: "材質",
        value: "100% 棉",
      },
      {
        label: "版型",
        value: "寬鬆直筒",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "建議反面清洗並與淺色衣物分開洗滌。請避免漂白與高溫烘乾，以維持布料與顏色狀態。",
  },
  {
    id: 11,
    name: "木柄清潔刷",
    slug: "wood-cleaning-brush",
    description: "木柄搭配天然刷毛，適合廚房、浴室與日常清潔使用。",
    fullDescription: "木柄清潔刷以自然木柄搭配天然刷毛，握感穩定，適合廚房、浴室與日常清潔使用。外型簡潔，使用後也能自然收納於居家空間。",
    price: 260,
    category: "living",
    material: "wood",
    color: "brown",
    image: "https://i.etsystatic.com/33598976/r/il/b32186/8163702117/il_794xN.8163702117_godd.jpg",
    galleryImages: [
      "https://i.etsystatic.com/33598976/r/il/b32186/8163702117/il_794xN.8163702117_godd.jpg",
      "https://i.etsystatic.com/33598976/r/il/eef600/6570141022/il_794xN.6570141022_px3m.jpg",
      "https://i.etsystatic.com/33598976/r/il/8d5fdb/4001031994/il_794xN.4001031994_mhzs.jpg",
      "https://i.etsystatic.com/33598976/r/il/9b38a1/4048682245/il_794xN.4048682245_6o7w.jpg",
    ],
    swatches: [
      {
        label: "木質棕",
        hex: "#8a684a",
      },
      {
        label: "自然米",
        hex: "#d8c7a7",
      },
    ],
    topics: ["kitchen"],
    sales: 98,
    stock: 64,
    isNew: false,
    isLimited: false,
    specifications: [
      {
        label: "尺寸",
        value: "長 18 × 寬 6 cm",
      },
      {
        label: "材質",
        value: "天然木、刷毛",
      },
      {
        label: "用途",
        value: "廚房、浴室、日常清潔",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "使用後請沖洗乾淨並放置通風處陰乾。請避免長時間浸泡於水中，以延長木柄使用壽命。",
  },
  {
    id: 12,
    name: "簡約布面單人椅",
    slug: "fabric-lounge-chair",
    description: "低飽和布面與木質椅腳，適合客廳、臥室與閱讀角落。",
    fullDescription: "簡約布面單人椅使用低飽和布面與木質椅腳，視覺柔和且坐感舒適。適合放置於客廳、臥室或閱讀角落，打造安靜放鬆的日常空間。",
    price: 5800,
    category: "furniture",
    material: "wood",
    color: "beige",
    image: "https://down-tw.img.susercontent.com/file/sg-11134201-824g0-mfb9rfavg2kt7c.webp",
    galleryImages: [
      "https://down-tw.img.susercontent.com/file/sg-11134201-824g0-mfb9rfavg2kt7c.webp",
      "https://down-tw.img.susercontent.com/file/sg-11134201-824ge-mfb9rgztdij108.webp",
      "https://down-tw.img.susercontent.com/file/sg-11134201-824iv-mfb9recrm2a4ed.webp",
    ],
    swatches: [
      {
        label: "布面米",
        hex: "#d8c7a7",
      },
      {
        label: "木質棕",
        hex: "#8a684a",
      },
    ],
    topics: ["bedroom"],
    sales: 59,
    stock: 7,
    isNew: false,
    isLimited: true,
    specifications: [
      {
        label: "尺寸",
        value: "寬 68 × 深 72 × 高 76 cm",
      },
      {
        label: "材質",
        value: "布面、實木椅腳、高密度泡棉",
      },
      {
        label: "重量",
        value: "約 11 kg",
      },
      {
        label: "產地",
        value: "台灣",
      },
    ],
    careInstructions: "布面可使用吸塵器低吸力清潔灰塵。若局部髒污，請以微濕布輕壓擦拭，避免大量用水與強力刷洗。",
  },
];

const currentId = computed(() => getRouteParamString(route.params.id));

const { data: productResponse, error: productError } = await useAsyncData(
  "product-detail",
  () => getProductDetail(currentId.value),
  {
    watch: [currentId],
  },
);

const product = computed(() => {
  if (productResponse.value) {
    return productResponse.value.Data;
  }

  if (!productError.value) {
    return null;
  }

  return products.find((item) => {
    return item.slug === currentId.value || String(item.id) === currentId.value;
  }) ?? null;
});

const { data: relatedProductsResponse } = await useAsyncData(
  "product-related",
  async () => {
    if (!product.value) {
      return {
        Status: {
          Code: 0,
          Message: "",
        },
        Data: {
          data: [],
          total: 0,
        },
      };
    }

    return getProducts({
      category: product.value.category,
      pageSize: 5,
    });
  },
  {
    watch: [product],
  },
);

const relatedProducts = computed(() => {
  if (!product.value) {
    return [];
  }

  const apiRelatedProducts =
    relatedProductsResponse.value?.Data.data
      .filter((item) => item.id !== product.value?.id)
      .slice(0, 4) ?? [];

  if (apiRelatedProducts.length) {
    return apiRelatedProducts;
  }

  if (!productError.value) {
    return [];
  }

  return products
    .filter((item) => item.id !== product.value?.id && item.category === product.value?.category)
    .slice(0, 4);
});

const selectedImage = ref("");
const selectedColor = ref("");
const quantity = ref(1);

const selectedColorLabel = computed(() => {
  return product.value?.swatches.find((swatch) => swatch.hex === selectedColor.value)?.label ?? "";
});

watch(
  product,
  (nextProduct) => {
    selectedImage.value = nextProduct?.galleryImages[0] ?? nextProduct?.image ?? "";
    selectedColor.value = nextProduct?.swatches[0]?.hex ?? "";
    quantity.value = 1;

    useSeoMeta({
      title: nextProduct ? nextProduct.name : "找不到商品",
      description: nextProduct?.description ?? "商品可能已下架，或網址不正確。",
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

function formatPrice(price: number) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(price);
}

function decreaseQuantity() {
  if (quantity.value <= 1) {
    return;
  }

  quantity.value -= 1;
}

function increaseQuantity() {
  if (!product.value) {
    return;
  }

  if (quantity.value >= product.value.stock) {
    return;
  }

  quantity.value += 1;
}
</script>
