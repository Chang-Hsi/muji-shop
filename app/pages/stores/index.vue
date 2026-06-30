<template>
  <main class="min-h-screen bg-stone-50 text-stone-900">
    <section class="mx-auto py-8">
      <nav class="flex items-center gap-2 text-sm text-stone-500">
        <NuxtLink to="/" class="transition hover:text-stone-900">
          首頁
        </NuxtLink>

        <span>/</span>

        <span class="font-medium text-stone-900"> 門市資訊 </span>
      </nav>

      <div
        class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[360px_minmax(0,1fr)]"
      >
        <section class="lg:sticky lg:top-24 lg:h-fit">
          <div
            class="relative h-90 overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 lg:h-180"
          >
            <div ref="mapRef" class="h-full w-full" />

            <div
              v-if="!googleMapsApiKey || mapLoadError"
              class="absolute inset-0 overflow-hidden bg-stone-100"
            >
              <div
                class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_28%),radial-gradient(circle_at_78%_34%,rgba(255,255,255,0.75),transparent_24%),linear-gradient(135deg,#f5f5f4,#e7e5e4)]"
              />

              <button
                v-for="store in fallbackMapStores"
                :key="store.id"
                type="button"
                class="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-white px-3 py-2 text-xs font-medium shadow-lg transition hover:scale-105"
                :class="
                  selectedStoreId === store.id
                    ? 'border-stone-900 text-stone-950'
                    : 'border-stone-200 text-stone-600'
                "
                :style="getFallbackPinStyle(store)"
                @click="selectStore(store)"
              >
                <span class="h-2.5 w-2.5 rounded-full bg-stone-900" />
                {{ store.name }}
              </button>
            </div>

            <div
              class="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur"
            >
              <p class="text-xs text-stone-400">Selected store</p>

              <div v-if="selectedStore" class="mt-1">
                <p class="text-base font-semibold text-stone-950">
                  {{ selectedStore.name }}
                </p>

                <p class="mt-1 line-clamp-1 text-sm text-stone-500">
                  {{ selectedStore.address }}
                </p>
              </div>

              <div v-else class="mt-1">
                <p class="text-base font-semibold text-stone-950">
                  尚未選擇門市
                </p>

                <p class="mt-1 text-sm text-stone-500">
                  可從右側列表選擇門市查看位置。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="min-w-0">
          <div class="flex items-end justify-between">
            <div>
              <p class="text-sm tracking-[0.3em] text-neutral-400">STORE</p>

              <h2 class="mt-2 text-2xl font-light text-neutral-900">
                門市一覽
              </h2>
            </div>

            <div
              class="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_180px_180px]"
            >
              <div class="relative">
                <input
                  v-model.trim="keyword"
                  type="search"
                  placeholder="搜尋門市名稱、地址或服務"
                  class="h-11 w-full rounded-full border border-stone-200 bg-white px-5 pr-11 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-4 focus:ring-stone-200/70"
                >

                <span
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                >
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

              <CommonBaseSelect
                id="store-mode"
                v-model="selectedStoreMode"
                :options="storeModeOptions"
              />

              <CommonBaseSelect
                id="store-region"
                v-model="selectedRegion"
                :options="regionOptions"
              />
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between gap-4 px-2">
            <div>
              <p class="text-sm font-medium text-stone-950">
                顯示 {{ filteredStores.length }} 間門市
              </p>

              <p class="mt-1 text-xs text-stone-400">
                {{ selectedModeLabel }} / {{ selectedRegionLabel }}
              </p>
            </div>

            <button
              type="button"
              class="text-sm text-stone-500 transition hover:text-stone-950"
              @click="clearFilters"
            >
              清除篩選
            </button>
          </div>

          <div v-if="filteredStores.length" class="mt-4 space-y-4">
            <article
              v-for="store in filteredStores"
              :key="store.id"
              class="group cursor-pointer transition py-4 hover:-translate-y-0.5 hover:shadow-md"
              :class="
                selectedStoreId === store.id
                  ? 'border-stone-900'
                  : 'border-stone-200'
              "
              @click="selectStore(store)"
            >
              <div class="flex gap-4">
                <div
                  class="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-stone-100 sm:h-36 sm:w-36"
                >
                  <img
                    :src="store.image"
                    :alt="store.name"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  >

                  <div
                    class="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2"
                  >
                    <button
                      type="button"
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur transition hover:bg-stone-900 hover:text-white"
                      aria-label="Google 導航"
                      @click.stop="openGoogleNavigation(store)"
                    >
                      <Icon name="lucide:globe-2" class="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      class="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur transition hover:bg-stone-900 hover:text-white"
                      aria-label="複製地址"
                      @click.stop="copyAddress(store)"
                    >
                      <Icon name="lucide:copy" class="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div class="min-w-0 flex-1">
                  <div
                    class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div class="min-w-0">
                      <p class="text-xs text-stone-400">
                        {{ store.regionLabel }}
                      </p>

                      <h2 class="mt-1 text-lg font-semibold text-stone-950">
                        {{ store.name }}
                      </h2>
                    </div>

                    <p
                      v-if="getDistanceText(store)"
                      class="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500"
                    >
                      {{ getDistanceText(store) }}
                    </p>
                  </div>

                  <p class="mt-2 line-clamp-1 text-sm text-stone-500">
                    {{ store.address }} {{ store.phone }}
                  </p>

                  <p class="mt-3 text-sm text-stone-600">
                    今日營業 {{ store.hours }}
                  </p>

                  <div class="mt-3 flex flex-wrap gap-2">
                    <span
                      v-for="service in store.services"
                      :key="`${store.id}-${service}`"
                      class="rounded-full px-3 py-1 text-xs font-medium"
                      :class="
                        service === 'pickup'
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600'
                      "
                    >
                      {{ getServiceLabel(service) }}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div
            v-if="!filteredStores.length"
            class="mt-6 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center"
          >
            <p class="text-lg font-medium text-stone-950">
              找不到符合條件的門市
            </p>

            <p class="mt-2 text-sm text-stone-500">
              可以清除篩選，或改用其他關鍵字查詢。
            </p>

            <button
              type="button"
              class="mt-6 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
              @click="clearFilters"
            >
              清除篩選
            </button>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getStores, getStoreServices } from "~/apis/storeServices";
