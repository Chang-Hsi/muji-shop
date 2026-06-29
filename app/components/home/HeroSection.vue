<script setup lang="ts">
import type { CSSProperties } from "vue";

type HeroSlide = {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  to: string;
  image: string;
};

type HeroSlideList = [HeroSlide, ...HeroSlide[]];

const baseSlides: HeroSlideList = [
  {
    id: 1,
    label: "SIMPLE LIFE",
    title: "簡潔生活，\n從日常選品開始。",
    subtitle: "Natural daily goods",
    description: "挑選自然、耐用、沒有過度裝飾的商品，讓生活回到舒服的狀態。",
    buttonText: "查看商品",
    to: "/products",
    image:
      "https://i.pinimg.com/736x/5c/01/3c/5c013c5f8d9746699499179931dbc856.jpg",
  },
  {
    id: 2,
    label: "COTTON & LINEN",
    title: "自然穿著，\n回到舒服的樣子。",
    subtitle: "Soft basic wear",
    description: "以棉、麻與基本色系為主，選擇日常可長久穿著的衣物。",
    buttonText: "查看服飾",
    to: "/products?category=clothes",
    image:
      "https://i.pinimg.com/736x/cd/81/a5/cd81a5d83a8e02d7a74ae2749e062b65.jpg",
  },
  {
    id: 3,
    label: "HOME STORAGE",
    title: "讓收納，\n成為生活的一部分。",
    subtitle: "Calm home storage",
    description: "用簡潔的收納工具整理空間，讓居家視覺更安定。",
    buttonText: "查看生活用品",
    to: "/products?category=living",
    image:
      "https://i.pinimg.com/1200x/47/1a/7b/471a7bc2d02a44132e5cdf0afc87cd06.jpg",
  },
  {
    id: 4,
    label: "DAILY FOOD",
    title: "樸實滋味，\n每天都剛剛好。",
    subtitle: "Simple daily taste",
    description: "挑選安心、簡單、適合日常的食品與生活滋味。",
    buttonText: "查看食品",
    to: "/products?category=food",
    image:
      "https://i.pinimg.com/736x/22/8b/8f/228b8fe052704bbda62dc2c39e842bee.jpg",
  },
  {
    id: 5,
    label: "GO OUT",
    title: "輕便外出，\n帶著剛好的物件。",
    subtitle: "Everyday essentials",
    description: "從袋包、配件到外出小物，保留實用與自然質感。",
    buttonText: "查看推薦",
    to: "/products?topic=outdoor",
    image:
      "https://i.pinimg.com/736x/21/ab/83/21ab839977eaa81ab359f054db717e19.jpg",
  },
];

function getLastSlide(list: HeroSlideList): HeroSlide {
  const lastSlide = list[list.length - 1];

  return lastSlide ?? list[0];
}

const slides = ref<HeroSlide[]>([
  getLastSlide(baseSlides),
  ...baseSlides.slice(0, -1),
]);

const isAnimating = ref(false);

const activeSlide = computed<HeroSlide>(() => {
  const currentSlide = slides.value[1] ?? slides.value[0];

  return currentSlide ?? baseSlides[0];
});

function rotateSlidesForward(stepCount = 1) {
  for (let index = 0; index < stepCount; index += 1) {
    const firstSlide = slides.value.shift();

    if (firstSlide) {
      slides.value.push(firstSlide);
    }
  }
}

function nextSlide() {
  if (isAnimating.value) {
    return;
  }

  isAnimating.value = true;

  rotateSlidesForward(1);

  window.setTimeout(() => {
    isAnimating.value = false;
  }, 750);
}

function prevSlide() {
  if (isAnimating.value) {
    return;
  }

  isAnimating.value = true;

  const lastSlide = slides.value.pop();

  if (lastSlide) {
    slides.value.unshift(lastSlide);
  }

  window.setTimeout(() => {
    isAnimating.value = false;
  }, 750);
}

function handlePreviewCardClick(index: number) {
  if (isAnimating.value) {
    return;
  }

  if (index < 2 || index > 4) {
    return;
  }

  isAnimating.value = true;

  const stepCount = index - 1;

  rotateSlidesForward(stepCount);

  window.setTimeout(() => {
    isAnimating.value = false;
  }, 750);
}

const previewCardLeft = "52%";
const previewCardWidth = "clamp(140px, 13vw, 190px)";
const previewCardHeight = "clamp(210px, 24vw, 300px)";
const previewCardRadius = "28px";

