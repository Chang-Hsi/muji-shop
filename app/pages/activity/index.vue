<template>
  <main class="min-h-screen bg-stone-50 text-stone-950">
    <section class="mx-auto py-8">
      <nav class="flex items-center gap-2 text-sm text-stone-500">
        <NuxtLink to="/" class="transition hover:text-stone-900">
          首頁
        </NuxtLink>

        <span>/</span>

        <span class="font-medium text-stone-900">
          活動消息
        </span>
      </nav>

      <!-- HeroSection -->
      <section class="mt-10">
        <div
          class="flex flex-col gap-4 border-b border-stone-200 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p class="text-sm tracking-[0.3em] text-stone-400">
              ACTIVITY
            </p>

            <h1 class="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
              活動消息
            </h1>
          </div>
        </div>

        <div
          class="mt-10 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.55fr)_minmax(300px,0.55fr)]"
        >
          <NuxtLink
            v-if="heroArticle"
            :to="heroArticle.to"
            class="group block"
          >
            <div class="overflow-hidden bg-stone-100">
              <img
                :src="heroArticle.image"
                :alt="heroArticle.title"
                class="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105"
              >
            </div>

            <div class="mt-5">
              <p class="text-xs font-semibold tracking-[0.22em] text-stone-400">
                {{ heroArticle.category }}
              </p>

              <h2
                class="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-stone-950 transition group-hover:text-stone-500"
              >
                {{ heroArticle.title }}
              </h2>

              <p class="mt-4 max-w-xl text-sm leading-7 text-stone-500">
                {{ heroArticle.description }}
              </p>

              <p class="mt-5 text-xs font-medium text-stone-400">
                {{ heroArticle.date }} ・ {{ heroArticle.readTime }}
              </p>
            </div>
          </NuxtLink>

          <div class="space-y-8 border-stone-200 xl:border-x xl:px-6">
            <NuxtLink
              v-for="article in middleArticles"
              :key="article.id"
              :to="article.to"
              class="group block"
            >
              <div class="overflow-hidden bg-stone-100">
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105"
                >
              </div>

              <div class="mt-4">
                <p class="text-xs font-semibold tracking-[0.22em] text-stone-700">
                  {{ article.category }}
                </p>

                <h3
                  class="mt-2 text-xl font-semibold leading-snug tracking-tight text-stone-950 transition group-hover:text-stone-500"
                >
                  {{ article.title }}
                </h3>

                <p class="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
                  {{ article.description }}
                </p>

                <p class="mt-4 text-xs font-medium text-stone-400">
                  {{ article.date }} ・ {{ article.readTime }}
                </p>
              </div>
            </NuxtLink>
          </div>

          <div class="divide-y divide-stone-200">
            <NuxtLink
              v-for="article in sideArticles"
              :key="article.id"
              :to="article.to"
              class="group block py-5 first:pt-0"
            >
              <p class="text-xs font-semibold tracking-[0.22em] text-stone-700">
                {{ article.category }}
              </p>

              <h3
                class="mt-2 text-lg font-semibold leading-snug tracking-tight text-stone-950 transition group-hover:text-stone-500"
              >
                {{ article.title }}
              </h3>

              <p class="mt-3 line-clamp-2 text-sm leading-6 text-stone-500">
                {{ article.description }}
              </p>

              <div
                class="mt-4 flex items-center justify-between text-xs font-medium text-stone-400"
              >
                <span>{{ article.date }} ・ {{ article.readTime }}</span>

                <Icon
                  name="lucide:arrow-right"
                  class="h-4 w-4 transition group-hover:translate-x-1 group-hover:text-stone-950"
                />
              </div>
            </NuxtLink>
          </div>
        </div>
      </section>
    </section>

    <!-- FeatureSection -->
    <section v-if="featureArticle" class="mt-16 bg-[#0b1d66] text-white">
      <div
        class="relative mx-auto grid grid-cols-1 gap-10 overflow-hidden py-16 pl-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:items-center"
      >
        <div class="relative z-10">
          <p class="text-sm tracking-[0.3em] text-white/50">
            {{ featureArticle.category }}
          </p>

          <h2
            class="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight lg:text-4xl"
          >
            {{ featureArticle.title }}
          </h2>

          <p class="mt-6 max-w-2xl text-sm leading-7 text-white/75">
            {{ featureArticle.description }}
          </p>

          <NuxtLink
            :to="featureArticle.to"
            class="mt-8 inline-flex h-12 items-center justify-center bg-cyan-500 px-8 text-sm font-semibold tracking-[0.16em] text-white transition hover:bg-cyan-400"
          >
            EXPLORE PROJECT
          </NuxtLink>
        </div>

        <div class="relative z-10 overflow-hidden">
          <img
            :src="featureArticle.image"
            :alt="featureArticle.title"
            class="aspect-video w-full object-cover"
          >
        </div>

        <div
          class="absolute right-0 top-0 h-28 w-28 bg-cyan-500 [clip-path:polygon(100%_0,0_0,100%_100%)]"
        />
      </div>
    </section>

    <!-- LatestSection -->
    <section class="mx-auto py-16">
      <div class="border-y border-stone-200 py-6 text-center">
        <p class="text-sm font-semibold tracking-[0.24em] text-stone-600">
          THE LATEST
        </p>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div class="divide-y divide-stone-200">
          <NuxtLink
            v-for="article in filteredLatestArticles"
            :key="article.id"
            :to="article.to"
            class="group grid grid-cols-1 gap-5 py-7 md:grid-cols-[minmax(0,1fr)_160px]"
          >
            <div>
              <p class="text-xs font-semibold tracking-[0.22em] text-stone-700">
                {{ article.category }}
              </p>

              <h3
                class="mt-3 max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-stone-950 transition group-hover:text-stone-500"
              >
                {{ article.title }}
              </h3>

              <p class="mt-4 text-xs font-medium text-stone-400">
                {{ article.date }} ・ {{ article.readTime }}
              </p>
            </div>

            <div class="overflow-hidden bg-stone-100">
              <img
                :src="article.image"
                :alt="article.title"
                class="aspect-4/3 w-full object-cover transition duration-700 group-hover:scale-105"
              >
            </div>
          </NuxtLink>
        </div>

        <aside v-if="surveyArticle" class="lg:sticky lg:top-24 lg:h-fit">
          <NuxtLink
            :to="surveyArticle.to"
            class="group block overflow-hidden rounded-2xl text-white shadow-sm"
          >
            <div class="relative">
              <img
                :src="surveyArticle.image"
                :alt="surveyArticle.title"
                class="aspect-3/4 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
              >

              <div class="absolute inset-0 bg-linear-to-t via-[#0b1d66]/30 to-transparent" />

              <div class="absolute inset-x-0 bottom-0 p-7">
                <p class="text-sm tracking-[0.22em] text-cyan-300">
                  {{ surveyArticle.category }}
                </p>

                <h3 class="mt-4 text-3xl font-semibold leading-tight">
                  {{ surveyArticle.title }}
                </h3>

                <div class="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  查看活動
                  <Icon
                    name="lucide:arrow-right"
                    class="h-4 w-4 transition group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          </NuxtLink>
        </aside>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getActivities } from "~/apis/activity";
import type { ActivityCategory } from "~/types/activity";

const selectedCategory = ref<ActivityCategory>("all");

const { data: activitiesResponse } = await useAsyncData(
  "activities",
  () => getActivities(),
);

const activityData = computed(() => activitiesResponse.value?.Data ?? null);
const heroArticle = computed(() => activityData.value?.heroArticle ?? null);
const middleArticles = computed(() => activityData.value?.middleArticles ?? []);
const sideArticles = computed(() => activityData.value?.sideArticles ?? []);
const latestArticles = computed(() => activityData.value?.latestArticles ?? []);
const featureArticle = computed(() => activityData.value?.featureArticle ?? null);
const surveyArticle = computed(() => activityData.value?.surveyArticle ?? null);

useSeoMeta({
  title: "活動消息",
  description: "查看最新活動、生活提案、會員專屬企劃與品牌消息。",
});

const filteredLatestArticles = computed(() => {
  if (selectedCategory.value === "all") {
    return latestArticles.value;
  }

  return latestArticles.value.filter((article) => {
    return article.categoryValue === selectedCategory.value;
  });
});
</script>