import CommonBaseSelect from "~/components/common/BaseSelect.vue";
import {
  storeLocations,
  storeServices as fallbackStoreServices,
  type StoreLocationItem,
  type StoreServiceCode,
} from "~/data/storeServices";

type StoreService = StoreServiceCode;
type StoreItem = StoreLocationItem;

type StoreMode = "" | "nearby" | "all" | StoreService;

type LocationStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unsupported";

type GeoPoint = {
  lat: number;
  lng: number;
};

type SelectOption = {
  label: string;
  value: string;
};

type GoogleMapOptions = {
  center: GeoPoint;
  zoom: number;
  mapTypeControl: boolean;
  streetViewControl: boolean;
  fullscreenControl: boolean;
  clickableIcons: boolean;
};

type GoogleMarkerIcon = {
  path: unknown;
  scale: number;
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeWeight: number;
};

type GoogleMarkerOptions = {
  position: GeoPoint;
  map: GoogleMapInstance;
  title: string;
  icon?: GoogleMarkerIcon;
};

type GoogleMapInstance = {
  panTo: (position: GeoPoint) => void;
  setZoom: (zoom: number) => void;
  fitBounds: (bounds: GoogleLatLngBounds, padding?: number) => void;
};

type GoogleMarkerInstance = {
  setMap: (map: GoogleMapInstance | null) => void;
  addListener: (eventName: string, handler: () => void) => void;
};