// 這裡就是小卡片間距，想小一點就改 12、16、20
const previewCardGap = 4;

function getPreviewTranslateX(position: number): string {
  if (position === 0) {
    return "0";
  }

  return `calc(${position * 100}% + ${position * previewCardGap}px)`;
}

function getPreviewSlideStyle(
  position: number,
  opacity: string,
  zIndex: number,
): CSSProperties {
  return {
    left: previewCardLeft,
    top: "50%",
    width: previewCardWidth,
    height: previewCardHeight,
    transform: `translate3d(${getPreviewTranslateX(position)}, -50%, 0)`,
    borderRadius: previewCardRadius,
    opacity,
    zIndex,
  };
}

function getSlideStyle(index: number): CSSProperties {
  if (index === 0) {
    return {
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      transform: "translate3d(0, 0, 0)",
      borderRadius: "0",
      opacity: "1",
      zIndex: 1,
    };
  }

  if (index === 1) {
    return {
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      transform: "translate3d(0, 0, 0)",
      borderRadius: "0",
      opacity: "1",
      zIndex: 2,
    };
  }

  if (index === 2) {
    return getPreviewSlideStyle(0, "1", 5);
  }

  if (index === 3) {
    return getPreviewSlideStyle(1, "1", 4);
  }

  if (index === 4) {
    return getPreviewSlideStyle(2, "1", 3);
  }

  return getPreviewSlideStyle(3, "0", 0);
}
</script>

<template>
  <section
    class="relative min-h-130 overflow-hidden rounded-b-4xl bg-stone-200 md:min-h-155"
  >
    <div
      v-for="(slide, index) in slides"
      :key="slide.id"
      class="absolute overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="index >= 2 && index <= 4 ? 'cursor-pointer' : 'cursor-default'"
      :style="getSlideStyle(index)"
      @click="handlePreviewCardClick(index)"
    >
      <img
        :src="slide.image"
        :alt="slide.title"
        class="h-full w-full object-cover"
        draggable="false"
      >

      <div
        v-if="index <= 1"
        class="absolute inset-0 bg-linear-to-r from-black/65 via-black/35 to-black/10"
      />

      <div
        v-if="index >= 2 && index <= 4"
        class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4"
      >
        <p class="text-xs tracking-[0.2em] text-white/70">
          {{ slide.label }}
        </p>

        <p class="mt-1 line-clamp-2 text-sm font-light leading-5 text-white">
          {{ slide.subtitle }}
        </p>
      </div>
    </div>

    <div
      class="absolute left-6 top-1/2 z-10 max-w-xl -translate-y-1/2 text-white md:left-12 lg:left-16"
    >
      <div :key="activeSlide.id" class="hero-text-fade-in-up-small">
        <p class="text-sm tracking-[0.3em] text-white/70">
          {{ activeSlide.label }}
        </p>

        <h1
          class="mt-4 whitespace-pre-line text-4xl font-light leading-tight tracking-wide md:text-6xl"
        >
          {{ activeSlide.title }}
        </h1>

        <p class="mt-4 text-sm tracking-[0.25em] text-white/60">
          {{ activeSlide.subtitle }}
        </p>

        <p class="mt-6 max-w-lg text-base leading-8 text-white/75">
          {{ activeSlide.description }}
        </p>

        <div class="mt-8">
          <NuxtLink
            :to="activeSlide.to"
            class="inline-flex border border-white px-8 py-3 text-sm tracking-wide text-white transition hover:bg-white hover:text-neutral-900"
          >
            {{ activeSlide.buttonText }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-8 left-6 z-20 flex items-center gap-3 md:left-12 lg:left-16"
    >
      <button
        type="button"
        class="flex size-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-neutral-900"
        aria-label="上一張"
        @click="prevSlide"
      >
        <Icon name="lucide:arrow-left" class="size-4" />
      </button>

      <button
        type="button"
        class="flex size-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-neutral-900"
        aria-label="下一張"
        @click="nextSlide"
      >
        <Icon name="lucide:arrow-right" class="size-4" />
      </button>
    </div>

    <div
      class="absolute bottom-9 left-32 z-20 hidden items-center gap-2 md:flex"
    >
      <span
        v-for="slide in baseSlides"
        :key="slide.id"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="
          activeSlide.id === slide.id ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
        "
      />
    </div>
  </section>
</template>
