<template>
  <main class="min-h-screen bg-stone-50 text-stone-950">
    <template v-if="activity">
      <!-- Hero Image -->
      <section class="bg-stone-100">
        <img
          :src="activity.heroImage"
          :alt="activity.title"
          class="h-[58vh] w-full object-cover"
        />
      </section>

      <section class="mx-auto py-8">
        <!-- Breadcrumb + Share：同一行，左麵包屑、右分享 -->
        <div
          class="flex items-center justify-between gap-4 border-b border-stone-200 pb-8"
        >
          <nav class="flex min-w-0 items-center gap-2 text-sm text-stone-500">
            <NuxtLink to="/" class="shrink-0 transition hover:text-stone-900">
              首頁
            </NuxtLink>

            <span class="shrink-0">/</span>

            <NuxtLink
              to="/activity"
              class="shrink-0 transition hover:text-stone-900"
            >
              活動消息
            </NuxtLink>

            <span class="shrink-0">/</span>

            <span class="truncate font-medium text-stone-900">
              {{ activity.title }}
            </span>
          </nav>

          <div class="flex shrink-0 items-center gap-3">
            <span class="hidden text-sm text-stone-400 sm:inline"> Share </span>

            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center text-stone-500 transition hover:border-stone-900 hover:text-stone-950"
              aria-label="複製連結"
              @click="copyPageUrl"
            >
              <Icon name="lucide:link" class="h-4 w-4" />
            </button>

            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center text-stone-500 transition hover:border-stone-900 hover:text-stone-950"
              aria-label="分享"
              @click="sharePage"
            >
              <Icon name="lucide:share-2" class="h-4 w-4" />
            </button>
          </div>
        </div>

        <!-- Article Layout：左文章、右其他活動 -->
        <div class="activity-article-layout mt-10">
          <!-- Left Article Column -->
          <article class="min-w-0">
            <!-- Article Header -->
            <header class="max-w-4xl">
              <p class="text-sm font-semibold tracking-[0.28em] text-stone-400">
                {{ activity.category }}
              </p>

              <h1
                class="mt-5 text-4xl font-semibold leading-tight tracking-tight text-stone-950 lg:text-5xl"
              >
                {{ activity.title }}
              </h1>

              <p class="mt-6 max-w-3xl text-base leading-8 text-stone-500">
                {{ activity.description }}
              </p>

              <div
                class="mt-8 flex flex-wrap items-center gap-3 text-sm text-stone-400"
              >
                <span>{{ activity.date }}</span>
                <span>・</span>
                <span>{{ activity.readTime }}</span>
                <span>・</span>
                <span>{{ activity.location }}</span>
              </div>
            </header>

            <!-- Article Body -->
            <div v-if="activity.content.length" class="mt-12 space-y-9">
              <template
                v-for="(block, index) in activity.content"
                :key="`${block.type}-${index}`"
              >
                <p
                  v-if="block.type === 'paragraph'"
                  class="max-w-3xl text-base leading-8 text-stone-600"
                >
                  {{ block.content }}
                </p>

                <h2
                  v-else-if="block.type === 'heading'"
                  class="max-w-3xl pt-4 text-2xl font-semibold tracking-tight text-stone-950"
                >
                  {{ block.content }}
                </h2>

                <blockquote
                  v-else-if="block.type === 'quote'"
                  class="max-w-3xl border-l-2 border-stone-900 pl-6 text-xl font-medium leading-9 text-stone-950"
                >
                  {{ block.content }}

                  <p
                    v-if="block.author"
                    class="mt-4 text-sm font-normal text-stone-400"
                  >
                    — {{ block.author }}
                  </p>
                </blockquote>

                <figure
                  v-else-if="block.type === 'image'"
                  class="space-y-3"
                  :class="getImageBlockClass(block.size)"
                >
                  <img
                    :src="block.src"
                    :alt="block.alt"
                    class="w-full object-cover"
                    :class="
                      block.size === 'normal' ? 'aspect-video' : 'aspect-21/9'
                    "
                  />

                  <figcaption
                    v-if="block.caption"
                    class="text-sm text-stone-400"
                  >
                    {{ block.caption }}
                  </figcaption>
                </figure>

                <section
                  v-else-if="block.type === 'textImage'"
                  class="grid gap-6 border-y border-stone-200 py-8 md:grid-cols-2 md:items-center"
                >
                  <div
                    class="space-y-4"
                    :class="block.imagePosition === 'left' ? 'md:order-2' : ''"
                  >
                    <h3
                      v-if="block.title"
                      class="text-2xl font-semibold tracking-tight text-stone-950"
                    >
                      {{ block.title }}
                    </h3>

                    <p class="text-base leading-8 text-stone-600">
                      {{ block.content }}
                    </p>
                  </div>

                  <figure
                    class="space-y-3"
                    :class="block.imagePosition === 'left' ? 'md:order-1' : ''"
                  >
                    <img
                      :src="block.image.src"
                      :alt="block.image.alt"
                      class="aspect-4/3 w-full object-cover"
                    />

                    <figcaption
                      v-if="block.image.caption"
                      class="text-sm text-stone-400"
                    >
                      {{ block.image.caption }}
                    </figcaption>
                  </figure>
                </section>

                <section
                  v-else-if="block.type === 'gallery'"
                  class="grid gap-5"
                  :class="
                    block.columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
                  "
                >
                  <figure
                    v-for="image in block.images"
                    :key="image.src"
                    class="space-y-3"
                  >
                    <img
                      :src="image.src"
                      :alt="image.alt"
                      class="aspect-4/3 w-full object-cover"
                    />

                    <figcaption
                      v-if="image.caption"
                      class="text-sm text-stone-400"
                    >
                      {{ image.caption }}
                    </figcaption>
                  </figure>
                </section>

                <section
                  v-else-if="block.type === 'list'"
                  class="max-w-3xl"
                >
                  <h3
                    v-if="block.title"
                    class="text-lg font-semibold text-stone-950"
                  >
                    {{ block.title }}
                  </h3>

                  <ul class="mt-4 space-y-3">
                    <li
                      v-for="item in block.items"
                      :key="item"
                      class="flex gap-3 text-base leading-7 text-stone-600"
                    >
                      <span
                        class="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-900"
                      />
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </section>

                <section
                  v-else-if="block.type === 'callout'"
                  class="max-w-3xl border border-stone-200 bg-white p-6"
                >
                  <p
                    v-if="block.title"
                    class="text-sm font-semibold tracking-[0.22em] text-stone-400"
                  >
                    {{ block.title }}
                  </p>

                  <p class="mt-3 text-base leading-8 text-stone-700">
                    {{ block.content }}
                  </p>
                </section>
              </template>
            </div>

            <div
              v-else
              class="mt-12 max-w-3xl border border-dashed border-stone-300 bg-white p-8"
            >
              <p class="text-lg font-medium text-stone-950">文章內容整理中</p>

              <p class="mt-2 text-sm leading-7 text-stone-500">
                這篇活動目前已有卡片與摘要資料，但尚未建立詳細文章內容。
              </p>
            </div>

            <div class="mt-14 border-t border-stone-200 pt-8">
              <NuxtLink
                to="/activity"
                class="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-stone-950"
              >
                <Icon name="lucide:arrow-left" class="h-4 w-4" />
                回活動列表
              </NuxtLink>
            </div>
          </article>

          <!-- Right Related Aside -->
          <aside class="min-w-0 lg:sticky lg:top-24 lg:h-fit">
            <div class="border-b border-stone-200 pb-4">
              <p class="text-sm font-semibold tracking-[0.24em] text-stone-500">
                OTHER ACTIVITIES
              </p>
            </div>

            <div class="divide-y divide-stone-200">
              <NuxtLink
                v-for="item in relatedActivities"
                :key="item.id"
                :to="item.to"
                class="group block min-w-0 py-6"
              >
                <div class="overflow-hidden bg-stone-100">
                  <img
                    :src="item.thumbnail"
                    :alt="item.title"
                    class="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <p
                  class="mt-4 text-xs font-semibold tracking-[0.22em] text-stone-400"
                >
                  {{ item.category }}
                </p>

                <h3
                  class="mt-2 break-keep text-lg font-semibold leading-snug tracking-tight text-stone-950 transition group-hover:text-stone-500"
                >
                  {{ item.title }}
                </h3>

                <div
                  class="mt-4 flex items-center justify-between text-xs text-stone-400"
                >
                  <span>{{ item.date }}</span>

                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 transition group-hover:translate-x-1 group-hover:text-stone-950"
                  />
                </div>
              </NuxtLink>
            </div>
          </aside>
        </div>
      </section>
    </template>

    <section v-else class="mx-auto py-20 text-center">
      <p class="text-lg font-medium text-stone-950">找不到這個活動</p>

      <p class="mt-2 text-sm text-stone-500">活動可能已下架，或網址不正確。</p>

      <NuxtLink
        to="/activity"
        class="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
      >
        回活動列表
      </NuxtLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getActivityDetail } from "~/apis/activity";