type GoogleLatLngBounds = {
  extend: (position: GeoPoint) => void;
  isEmpty: () => boolean;
};

type GoogleMapsNamespace = {
  Map: new (
    element: HTMLElement,
    options: GoogleMapOptions,
  ) => GoogleMapInstance;
  Marker: new (options: GoogleMarkerOptions) => GoogleMarkerInstance;
  LatLngBounds: new () => GoogleLatLngBounds;
  SymbolPath: {
    CIRCLE: unknown;
  };
};

type GoogleWindow = {
  maps: GoogleMapsNamespace;
};

declare global {
  interface Window {
    google?: GoogleWindow;
  }
}

const config = useRuntimeConfig();

const googleMapsApiKey = computed(() => {
  return String(config.public.googleMapsApiKey || "");
});

const mapRef = ref<HTMLElement | null>(null);
const googleMap = ref<GoogleMapInstance | null>(null);
const googleMarkers = ref<GoogleMarkerInstance[]>([]);
const mapLoadError = ref(false);

const keyword = ref("");
const selectedStoreMode = ref<StoreMode>("");
const selectedRegion = ref("all");
const selectedStoreId = ref<number | null>(null);
const userLocation = ref<GeoPoint | null>(null);
const locationStatus = ref<LocationStatus>("idle");

// TODO: 目前 stores.vue 先從 data/storeServices.ts 共用門市假資料。
// 之後接後端時，建議改成：apis/stores.ts -> request -> server/api/stores。
// 後端資料表建議：
// 1. stores table：門市基本資料、地址、電話、營業時間、圖片、經緯度。
// 2. store_services table：服務名稱、slug、描述、詳情、圖片、特色。
// 3. store_service_locations 關聯表：記錄哪些門市提供哪些服務。
// 不建議正式 DB 只把 services 存成字串陣列，因為後續服務改名、排序、詳情頁、篩選都會比較不好維護。
const { data: storesResponse } = await useAsyncData("stores", () =>
  getStores(),
);
const { data: storeServicesResponse } = await useAsyncData(
  "store-services:all",
  () => getStoreServices(),
);

const stores: StoreItem[] = storesResponse.value?.Data.data ?? storeLocations;
const availableStoreServices =
  storeServicesResponse.value?.Data.data ?? fallbackStoreServices;

const storeModeOptions: SelectOption[] = [
  {
    label: "請選擇門市",
    value: "",
  },
  {
    label: "鄰近門市",
    value: "nearby",
  },
  {
    label: "全部門市",
    value: "all",
  },
  ...availableStoreServices.map((service) => ({
    label: service.title,
    value: service.slug,
  })),
];

const regionOptions: SelectOption[] = [
  {
    label: "全部地區",
    value: "all",
  },
  {
    label: "台北市",
    value: "taipei",
  },
  {
    label: "新北市",
    value: "newtaipei",
  },
  {
    label: "桃園市",
    value: "taoyuan",
  },
  {
    label: "台中市",
    value: "taichung",
  },
  {
    label: "高雄市",
    value: "kaohsiung",
  },
];

const selectedStore = computed(() => {
  return stores.find((store) => store.id === selectedStoreId.value) ?? null;
});

const selectedModeLabel = computed(() => {
  return (
    storeModeOptions.find((option) => option.value === selectedStoreMode.value)
      ?.label ?? "請選擇門市"
  );
});

const selectedRegionLabel = computed(() => {
  return (
    regionOptions.find((option) => option.value === selectedRegion.value)
      ?.label ?? "全部地區"
  );
});

