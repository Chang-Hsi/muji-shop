<script setup lang="ts">
import HeroSection from "~/components/home/HeroSection.vue";
import LatestNewsSection from "~/components/home/LatestNewsSection.vue";
import CategorySection from "~/components/home/CategorySection.vue";
import FeaturedProductsSection from "~/components/home/FeaturedProductsSection.vue";
import StoreInfoSection from "~/components/home/StoreInfoSection.vue";
import { getHomeData } from "~/apis/home";
import type { HomeData } from "~/types/home";

const homeData = ref<HomeData>({
  newsItems: [],
  categories: [],
  featuredProducts: [],
  storeGroups: [],
});

const newsItems = computed(() => homeData.value.newsItems);
const categories = computed(() => homeData.value.categories);
const featuredProducts = computed(() => homeData.value.featuredProducts);
const storeGroups = computed(() => homeData.value.storeGroups);

onMounted(async () => {
  try {
    const response = await getHomeData();

    homeData.value = response.Data;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }
});
</script>

<template>
  <div>
    <HeroSection />

    <LatestNewsSection :news-items="newsItems" />

    <CategorySection :categories="categories" />

    <FeaturedProductsSection :products="featuredProducts" />

    <StoreInfoSection :store-groups="storeGroups" />
  </div>
</template>
