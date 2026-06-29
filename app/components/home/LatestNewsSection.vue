<script setup lang="ts">
type NewsItem = {
  id: number;
  html: string;
  image?: string;
  to?: string;
};

type NewsSegmentType = "text" | "strong" | "b";

type NewsSegment = {
  type: NewsSegmentType;
  text: string;
};

type SlideDirection = "next" | "prev";

const props = withDefaults(
  defineProps<{
    newsItems: NewsItem[];
    intervalMs?: number;
  }>(),
  {
    intervalMs: 5000,
  },
);

const activeIndex = ref(0);
const slideDirection = ref<SlideDirection>("next");

let timer: number | null = null;

const activeNews = computed(() => {
  return props.newsItems[activeIndex.value] || props.newsItems[0] || null;
});

const activeNewsSegments = computed(() => {
  if (!activeNews.value) {
    return [];
  }

  return parseNewsHtml(activeNews.value.html);
});

function nextNews() {
  if (props.newsItems.length <= 1) {
    return;
  }

  slideDirection.value = "next";
  activeIndex.value = (activeIndex.value + 1) % props.newsItems.length;
}

function prevNews() {
  if (props.newsItems.length <= 1) {
    return;
  }

  slideDirection.value = "prev";
  activeIndex.value =
    (activeIndex.value - 1 + props.newsItems.length) % props.newsItems.length;
}

function startAutoPlay() {
  stopAutoPlay();

  if (props.newsItems.length <= 1) {
    return;
  }

  timer = window.setInterval(() => {
    nextNews();
  }, props.intervalMs);
}

function stopAutoPlay() {
  if (timer === null) {
    return;
  }

  window.clearInterval(timer);
  timer = null;
}

function parseNewsHtml(html: string): NewsSegment[] {
  const segments: NewsSegment[] = [];
  const tagRegex = /<(strong|b)\b[^>]*>(.*?)<\/\1>/gis;

  let lastIndex = 0;
  let match: RegExpExecArray | null = tagRegex.exec(html);

  while (match) {
    const beforeText = cleanHtmlText(html.slice(lastIndex, match.index));

    if (beforeText) {
      segments.push({
        type: "text",
        text: beforeText,
      });
    }

    const tagName = match[1]?.toLowerCase();

    if (tagName === "strong" || tagName === "b") {
      const tagText = cleanHtmlText(match[2] || "");

      if (tagText) {
        segments.push({
          type: tagName,
          text: tagText,
        });
      }
    }

    lastIndex = match.index + match[0].length;
    match = tagRegex.exec(html);
  }

  const afterText = cleanHtmlText(html.slice(lastIndex));

  if (afterText) {
    segments.push({
      type: "text",
      text: afterText,
    });
  }

  return segments;
}

function cleanHtmlText(value: string) {
  return decodeHtmlEntity(value.replace(/<[^>]*>/g, ""));
}

function decodeHtmlEntity(value: string) {
  const entityMap: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
  };

  return value.replace(
    /&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g,
    (entity) => entityMap[entity] || entity,
  );
}

function getSegmentTag(type: NewsSegmentType) {
  if (type === "strong") {
    return "strong";
  }

  if (type === "b") {
    return "b";
  }

  return "span";
}

function getSegmentClass(type: NewsSegmentType) {
  if (type === "strong") {
    return "mr-3 inline-flex shrink-0 bg-red-900 px-3 py-1 text-base font-bold text-white";
  }

  if (type === "b") {
    return "font-bold text-red-900";
  }

  return "";
}

onMounted(() => {
  startAutoPlay();
});

onBeforeUnmount(() => {
  stopAutoPlay();
});

watch(
  () => props.newsItems.length,
  () => {
    activeIndex.value = 0;
    startAutoPlay();
  },
);

watch(
  () => props.intervalMs,
  () => {
    startAutoPlay();
  },
);
</script>

<template>
  <section
    v-if="activeNews"
    class="mt-12"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <div class="mb-8 flex items-end justify-between">
      <div>
        <p class="text-sm tracking-[0.3em] text-neutral-400">NEWS</p>

        <h2 class="mt-2 text-2xl font-light text-neutral-900">
          最新消息
        </h2>
      </div>
    </div>

    <div
      class="flex min-h-18 items-center gap-4 border border-stone-200 bg-white px-4 shadow-sm"
    >
      <button
        type="button"
        class="flex size-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition hover:bg-stone-100 hover:text-neutral-900"
        aria-label="上一則最新消息"
        @click="prevNews"
      >
        <Icon name="lucide:chevron-left" class="size-5" />
      </button>

      <div class="min-w-0 flex-1 overflow-hidden">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-x-0 opacity-100"
          :enter-from-class="
            slideDirection === 'next'
              ? 'translate-x-8 opacity-0'
              : '-translate-x-8 opacity-0'
          "
          :leave-to-class="
            slideDirection === 'next'
              ? '-translate-x-8 opacity-0'
              : 'translate-x-8 opacity-0'
          "
        >
          <NuxtLink
            v-if="activeNews.to"
            :key="`link-${activeNews.id}`"
            :to="activeNews.to"
            class="block min-w-0"
          >
            <div class="flex min-w-0 items-center justify-center gap-4">
              <div
                class="min-w-0 truncate text-center text-lg font-semibold tracking-wide text-neutral-900"
              >
                <component
                  :is="getSegmentTag(segment.type)"
                  v-for="(segment, segmentIndex) in activeNewsSegments"
                  :key="`${activeNews.id}-${segment.type}-${segmentIndex}`"
                  :class="getSegmentClass(segment.type)"
                >
                  {{ segment.text }}
                </component>
              </div>
            </div>
          </NuxtLink>

          <div v-else :key="`plain-${activeNews.id}`" class="block min-w-0">
            <div class="flex min-w-0 items-center justify-center gap-4">
              <img
                v-if="activeNews.image"
                :src="activeNews.image"
                :alt="`news-${activeNews.id}`"
                class="h-12 w-20 shrink-0 rounded-md object-cover"
                draggable="false"
              >

              <div
                class="min-w-0 truncate text-center text-lg font-semibold tracking-wide text-neutral-900"
              >
                <component
                  :is="getSegmentTag(segment.type)"
                  v-for="(segment, segmentIndex) in activeNewsSegments"
                  :key="`${activeNews.id}-${segment.type}-${segmentIndex}`"
                  :class="getSegmentClass(segment.type)"
                >
                  {{ segment.text }}
                </component>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <button
        type="button"
        class="flex size-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition hover:bg-stone-100 hover:text-neutral-900"
        aria-label="下一則最新消息"
        @click="nextNews"
      >
        <Icon name="lucide:chevron-right" class="size-5" />
      </button>
    </div>
  </section>
</template>