import type {
  ActivityContentBlock,
  ActivityDetail,
} from "~/types/activity";

const route = useRoute();

const currentId = computed(() => {
  const id = route.params.id;

  if (Array.isArray(id)) {
    return id[0] ?? "";
  }

  return id ?? "";
});

const { data: activityResponse } = await useAsyncData(
  "activity-detail",
  () => getActivityDetail(currentId.value),
  {
    watch: [currentId],
  },
);

const detailData = computed(() => activityResponse.value?.Data ?? null);
const activity = computed<ActivityDetail | null>(() => {
  return detailData.value?.activity ?? null;
});
const relatedActivities = computed(() => {
  return detailData.value?.relatedActivities ?? [];
});

useSeoMeta({
  title: () => {
    return activity.value ? activity.value.title : "找不到活動";
  },
  description: () => {
    return activity.value?.description ?? "活動可能已下架，或網址不正確。";
  },
});

function getImageBlockClass(size?: Extract<ActivityContentBlock, { type: "image" }>["size"]) {
  if (size === "wide") {
    return "max-w-none";
  }

  return "max-w-3xl";
}

async function copyPageUrl() {
  if (!import.meta.client || !navigator.clipboard) {
    return;
  }

  await navigator.clipboard.writeText(window.location.href);
}

async function sharePage() {
  if (!import.meta.client || !activity.value) {
    return;
  }

  if (navigator.share) {
    await navigator.share({
      title: activity.value.title,
      text: activity.value.description,
      url: window.location.href,
    });

    return;
  }

  await copyPageUrl();
}
</script>

<style scoped>
.activity-article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3rem;
}

@media (min-width: 1024px) {
  .activity-article-layout {
    grid-template-columns: minmax(0, 4fr) minmax(0, 1fr);
    align-items: start;
  }
}
</style>
