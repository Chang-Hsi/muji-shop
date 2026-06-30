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

        <NuxtLink to="/stores/services" class="transition hover:text-stone-900">
          門市服務
        </NuxtLink>

        <template v-if="service">
          <span>/</span>

          <span class="font-medium text-stone-900">
            {{ service.title }}
          </span>
        </template>
      </nav>

      <template v-if="service">
        <!-- Banner 區塊 -->
        <section
          class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]"
        >
          <div class="overflow-hidden bg-stone-100">
            <img
              :src="service.image"
              :alt="service.title"
              class="aspect-4/3 w-full object-cover"
            >
          </div>

          <div class="flex flex-col justify-center">
            <p class="text-sm tracking-[0.3em] text-stone-400">
              {{ service.category }}
            </p>

            <div class="mt-3 flex flex-wrap items-center gap-3">
              <h1 class="text-3xl font-semibold tracking-tight text-stone-950">
                {{ service.title }}
              </h1>

              <span
                v-if="service.badge"
                class="rounded border border-stone-300 px-2 py-0.5 text-xs text-stone-500"
              >
                {{ service.badge }}
              </span>
            </div>

            <p class="mt-5 text-sm leading-7 text-stone-500">
              {{ service.description }}
            </p>

            <div class="mt-8 flex flex-wrap gap-2">
              <span
                v-for="feature in service.features"
                :key="feature"
                class="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600 shadow-sm"
              >
                {{ feature }}
              </span>
            </div>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="/stores"
                class="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                查詢門市
              </NuxtLink>

              <NuxtLink
                to="/stores/services"
                class="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-stone-200 bg-white px-6 text-sm font-medium text-stone-950 transition hover:border-stone-300"
              >
                回門市列表
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- 樓層 / 空間示意 -->
        <section class="mt-16 border-t border-stone-200 pt-10">
          <div
            class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <p class="text-sm tracking-[0.3em] text-stone-400">STORE GUIDE</p>

              <h2
                class="mt-2 text-2xl font-semibold tracking-tight text-stone-950"
              >
                門市空間與樓層資訊
              </h2>

              <p class="mt-3 max-w-2xl text-sm leading-7 text-stone-500">
                以下為門市空間與樓層示意，實際配置會依不同門市與現場狀況有所不同。
              </p>
            </div>
          </div>

          <div class="mt-8 grid gap-5 md:grid-cols-2">
            <div
              v-for="image in storeLayoutImages"
              :key="image"
              class="overflow-hidden bg-stone-50"
            >
              <img
                :src="image"
                :alt="`${service.title} 空間示意`"
                class="w-full object-cover transition duration-500 hover:scale-105"
              >
            </div>
          </div>
        </section>

        <!-- 門市資訊 -->
        <section class="mt-16 border-t border-stone-200 pt-10">
          <div>
            <p class="text-sm tracking-[0.3em] text-stone-400">
              STORE INFORMATION
            </p>

            <h2
              class="mt-2 text-2xl font-semibold tracking-tight text-stone-950"
            >
              門市資訊
            </h2>
          </div>

          <div
            v-if="displayStore"
            class="mt-8 grid grid-cols-1 gap-8 bg-white md:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.05fr)]"
          >
            <div class="h-[58vh] overflow-hidden bg-stone-100">
              <img
                :src="displayStore.facadeImage || displayStore.image"
                :alt="displayStore.name"
                class="h-full w-full object-cover"
              >
            </div>
            <div class="flex flex-col justify-center">
              <h3 class="text-xl font-semibold text-stone-950">
                {{ displayStore.name }}
              </h3>

              <div class="mt-6 space-y-5 text-sm leading-7">
                <div>
                  <p class="text-stone-400">地址：</p>

                  <p class="text-stone-900">
                    {{ displayStore.address }}
                  </p>
                </div>

                <div>
                  <p class="text-stone-400">營業時間：</p>

                  <p class="text-stone-900">
                    週一至週日 {{ displayStore.hours }}
                  </p>
                </div>

                <div>
                  <p class="text-stone-400">電話：</p>

                  <p class="text-stone-900">
                    {{ displayStore.phone }}
                  </p>
                </div>

                <div>
                  <p class="text-stone-400">交通方式：</p>

                  <p
                    v-if="displayStore.services.includes('parking')"
                    class="text-stone-900"
                  >
                    開車：此門市提供停車資訊，建議出發前先確認現場停車規則。
                  </p>

                  <p class="text-stone-900">
                    捷運：可搭乘至鄰近捷運站，步行約 5–10 分鐘抵達。
                  </p>

                  <p class="text-stone-900">
                    公車：可搭乘多線市區公車至周邊站牌，再步行前往門市。
                  </p>
                </div>
              </div>

              <div class="mt-6 flex flex-wrap gap-2">
                <span
                  v-for="storeService in displayStore.services"
                  :key="`${displayStore.id}-${storeService}`"
                  class="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
                >
                  {{ getStoreServiceLabel(storeService) }}
                </span>
              </div>

              <div class="my-4 flex flex-wrap gap-8">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 text-sm font-medium text-stone-950 transition hover:text-stone-500"
                  @click="openGoogleNavigation(displayStore)"
                >
                  Google Map
                  <Icon name="lucide:external-link" class="h-4 w-4" />
                </button>

                <button
                  type="button"
                  class="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-stone-950"
                  @click="copyAddress(displayStore)"
                >
                  複製地址
                  <Icon name="lucide:copy" class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            v-else
            class="mt-8 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center"
          >
            <p class="text-lg font-medium text-stone-950">找不到對應門市資訊</p>

            <p class="mt-2 text-sm text-stone-500">
              請確認 data/storeServices.ts 裡的服務 id 是否與門市 id 對應。
            </p>
          </div>
        </section>
      </template>

      <div
        v-else
        class="mt-10 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center"
      >
        <p class="text-lg font-medium text-stone-950">找不到這個門市服務</p>

        <p class="mt-2 text-sm text-stone-500">
          服務可能已下架，或網址不正確。
        </p>

        <NuxtLink
          to="/stores/services"
          class="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          回門市服務列表
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getStoreServiceDetail } from "~/apis/storeServices";
import {
  storeLocations,
  storeServices as fallbackStoreServices,
  type StoreLocationItem,
  type StoreServiceCode,
} from "~/data/storeServices";
import type {
  StoreServiceItem,
  StoreServiceStoreItem,
} from "~/types/storeServices";