const filteredStores = computed(() => {
  let result = [...stores];

  if (selectedRegion.value !== "all") {
    result = result.filter((store) => store.region === selectedRegion.value);
  }

  const currentStoreMode = selectedStoreMode.value;

  // 先確認 currentStoreMode 是真正的服務 slug，
  // 避免 ""、nearby、all 被丟進 store.services.includes()。
  if (isStoreService(currentStoreMode)) {
    result = result.filter((store) =>
      store.services.includes(currentStoreMode),
    );
  }

  if (keyword.value) {
    const normalizedKeyword = keyword.value.toLowerCase();

    result = result.filter((store) => {
      const searchableText = [
        store.name,
        store.regionLabel,
        store.address,
        store.phone,
        store.services.map((service) => getServiceLabel(service)).join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedKeyword);
    });
  }

  if (currentStoreMode === "nearby" && userLocation.value) {
    result.sort((a, b) => {
      return getDistance(a) - getDistance(b);
    });
  }

  return result;
});

const fallbackMapStores = computed(() => {
  return filteredStores.value.length ? filteredStores.value : stores;
});

onMounted(async () => {
  requestUserLocation();
  await nextTick();
  await initGoogleMap();
});

watch(
  () => filteredStores.value.map((store) => store.id).join(","),
  async () => {
    await nextTick();
    renderGoogleMarkers();

    if (
      !filteredStores.value.some((store) => store.id === selectedStoreId.value)
    ) {
      selectedStoreId.value = filteredStores.value[0]?.id ?? null;
    }
  },
);

watch(selectedStoreId, () => {
  focusGoogleMapOnSelectedStore();
});

function isStoreService(value: StoreMode): value is StoreService {
  return availableStoreServices.some((service) => service.slug === value);
}

function applyDefaultTaipeiRegion() {
  selectedStoreMode.value = "";
  selectedRegion.value = "taipei";

  const firstTaipeiStore = stores.find((store) => store.region === "taipei");
  selectedStoreId.value = firstTaipeiStore?.id ?? null;

  void nextTick(() => {
    renderGoogleMarkers();
    fitGoogleMapBounds();
    focusGoogleMapOnSelectedStore();
  });
}

function requestUserLocation() {
  if (!import.meta.client) {
    return;
  }

  if (!navigator.geolocation) {
    locationStatus.value = "unsupported";
    applyDefaultTaipeiRegion();
    return;
  }

  locationStatus.value = "requesting";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      locationStatus.value = "granted";
      selectedStoreMode.value = "nearby";
      selectedRegion.value = "all";

      const nearestStore = [...stores].sort(
        (a, b) => getDistance(a) - getDistance(b),
      )[0];

      selectedStoreId.value = nearestStore?.id ?? null;

      renderGoogleMarkers();
      focusGoogleMapOnSelectedStore();
    },
    () => {
      locationStatus.value = "denied";
      userLocation.value = null;

      // 無法取得定位時，預設切到台北市，
      // 讓右側列表與左側地圖都依照 filteredStores 流程限縮到台北門市。
      applyDefaultTaipeiRegion();
    },
    {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 1000 * 60 * 5,
    },
  );
}

async function initGoogleMap() {
  if (!import.meta.client || !mapRef.value || !googleMapsApiKey.value) {
    return;
  }

  try {
    await loadGoogleMapsScript();

    const google = window.google;

    if (!google?.maps || !mapRef.value) {
      return;
    }

    googleMap.value = new google.maps.Map(mapRef.value, {
      center: getInitialMapCenter(),
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false,
    });

    renderGoogleMarkers();
  } catch {
    mapLoadError.value = true;
  }
}

function loadGoogleMapsScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.google?.maps) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      "#google-maps-script",
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve());
      existingScript.addEventListener("error", () =>
        reject(new Error("Google Maps 載入失敗")),
      );
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey.value}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps 載入失敗"));

    document.head.appendChild(script);
  });
}

