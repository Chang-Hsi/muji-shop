<template>
  <main class="min-h-screen bg-stone-50 text-stone-900">
    <section class="mx-auto py-8">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <nav class="flex items-center gap-2 text-sm text-stone-500">
            <NuxtLink to="/" class="transition hover:text-stone-900">
              首頁
            </NuxtLink>

            <span>/</span>

            <NuxtLink to="/products" class="transition hover:text-stone-900">
              商品
            </NuxtLink>

            <template v-if="currentContextLabel !== '全部商品'">
              <span>/</span>
              <span class="font-medium text-stone-900">
                {{ currentContextLabel }}
              </span>
            </template>
          </nav>
        </div>

        <form class="w-full lg:max-w-sm" @submit.prevent>
          <label class="sr-only" for="product-keyword">
            搜尋商品
          </label>

          <div class="relative">
            <input
              id="product-keyword"
              v-model.trim="keyword"
              type="search"
              placeholder="搜尋商品名稱、材質或顏色"
              class="h-12 w-full rounded-full border border-stone-200 bg-white px-5 pr-12 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-4 focus:ring-stone-200/70"
            >

            <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          </div>
        </form>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <ProductFilterSidebar
          v-model:selected-categories="selectedCategories"
          v-model:selected-materials="selectedMaterials"
          v-model:selected-colors="selectedColors"
          v-model:selected-price="selectedPrice"
          :category-options="categoryOptions"
          :material-options="materialOptions"
          :color-options="colorOptions"
          :price-range-options="priceRangeOptions"
          :get-category-count="getCategoryCount"
          @clear="clearAllFilters"
        />

        <section class="min-w-0">
          <ProductToolbar
            v-model:selected-sort="selectedSort"
            v-model:view-mode="viewMode"
            :count="filteredProducts.length"
            :sort-options="sortOptions"
          />

          <ProductFilterTags
            v-if="activeFilterTags.length"
            :active-filter-tags="activeFilterTags"
            @remove="removeFilterTag"
          />

          <ProductGrid
            v-if="filteredProducts.length && viewMode === 'grid'"
            :products="filteredProducts"
            :get-category-label="getCategoryLabel"
            :format-price="formatPrice"
          />

          <ProductList
            v-if="filteredProducts.length && viewMode === 'list'"
            :products="filteredProducts"
            :get-category-label="getCategoryLabel"
            :get-material-label="getMaterialLabel"
            :get-topic-label="getTopicLabel"
            :format-price="formatPrice"
          />

          <ProductEmptyState
            v-if="!filteredProducts.length"
            @clear="clearAllFilters"
          />
        </section>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import ProductEmptyState from '~/components/products/ProductEmptyState.vue';
import ProductFilterSidebar from '~/components/products/ProductFilterSidebar.vue';
import ProductFilterTags from '~/components/products/ProductFilterTags.vue';
import ProductGrid from '~/components/products/ProductGrid.vue';
import ProductList from '~/components/products/ProductList.vue';
import ProductToolbar from '~/components/products/ProductToolbar.vue';

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

type SortValue = "new" | "popular" | "priceLow" | "priceHigh";

type FilterTag = {
  type: "category" | "material" | "color" | "price" | "topic" | "keyword";
  value: string;
  label: string;
};

const route = useRoute();
const router = useRouter();

