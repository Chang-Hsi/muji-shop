<template>
  <main class="min-h-screen  text-stone-950">
    <section class="mx-auto max-w-7xl px-6 py-12">
      <nav class="flex items-center gap-2 text-sm text-stone-500">
        <NuxtLink to="/" class="transition hover:text-stone-900">
          首頁
        </NuxtLink>

        <span>/</span>

        <NuxtLink to="/announcement" class="transition hover:text-stone-900">
          公告
        </NuxtLink>

        <span>/</span>

        <span class="truncate font-medium text-stone-900">
          {{ announcement?.title ?? "公告詳情" }}
        </span>
      </nav>

      <template v-if="announcement">
        <article class="mx-auto mt-14 max-w-5xl">
          <div>
            <header class="text-center">
              <h1
                class="text-3xl font-extrabold leading-tight tracking-[0.08em] text-stone-950 px-32"
              >
                {{ announcement.title }}
              </h1>
            </header>
          </div>

          <div class="mt-16 px-14">
            <div />

            <div
              class="announcement-detail-content"
              v-html="announcement.contentHtml"
            />

            <div />
          </div>
        </article>
      </template>

      <section v-else class="py-24 text-center">
        <p class="text-lg font-medium text-stone-950">
          找不到這則公告
        </p>

        <p class="mt-2 text-sm text-stone-500">
          公告可能已下架，或網址不正確。
        </p>

        <NuxtLink
          to="/announcement"
          class="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          回公告列表
        </NuxtLink>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getAnnouncementDetail } from "~/apis/announcement";
import type { AnnouncementDetail } from "~/types/announcement";

const route = useRoute();

const currentId = computed(() => {
  const id = route.params.id;

  if (Array.isArray(id)) {
    return id[0] ?? "";
  }

  return id ?? "";
});

const { data: announcementResponse } = await useAsyncData(
  "announcement-detail",
  () => getAnnouncementDetail(currentId.value),
  {
    watch: [currentId],
  },
);

const announcement = computed<AnnouncementDetail | null>(() => {
  return announcementResponse.value?.Data.announcement ?? null;
});

useSeoMeta({
  title: () => {
    return announcement.value ? announcement.value.title : "公告詳情";
  },
  description: () => {
    return announcement.value?.title ?? "查看公告詳情";
  },
});
</script>

<style scoped>
.announcement-detail-content {
  font-size: 20px;
  line-height: 1.75;
  color: rgb(28 25 23);
}

.announcement-detail-content :deep(p) {
  margin: 0 0 28px;
}

.announcement-detail-content :deep(strong) {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.announcement-detail-content :deep(figure) {
  margin: 40px 0;
}

.announcement-detail-content :deep(img) {
  display: block;
  width: 100%;
  max-height: 520px;
  object-fit: cover;
}

.announcement-detail-content :deep(figcaption) {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: rgb(120 113 108);
}

@media (max-width: 1023px) {
  .announcement-detail-content {
    font-size: 15px;
  }
}
</style>
