<template>
  <main class="min-h-screen text-stone-950">
    <section class="mx-auto max-w-6xl px-6 py-12">
      <nav class="flex items-center gap-2 text-sm text-stone-500">
        <NuxtLink to="/" class="transition hover:text-stone-900">
          首頁
        </NuxtLink>

        <span>/</span>

        <span class="font-medium text-stone-900"> 公告 </span>
      </nav>

      <h1 class="mt-8 text-3xl font-extrabold tracking-tight text-stone-950">
        公告
      </h1>

      <div
        class="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12"
      >
        <!-- Left Year Month -->
        <aside class="lg:sticky lg:top-28 lg:h-fit">
          <div class="announcement-date-switcher">
            <Transition :name="monthTransitionName" mode="out-in">
              <div
                v-if="activeGroup"
                :key="activeGroup.key"
                class="announcement-date-panel"
              >
                <span class="announcement-date-year">
                  {{ activeGroup.year }}
                </span>

                <span class="announcement-date-month">
                  {{ activeGroup.month }}
                </span>
              </div>
            </Transition>
          </div>
        </aside>

        <!-- Right Announcement List -->
        <div ref="listRoot" class="min-w-0">
          <section
            v-for="group in announcementGroups"
            :key="group.key"
            :data-announcement-group="group.key"
            class="announcement-group-section"
          >
            <h2 class="sr-only">
              {{ group.year }} 年 {{ group.month }} 月公告
            </h2>

            <div>
              <NuxtLink
                v-for="item in group.items"
                :key="item.id"
                :to="`/announcement/${item.id}`"
                class="group flex h-24 flex-col justify-center"
              >
                <p class="text-sm leading-none text-stone-400">
                  {{ item.date }}
                </p>

                <h3
                  class="mt-3 line-clamp-2 text-lg leading-7 tracking-tight text-stone-950 transition group-hover:text-stone-500"
                >
                  {{ item.title }}
                </h3>
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { getAnnouncements } from "~/apis/announcement";

const activeGroupKey = ref("");
const scrollDirection = ref<"up" | "down">("down");
const listRoot = ref<HTMLElement | null>(null);

let ticking = false;
let lastScrollY = 0;

useSeoMeta({
  title: "公告",
  description: "查看最新公告、服務通知、門市資訊與活動消息。",
});

const { data: announcementsResponse } = await useAsyncData(
  "announcements",
  () => getAnnouncements(),
);

const announcementGroups = computed(() => {
  return announcementsResponse.value?.Data.groups ?? [];
});

const activeGroup = computed(() => {
  return (
    announcementGroups.value.find((group) => {
      return group.key === activeGroupKey.value;
    }) ?? null
  );
});

const monthTransitionName = computed(() => {
  return scrollDirection.value === "down"
    ? "month-slide-up"
    : "month-slide-down";
});

onMounted(async () => {
  const firstGroup = announcementGroups.value[0];

  activeGroupKey.value = firstGroup?.key ?? "";

  await nextTick();

  lastScrollY = window.scrollY;

  updateActiveGroup();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  window.addEventListener("resize", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleScroll);
});

function handleScroll() {
  const currentScrollY = window.scrollY;

  scrollDirection.value = currentScrollY >= lastScrollY ? "down" : "up";
  lastScrollY = currentScrollY;

  if (ticking) {
    return;
  }

  ticking = true;

  window.requestAnimationFrame(() => {
    updateActiveGroup();
    ticking = false;
  });
}

function updateActiveGroup() {
  if (!listRoot.value || !announcementGroups.value.length) {
    return;
  }

  const switchLine = 140;
  const groupElements = Array.from(
    listRoot.value.querySelectorAll<HTMLElement>("[data-announcement-group]"),
  );

  const firstGroup = announcementGroups.value[0];

  let nextActiveGroupKey = firstGroup?.key ?? "";

  groupElements.forEach((groupElement) => {
    const groupTop = groupElement.getBoundingClientRect().top;
    const groupKey = groupElement.dataset.announcementGroup;

    if (groupTop <= switchLine && groupKey) {
      nextActiveGroupKey = groupKey;
    }
  });

  if (nextActiveGroupKey && nextActiveGroupKey !== activeGroupKey.value) {
    activeGroupKey.value = nextActiveGroupKey;
  }
}
</script>

<style scoped>
.announcement-date-switcher {
  position: relative;
  height: 64px;
  overflow: hidden;
}

.announcement-date-panel {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  align-items: baseline;
  gap: 20px;
  line-height: 1;
}

.announcement-date-year {
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgb(231 229 228);
}

.announcement-date-month {
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgb(214 211 209);
}

.announcement-group-section {
  scroll-margin-top: 140px;
}

.announcement-group-section + .announcement-group-section {
  margin-top: 0;
}

.announcement-group-section:last-child {
  padding-bottom: 0;
}

.month-slide-up-enter-active,
.month-slide-up-leave-active,
.month-slide-down-enter-active,
.month-slide-down-leave-active {
  transition:
    transform 0.36s ease,
    opacity 0.36s ease;
}

.month-slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.month-slide-up-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.month-slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.month-slide-down-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

@media (max-width: 1023px) {
  .announcement-date-switcher {
    height: 48px;
  }

  .announcement-date-year,
  .announcement-date-month {
    font-size: 32px;
  }
}
</style>