useSeoMeta({
  title: "商品列表",
  description: "瀏覽文創用品、生活用品、家具、服飾與期間限定商品。",
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

const materialOptions = [
  {
    label: "棉",
    value: "cotton",
  },
  {
    label: "亞麻",
    value: "linen",
  },
  {
    label: "木質",
    value: "wood",
  },
  {
    label: "陶瓷",
    value: "ceramic",
  },
  {
    label: "不鏽鋼",
    value: "steel",
  },
];

const colorOptions = [
  {
    label: "白色",
    value: "white",
    hex: "#f8f7f2",
  },
  {
    label: "米色",
    value: "beige",
    hex: "#d8c7a7",
  },
  {
    label: "棕色",
    value: "brown",
    hex: "#8a684a",
  },
  {
    label: "黑色",
    value: "black",
    hex: "#1f1f1f",
  },
  {
    label: "灰色",
    value: "gray",
    hex: "#9ca3af",
  },
];

const priceRangeOptions = [
  {
    label: "全部價格",
    value: "all",
  },
  {
    label: "NT$500 以下",
    value: "under500",
    max: 500,
  },
  {
    label: "NT$500 - NT$1,500",
    value: "500to1500",
    min: 500,
    max: 1500,
  },
  {
    label: "NT$1,500 - NT$5,000",
    value: "1500to5000",
    min: 1500,
    max: 5000,
  },
  {
    label: "NT$5,000 以上",
    value: "over5000",
    min: 5000,
  },
];

const sortOptions: {
  label: string;
  value: SortValue;
}[] = [
  {
    label: "新品優先",
    value: "new",
  },
  {
    label: "熱銷優先",
    value: "popular",
  },
  {
    label: "價格由低到高",
    value: "priceLow",
  },
  {
    label: "價格由高到低",
    value: "priceHigh",
  },
];

const topicLabelMap: Record<string, string> = {
  bedroom: "臥室收納",
  kitchen: "廚房日用",
  outdoor: "通勤外出",
  linen: "自然棉麻",
};

const products: Product[] = [
  {
    id: 1,
    name: "橡木簡約邊桌",
    slug: "oak-side-table",
    description: "適合沙發旁、床邊與閱讀角落的小型邊桌，保留自然木紋與簡潔比例。",
    price: 2480,
    category: "furniture",
    material: "wood",
    color: "brown",
    image: "https://www.crapo.jp/desk/5134/1.jpg",
    swatches: ["#8a684a", "#d8c7a7"],
    topics: ["bedroom"],
    sales: 92,
    isNew: true,
    isLimited: false,
  },
  {
    id: 2,
    name: "棉麻收納籃",
    slug: "linen-storage-basket",
    description: "柔軟棉麻材質，適合收納毛巾、衣物與日常小物，維持空間乾淨舒服。",
    price: 690,
    category: "living",
    material: "linen",
    color: "beige",
    image: "https://img.pchome.com.tw/cs/items/DQAUFQA900JTUBV/000001_1773825688.jpg",
    swatches: ["#d8c7a7", "#f8f7f2"],
    topics: ["bedroom", "linen"],
    sales: 135,
    isNew: false,
    isLimited: false,
  },
  {
    id: 3,
    name: "白瓷早餐盤",
    slug: "white-ceramic-plate",
    description: "霧面白瓷餐盤，適合早餐、甜點與日常餐桌搭配。",
    price: 380,
    category: "living",
    material: "ceramic",
    color: "white",
    image: "https://i.pinimg.com/1200x/cf/99/df/cf99df4fd1b7b496eb4cc5002811bb50.jpg",
    swatches: ["#f8f7f2", "#9ca3af"],
    topics: ["kitchen"],
    sales: 168,
    isNew: false,
    isLimited: false,
  },
  {
    id: 4,
    name: "自然棉白色襯衫",
    slug: "natural-cotton-shirt",
    description: "寬鬆版型與柔軟棉質，適合日常通勤與週末外出穿搭。",
    price: 1280,
    category: "clothes",
    material: "cotton",
    color: "white",
    image: "https://img.pchome.com.tw/cs/items/DIAIDHA900HSKHN/000001_1725860785.jpg",
    swatches: ["#f8f7f2", "#d8c7a7"],
    topics: ["outdoor", "linen"],
    sales: 121,
    isNew: true,
    isLimited: false,
  },
  {
    id: 5,
    name: "水筒 500ml ステンレスボトル",
    slug: "steel-bottle",
    description: "簡潔瓶身與耐用不鏽鋼材質，適合通勤、辦公與旅行攜帶。",
    price: 890,
    category: "living",
    material: "steel",
    color: "gray",
    image: "https://howsie-shop.jp/cdn/shop/files/483990_8.jpg?v=1752541617&width=600",
    swatches: ["#9ca3af", "#1f1f1f"],
    topics: ["outdoor"],
    sales: 210,
    isNew: false,
    isLimited: false,
  },
  {
    id: 6,
    name: "木質雙層收納架",
    slug: "wood-storage-shelf",
    description: "開放式雙層設計，可放置書籍、餐具、香氛與居家常用小物。",
    price: 3200,
    category: "furniture",
    material: "wood",
    color: "brown",
    image: "https://image.rakuten.co.jp/incrasso/cabinet/original/nor/hb-04_2.jpg",
    swatches: ["#8a684a", "#d8c7a7"],
    topics: ["bedroom", "kitchen"],
    sales: 74,
    isNew: false,
    isLimited: false,
  },
  {
    id: 7,
    name: "亞麻托特包",
    slug: "linen-tote-bag",
    description: "輕量亞麻材質與大容量設計，適合採買、通勤與日常外出。",
    price: 790,
    category: "clothes",
    material: "linen",
    color: "beige",
    image: "https://i.etsystatic.com/55220475/r/il/6c2b30/6781864525/il_794xN.6781864525_a1r7.jpg",
    swatches: ["#d8c7a7", "#1f1f1f"],
    topics: ["outdoor", "linen"],
    sales: 184,
    isNew: false,
    isLimited: false,
  },
  {
    id: 8,
    name: "手作紙質筆記本",
    slug: "handmade-paper-notebook",
    description: "溫潤紙感與裸背裝訂，適合書寫、速寫與日常靈感紀錄。",
    price: 320,
    category: "creative",
    material: "cotton",
    color: "beige",
    image: "https://kinchandiy.com/wp-content/uploads/2025/03/k20250325_1.jpg?v=1742940148",
    swatches: ["#d8c7a7", "#8a684a"],
    topics: ["outdoor"],
    sales: 156,
    isNew: true,
    isLimited: false,
  },
  {
    id: 9,
    name: "期間限定陶瓷香氛座",
    slug: "limited-ceramic-diffuser",
    description: "限定色陶瓷香氛座，適合放在床邊、書桌或玄關空間。",
    price: 1180,
    category: "limited",
    material: "ceramic",
    color: "gray",
    image: "https://ondat.kr/web/product/big/202208/547a99249d1e4ec7434c67c96134b622.jpg",
    swatches: ["#9ca3af", "#f8f7f2"],
    topics: ["bedroom"],
    sales: 66,
    isNew: true,
    isLimited: true,
  },
  {
    id: 10,
    name: "黑色棉質寬褲",
    slug: "black-cotton-pants",
    description: "寬鬆直筒剪裁，搭配柔軟棉質布料，適合四季日常穿著。",
    price: 1680,
    category: "clothes",
    material: "cotton",
    color: "black",
    image: "https://cdn.wconcept.com/products/resize/632x843/7210121/24/721012124_1.png",
    swatches: ["#1f1f1f", "#9ca3af"],
    topics: ["outdoor"],
    sales: 104,
    isNew: false,
    isLimited: false,
  },
  {
    id: 11,
    name: "木柄清潔刷",
    slug: "wood-cleaning-brush",
    description: "木柄搭配天然刷毛，適合廚房、浴室與日常清潔使用。",
    price: 260,
    category: "living",
    material: "wood",
    color: "brown",
    image: "https://i.etsystatic.com/33598976/r/il/b32186/8163702117/il_794xN.8163702117_godd.jpg",
    swatches: ["#8a684a", "#d8c7a7"],
    topics: ["kitchen"],
    sales: 98,
    isNew: false,
    isLimited: false,
  },
  {
    id: 12,
    name: "簡約布面單人椅",
    slug: "fabric-lounge-chair",
    description: "低飽和布面與木質椅腳，適合客廳、臥室與閱讀角落。",
    price: 5800,
    category: "furniture",
    material: "wood",
    color: "beige",
    image: "https://down-tw.img.susercontent.com/file/sg-11134201-824g0-mfb9rfavg2kt7c.webp",
    swatches: ["#d8c7a7", "#8a684a"],
    topics: ["bedroom"],
    sales: 59,
    isNew: false,
    isLimited: true,
  },
];

const keyword = ref("");
const selectedCategories = ref<string[]>([]);
const selectedMaterials = ref<string[]>([]);
const selectedColors = ref<string[]>([]);
const selectedPrice = ref("all");
const selectedSort = ref<SortValue>("new");
const viewMode = ref<"grid" | "list">("grid");

const routeCategory = computed(() => getQueryString(route.query.category));
const routeTopic = computed(() => getQueryString(route.query.topic));
const routeSort = computed(() => getQueryString(route.query.sort));

const currentContextLabel = computed(() => {
  const firstCategory = selectedCategories.value[0];

  if (selectedCategories.value.length === 1 && firstCategory) {
    return getCategoryLabel(firstCategory);
  }

  if (selectedCategories.value.length > 1) {
    return "多類別";
  }

  if (routeTopic.value) {
    return getTopicLabel(routeTopic.value);
  }

  if (routeSort.value) {
    return getSortLabel(routeSort.value);
  }

  return "全部商品";
});

const activeFilterTags = computed<FilterTag[]>(() => {
  const tags: FilterTag[] = [];

  selectedCategories.value.forEach((value) => {
    tags.push({
      type: "category",
      value,
      label: getCategoryLabel(value),
    });
  });

  selectedMaterials.value.forEach((value) => {
    tags.push({
      type: "material",
      value,
      label: getMaterialLabel(value),
    });
  });

  selectedColors.value.forEach((value) => {
    tags.push({
      type: "color",
      value,
      label: getColorLabel(value),
    });
  });

  if (selectedPrice.value !== "all") {
    tags.push({
      type: "price",
      value: selectedPrice.value,
      label: getPriceRangeLabel(selectedPrice.value),
    });
  }

  if (routeTopic.value) {
    tags.push({
      type: "topic",
      value: routeTopic.value,
      label: getTopicLabel(routeTopic.value),
    });
  }

  if (keyword.value) {
    tags.push({
      type: "keyword",
      value: keyword.value,
      label: `搜尋：${keyword.value}`,
    });
  }

  return tags;
});

const filteredProducts = computed(() => {
  let result = [...products];

  if (selectedCategories.value.length) {
    result = result.filter((product) => selectedCategories.value.includes(product.category));
  }

  if (routeTopic.value) {
    result = result.filter((product) => product.topics.includes(routeTopic.value));
  }

  if (selectedMaterials.value.length) {
    result = result.filter((product) => selectedMaterials.value.includes(product.material));
  }

  if (selectedColors.value.length) {
    result = result.filter((product) => selectedColors.value.includes(product.color));
  }

  const priceRange = priceRangeOptions.find((option) => option.value === selectedPrice.value);

  if (priceRange?.min !== undefined) {
    result = result.filter((product) => product.price >= priceRange.min!);
  }

  if (priceRange?.max !== undefined) {
    result = result.filter((product) => product.price <= priceRange.max!);
  }

  if (keyword.value) {
    const normalizedKeyword = keyword.value.toLowerCase();

    result = result.filter((product) => {
      const searchableText = [
        product.name,
        product.description,
        getCategoryLabel(product.category),
        getMaterialLabel(product.material),
        getColorLabel(product.color),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedKeyword);
    });
  }

  if (selectedSort.value === "popular") {
    result.sort((a, b) => b.sales - a.sales);
  }

  if (selectedSort.value === "priceLow") {
    result.sort((a, b) => a.price - b.price);
  }

  if (selectedSort.value === "priceHigh") {
    result.sort((a, b) => b.price - a.price);
  }

  if (selectedSort.value === "new") {
    result.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
  }

  return result;
});

watch(
  () => [route.query.category, route.query.sort, route.query.topic],
  () => {
    const category = getQueryString(route.query.category);
    const sort = normalizeSortValue(route.query.sort);

    selectedCategories.value = category ? [category] : [];
    selectedSort.value = sort;
    selectedMaterials.value = [];
    selectedColors.value = [];
    selectedPrice.value = "all";
    keyword.value = getQueryString(route.query.keyword);
  },
  {
    immediate: true,
  },
);

function getQueryString(value: unknown) {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }

  return typeof value === "string" ? value : "";
}

function normalizeSortValue(value: unknown): SortValue {
  const rawValue = getQueryString(value);
  const matchedOption = sortOptions.find((option) => option.value === rawValue);

  return matchedOption?.value ?? "new";
}

function getCategoryLabel(value: string) {
  return categoryOptions.find((option) => option.value === value)?.label ?? value;
}

function getMaterialLabel(value: string) {
  return materialOptions.find((option) => option.value === value)?.label ?? value;
}

function getColorLabel(value: string) {
  return colorOptions.find((option) => option.value === value)?.label ?? value;
}

function getPriceRangeLabel(value: string) {
  return priceRangeOptions.find((option) => option.value === value)?.label ?? value;
}

function getTopicLabel(value: string) {
  return topicLabelMap[value] ?? value;
}

function getSortLabel(value: string) {
  return sortOptions.find((option) => option.value === value)?.label ?? value;
}

function getCategoryCount(value: string) {
  return products.filter((product) => product.category === value).length;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(price);
}

function removeFilterTag(tag: FilterTag) {
  if (tag.type === "category") {
    selectedCategories.value = selectedCategories.value.filter((value) => value !== tag.value);
  }

  if (tag.type === "material") {
    selectedMaterials.value = selectedMaterials.value.filter((value) => value !== tag.value);
  }

  if (tag.type === "color") {
    selectedColors.value = selectedColors.value.filter((value) => value !== tag.value);
  }

  if (tag.type === "price") {
    selectedPrice.value = "all";
  }

  if (tag.type === "keyword") {
    keyword.value = "";
  }

  if (tag.type === "topic") {
    void router.replace({
      path: "/products",
      query: {
        category: routeCategory.value || undefined,
        sort: routeSort.value || undefined,
      },
    });
  }
}

function clearAllFilters() {
  keyword.value = "";
  selectedCategories.value = [];
  selectedMaterials.value = [];
  selectedColors.value = [];
  selectedPrice.value = "all";
  selectedSort.value = "new";

  void router.replace({
    path: "/products",
  });
}
</script>