type DetailStoreItem = StoreLocationItem | StoreServiceStoreItem;

const route = useRoute();

const currentSlug = computed(() => {
  const slug = route.params.slug;

  if (Array.isArray(slug)) {
    return slug[0] ?? "";
  }

  return String(slug ?? "");
});

const { data: detailResponse, error: detailError } = await useAsyncData(
  "store-service-detail",
  () => getStoreServiceDetail(currentSlug.value),
  {
    watch: [currentSlug],
  },
);

const detailData = computed(() => detailResponse.value?.Data ?? null);

const currentStore = computed<StoreLocationItem | null>(() => {
  return (
    storeLocations.find((store) => {
      return (
        store.slug === currentSlug.value ||
        String(store.id) === currentSlug.value
      );
    }) ?? null
  );
});

const service = computed<StoreServiceItem | null>(() => {
  if (detailData.value?.service) {
    return detailData.value.service;
  }

  if (!detailError.value) {
    return null;
  }

  if (currentStore.value) {
    return (
      fallbackStoreServices.find((item) => item.id === currentStore.value?.id) ??
      null
    );
  }

  return (
    fallbackStoreServices.find((item) => {
      return (
        item.slug === currentSlug.value || String(item.id) === currentSlug.value
      );
    }) ?? null
  );
});

const displayStore = computed<DetailStoreItem | null>(() => {
  if (detailData.value?.displayStore) {
    return detailData.value.displayStore;
  }

  if (!detailError.value) {
    return null;
  }

  if (currentStore.value) {
    return currentStore.value;
  }

  if (!service.value) {
    return null;
  }

  return storeLocations.find((store) => store.id === service.value?.id) ?? null;
});

const storeLayoutImages = computed(() => {
  if (detailData.value) {
    return detailData.value.layoutImages;
  }

  return displayStore.value?.layoutImages ?? [];
});

watch(
  service,
  (nextService) => {
    useSeoMeta({
      title: nextService ? nextService.title : "找不到門市服務",
      description: nextService?.description ?? "服務可能已下架，或網址不正確。",
    });
  },
  {
    immediate: true,
  },
);

function getStoreServiceLabel(serviceCode: StoreServiceCode) {
  return (
    detailData.value?.services.find((item) => item.slug === serviceCode)
      ?.title ??
    fallbackStoreServices.find((item) => item.slug === serviceCode)?.title ??
    serviceCode
  );
}

function openGoogleNavigation(store: DetailStoreItem) {
  if (!import.meta.client) {
    return;
  }

  const destination = encodeURIComponent(`${store.lat},${store.lng}`);

  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    "_blank",
  );
}

async function copyAddress(store: DetailStoreItem) {
  if (!import.meta.client || !navigator.clipboard) {
    return;
  }

  await navigator.clipboard.writeText(store.address);
}
</script>