function renderGoogleMarkers() {
  if (!import.meta.client || !googleMap.value || !window.google?.maps) {
    return;
  }

  googleMarkers.value.forEach((marker) => marker.setMap(null));
  googleMarkers.value = [];

  const google = window.google;

  filteredStores.value.forEach((store) => {
    if (!googleMap.value) {
      return;
    }

    const marker = new google.maps.Marker({
      position: {
        lat: store.lat,
        lng: store.lng,
      },
      map: googleMap.value,
      title: store.name,
    });

    marker.addListener("click", () => {
      selectStore(store);
    });

    googleMarkers.value.push(marker);
  });

  if (userLocation.value && googleMap.value) {
    const userMarker = new google.maps.Marker({
      position: userLocation.value,
      map: googleMap.value,
      title: "你的位置",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
        fillColor: "#1f2937",
        fillOpacity: 1,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });

    googleMarkers.value.push(userMarker);
  }

  fitGoogleMapBounds();
}

function fitGoogleMapBounds() {
  if (!googleMap.value || !window.google?.maps) {
    return;
  }

  const google = window.google;
  const bounds = new google.maps.LatLngBounds();

  filteredStores.value.forEach((store) => {
    bounds.extend({
      lat: store.lat,
      lng: store.lng,
    });
  });

  if (userLocation.value) {
    bounds.extend(userLocation.value);
  }

  if (!bounds.isEmpty()) {
    googleMap.value.fitBounds(bounds, 64);
  }
}

function focusGoogleMapOnSelectedStore() {
  if (!selectedStore.value || !googleMap.value) {
    return;
  }

  googleMap.value.panTo({
    lat: selectedStore.value.lat,
    lng: selectedStore.value.lng,
  });

  googleMap.value.setZoom(15);
}

function getInitialMapCenter() {
  if (userLocation.value) {
    return userLocation.value;
  }

  const firstStore = filteredStores.value[0] ?? stores[0];

  return {
    lat: firstStore?.lat ?? 25.033,
    lng: firstStore?.lng ?? 121.5654,
  };
}

function selectStore(store: StoreItem) {
  selectedStoreId.value = store.id;
  focusGoogleMapOnSelectedStore();
}

function clearFilters() {
  keyword.value = "";
  selectedStoreMode.value = locationStatus.value === "granted" ? "nearby" : "";
  selectedRegion.value = locationStatus.value === "granted" ? "all" : "taipei";

  selectedStoreId.value = filteredStores.value[0]?.id ?? null;

  void nextTick(() => {
    renderGoogleMarkers();
    fitGoogleMapBounds();
    focusGoogleMapOnSelectedStore();
  });
}

function getServiceLabel(service: StoreService) {
  return (
    availableStoreServices.find((item) => item.slug === service)?.title ??
    service
  );
}

function getDistance(store: StoreItem) {
  if (!userLocation.value) {
    return Number.POSITIVE_INFINITY;
  }

  return calculateDistance(
    userLocation.value.lat,
    userLocation.value.lng,
    store.lat,
    store.lng,
  );
}

function getDistanceText(store: StoreItem) {
  if (!userLocation.value) {
    return "";
  }

  const distance = getDistance(store);

  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }

  return `${distance.toFixed(1)} km`;
}

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function getFallbackPinStyle(store: StoreItem) {
  const targetStores = fallbackMapStores.value;
  const lats = targetStores.map((item) => item.lat);
  const lngs = targetStores.map((item) => item.lng);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const lngRange = maxLng - minLng || 1;
  const latRange = maxLat - minLat || 1;

  const left = 15 + ((store.lng - minLng) / lngRange) * 70;
  const top = 15 + ((maxLat - store.lat) / latRange) * 70;

  return {
    left: `${left}%`,
    top: `${top}%`,
  };
}

function openGoogleNavigation(store: StoreItem) {
  if (!import.meta.client) {
    return;
  }

  const destination = encodeURIComponent(`${store.lat},${store.lng}`);

  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    "_blank",
  );
}

async function copyAddress(store: StoreItem) {
  if (!import.meta.client || !navigator.clipboard) {
    return;
  }

  await navigator.clipboard.writeText(store.address);
}
</script>
