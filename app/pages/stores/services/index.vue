<template>
  <main class="min-h-screen bg-stone-50 text-stone-900">
    <section class="mx-auto py-8">
      <nav class="flex items-center gap-2 text-sm text-stone-500">
        <NuxtLink to="/" class="transition hover:text-stone-900">
          首頁
        </NuxtLink>

        <span>/</span>

        <NuxtLink to="/stores" class="transition hover:text-stone-900">
          店鋪消息
        </NuxtLink>

        <span>/</span>

        <span class="font-medium text-stone-900"> 門市服務 </span>
      </nav>

      <div
        class="mt-10 flex flex-col gap-4 border-b border-stone-200 pb-8 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <p class="text-sm tracking-[0.3em] text-stone-400">STORE SERVICE</p>

          <h1 class="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
            門市服務
          </h1>
        </div>

        <div class="relative w-full lg:max-w-xs">
          <input
            v-model.trim="keyword"
            type="search"
            placeholder="搜尋門市或相關服務"
            class="h-11 w-full rounded-full border border-stone-200 bg-white px-5 pr-11 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-4 focus:ring-stone-200/70"
          >

          <Icon
            name="lucide:search"
            class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
          />
        </div>
      </div>

      <div
        v-if="filteredServices.length"
        class="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
      >
        <article
          v-for="service in filteredServices"
          :key="service.id"
          class="group"
        >
          <NuxtLink :to="getServiceDetailPath(service)" class="block">
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-extrabold text-stone-950">
                {{ service.title }}
              </h2>
            </div>

            <div class="mt-3 overflow-hidden rounded-3xl bg-stone-100">
              <img
                :src="service.image"
                :alt="service.title"
                class="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
              >
            </div>

            <p class="mt-4 line-clamp-3 text-sm leading-7 text-stone-500">
              {{ service.description }}
            </p>

            <div
              class="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition group-hover:border-stone-900 group-hover:bg-stone-900 group-hover:text-white"
            >
              <Icon name="lucide:chevron-right" class="h-4 w-4" />
              {{ service.buttonText }}
            </div>
          </NuxtLink>
        </article>
      </div>

      <div
        v-else
        class="mt-10 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center"
      >
        <p class="text-lg font-medium text-stone-950">
          找不到符合條件的門市服務
        </p>

        <p class="mt-2 text-sm text-stone-500">
          可以換個關鍵字，或清除搜尋條件。
        </p>

        <button
          type="button"
          class="mt-6 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
          @click="keyword = ''"
        >
          清除搜尋
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getStoreServices } from "~/apis/storeServices";
import {
  storeServices as fallbackStoreServices,
} from "~/data/storeServices";
import type { StoreServiceItem } from "~/types/storeServices";

const route = useRoute();
const keyword = ref(getQueryString(route.query.keyword));
const serviceQueryParams = computed(() => ({
  keyword: keyword.value || undefined,
}));

const { data: servicesResponse, error: servicesError } = await useAsyncData(
  "store-services",
  () => getStoreServices(serviceQueryParams.value),
  {
    watch: [serviceQueryParams],
  },
);

useSeoMeta({
  title: "門市服務",
  description: "查看無印良品門市提供的會員、取貨、顧問與生活提案服務。",
});

const filteredServices = computed(() => {
  const apiServices = servicesResponse.value?.Data.data;

  if (apiServices) {
    return apiServices;
  }

  if (!servicesError.value) {
    return [];
  }

  if (!keyword.value) {
    return fallbackStoreServices;
  }

  const normalizedKeyword = keyword.value.toLowerCase();

  return fallbackStoreServices.filter((service) => {
    const searchableText = [
      service.title,
      service.category,
      service.description,
      service.detail,
      service.features.join(" "),
      service.availableStores.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedKeyword);
  });
});

watch(
  () => route.query.keyword,
  (nextKeyword) => {
    keyword.value = getQueryString(nextKeyword);
  },
);

function getQueryString(value: unknown) {
  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? value[0] : "";
  }

  return typeof value === "string" ? value : "";
}

function getServiceDetailPath(service: StoreServiceItem) {
  return `/stores/services/${service.storeId ?? service.id}`;
}
</script>
