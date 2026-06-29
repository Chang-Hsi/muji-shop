<script setup lang="ts">
interface ProductItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  badge?: string;
  to?: string;
}

const props = defineProps<{
  products: ProductItem[];
}>();

const scrollAreaRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);

const scrollLeft = ref(0);
const clientWidth = ref(0);
const scrollWidth = ref(0);
const isScrollbarDragging = ref(false);

const isContentDragging = ref(false);
const hasContentDragged = ref(false);
const flippedProductIds = ref<number[]>([]);

let contentDragStartX = 0;
let contentDragStartScrollLeft = 0;
let pressedProductId: number | null = null;

let contentLastX = 0;
let contentLastTime = 0;
let contentVelocity = 0;
let momentumAnimationId: number | null = null;
let pressedInteractiveElement = false;

const isMomentumScrolling = ref(false);

// 數字越接近 1，滑得越久
const momentumFriction = 0.94;

// 數字越小，最後停得越慢
const momentumMinVelocity = 0;

// 每幀約 16ms
const momentumFrameMs = 36;

// 這裡調整下面那條 X 軸長度
const scrollbarTrackStyle = {
  width: "30%",
  minWidth: "120px",
  maxWidth: "360px",
};

let resizeObserver: ResizeObserver | null = null;
let dragStartX = 0;
let dragStartScrollLeft = 0;

const maxScrollLeft = computed(() => {
  return Math.max(scrollWidth.value - clientWidth.value, 0);
});

const canScroll = computed(() => {
  return maxScrollLeft.value > 1;
});

const scrollProgress = computed(() => {
  if (maxScrollLeft.value <= 0) {
    return 0;
  }

  return scrollLeft.value / maxScrollLeft.value;
});

const thumbWidthPercent = computed(() => {
  if (!canScroll.value || scrollWidth.value <= 0) {
    return 100;
  }

  const visibleRatio = clientWidth.value / scrollWidth.value;

  return Math.max(visibleRatio * 100, 16);
});

const thumbLeftPercent = computed(() => {
  const maxThumbLeft = 100 - thumbWidthPercent.value;

  return scrollProgress.value * maxThumbLeft;
});

function getProductLink(product: ProductItem) {
  return product.to || `/products/${product.id}`;
}

function getProductDescription(product: ProductItem) {
  return product.description || "簡潔實用的日常選品，適合放進你的生活裡。";
}

function getProductBadge(product: ProductItem) {
  return product.badge || "FEATURED";
}

function formatPrice(price: number) {
  return `NT$ ${price.toLocaleString("zh-TW")}`;
}

function isProductFlipped(productId: number) {
  return flippedProductIds.value.includes(productId);
}

function toggleProductFlip(productId: number) {
  if (hasContentDragged.value) {
    return;
  }

  if (isProductFlipped(productId)) {
    flippedProductIds.value = flippedProductIds.value.filter(
      (id) => id !== productId,
    );
    return;
  }

  flippedProductIds.value = [...flippedProductIds.value, productId];
}

function getPressedProductId(event: PointerEvent) {
  const targetElement = event.target;

  if (!(targetElement instanceof HTMLElement)) {
    return null;
  }

  const productElement = targetElement.closest("[data-product-id]");

  if (!(productElement instanceof HTMLElement)) {
    return null;
  }

  const productId = Number(productElement.dataset.productId);

  if (Number.isNaN(productId)) {
    return null;
  }

  return productId;
}

function isInteractiveElement(event: PointerEvent) {
  const targetElement = event.target;

  if (!(targetElement instanceof HTMLElement)) {
    return false;
  }

  return Boolean(targetElement.closest("a, button"));
}

function stopMomentumScroll() {
  if (momentumAnimationId !== null) {
    window.cancelAnimationFrame(momentumAnimationId);
    momentumAnimationId = null;
  }

  isMomentumScrolling.value = false;
  contentVelocity = 0;
}

function clampScrollLeft(value: number) {
  return Math.min(Math.max(value, 0), maxScrollLeft.value);
}

function startMomentumScroll() {
  const scrollAreaElement = scrollAreaRef.value;

  if (!scrollAreaElement || Math.abs(contentVelocity) < momentumMinVelocity) {
    isMomentumScrolling.value = false;
    return;
  }

  isMomentumScrolling.value = true;

  const animate = () => {
    const nextScrollLeft = clampScrollLeft(
      scrollAreaElement.scrollLeft + contentVelocity * momentumFrameMs,
    );

    const reachedStart = nextScrollLeft <= 0;
    const reachedEnd = nextScrollLeft >= maxScrollLeft.value;

    scrollAreaElement.scrollLeft = nextScrollLeft;
    updateScrollState();

    contentVelocity *= momentumFriction;

    if (
      Math.abs(contentVelocity) < momentumMinVelocity ||
      reachedStart ||
      reachedEnd
    ) {
      momentumAnimationId = null;
      isMomentumScrolling.value = false;
      contentVelocity = 0;
      return;
    }

    momentumAnimationId = window.requestAnimationFrame(animate);
  };

  momentumAnimationId = window.requestAnimationFrame(animate);
}

function updateScrollState() {
  const scrollAreaElement = scrollAreaRef.value;

  if (!scrollAreaElement) {
    return;
  }

  scrollLeft.value = scrollAreaElement.scrollLeft;
  clientWidth.value = scrollAreaElement.clientWidth;
  scrollWidth.value = scrollAreaElement.scrollWidth;
}

function handleScrollAreaPointerDown(event: PointerEvent) {
  const scrollAreaElement = scrollAreaRef.value;

  if (!scrollAreaElement || event.button !== 0 || isScrollbarDragging.value) {
    return;
  }

  stopMomentumScroll();

  pressedProductId = getPressedProductId(event);
  pressedInteractiveElement = isInteractiveElement(event);

  isContentDragging.value = true;
  hasContentDragged.value = false;

  contentDragStartX = event.clientX;
  contentDragStartScrollLeft = scrollAreaElement.scrollLeft;

  contentLastX = event.clientX;
  contentLastTime = event.timeStamp || performance.now();
  contentVelocity = 0;

  scrollAreaElement.setPointerCapture(event.pointerId);
}

function handleScrollAreaPointerMove(event: PointerEvent) {
  const scrollAreaElement = scrollAreaRef.value;

  if (!scrollAreaElement || !isContentDragging.value) {
    return;
  }

  const movedX = event.clientX - contentDragStartX;

  if (Math.abs(movedX) > 6) {
    hasContentDragged.value = true;
  }

  const now = event.timeStamp || performance.now();
  const deltaX = event.clientX - contentLastX;
  const deltaTime = Math.max(now - contentLastTime, 16);

  const currentVelocity = -deltaX / deltaTime;

  contentVelocity = contentVelocity * 0.2 + currentVelocity * 0.8;
  contentLastX = event.clientX;
  contentLastTime = now;

  scrollAreaElement.scrollLeft = contentDragStartScrollLeft - movedX;
  updateScrollState();

  event.preventDefault();
}

function handleScrollAreaPointerUp(event: PointerEvent) {
  const scrollAreaElement = scrollAreaRef.value;

  if (!scrollAreaElement) {
    return;
  }

  const targetProductId = pressedProductId;

  const shouldFlipProduct =
    targetProductId !== null &&
    !hasContentDragged.value &&
    !pressedInteractiveElement;

  const shouldStartMomentum =
    hasContentDragged.value && Math.abs(contentVelocity) >= momentumMinVelocity;

  if (shouldFlipProduct) {
    toggleProductFlip(targetProductId);
  }

  pressedProductId = null;
  pressedInteractiveElement = false;
  isContentDragging.value = false;

  if (scrollAreaElement.hasPointerCapture(event.pointerId)) {
    scrollAreaElement.releasePointerCapture(event.pointerId);
  }

  if (shouldStartMomentum) {
    startMomentumScroll();
  }

  window.setTimeout(() => {
    hasContentDragged.value = false;
  }, 120);
}

function handleScrollAreaPointerCancel(event: PointerEvent) {
  const scrollAreaElement = scrollAreaRef.value;

  pressedProductId = null;
  pressedInteractiveElement = false;
  isContentDragging.value = false;
  contentVelocity = 0;

  if (
    scrollAreaElement &&
    scrollAreaElement.hasPointerCapture(event.pointerId)
  ) {
    scrollAreaElement.releasePointerCapture(event.pointerId);
  }

  window.setTimeout(() => {
    hasContentDragged.value = false;
  }, 120);
}

function handleScrollAreaClickCapture(event: MouseEvent) {
  if (!hasContentDragged.value) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
}

function handleTrackPointerDown(event: PointerEvent) {
  stopMomentumScroll();

  const trackElement = trackRef.value;
  const scrollAreaElement = scrollAreaRef.value;

  if (!trackElement || !scrollAreaElement || !canScroll.value) {
    return;
  }

  const trackRect = trackElement.getBoundingClientRect();
  const thumbWidth = trackRect.width * (thumbWidthPercent.value / 100);
  const maxThumbLeft = trackRect.width - thumbWidth;

  if (maxThumbLeft <= 0) {
    return;
  }

  const clickX = event.clientX - trackRect.left;
  const nextThumbLeft = Math.min(
    Math.max(clickX - thumbWidth / 2, 0),
    maxThumbLeft,
  );
  const nextProgress = nextThumbLeft / maxThumbLeft;

  scrollAreaElement.scrollTo({
    left: maxScrollLeft.value * nextProgress,
    behavior: "smooth",
  });
}

function handleThumbPointerDown(event: PointerEvent) {
  stopMomentumScroll();

  const scrollAreaElement = scrollAreaRef.value;

  if (!scrollAreaElement || !canScroll.value) {
    return;
  }

  isScrollbarDragging.value = true;
  dragStartX = event.clientX;
  dragStartScrollLeft = scrollAreaElement.scrollLeft;

  window.addEventListener("pointermove", handleThumbPointerMove);
  window.addEventListener("pointerup", handleThumbPointerUp);
}

function handleThumbPointerMove(event: PointerEvent) {
  const trackElement = trackRef.value;
  const scrollAreaElement = scrollAreaRef.value;

  if (!trackElement || !scrollAreaElement || !isScrollbarDragging.value) {
    return;
  }

  const trackRect = trackElement.getBoundingClientRect();
  const thumbWidth = trackRect.width * (thumbWidthPercent.value / 100);
  const draggableWidth = trackRect.width - thumbWidth;

  if (draggableWidth <= 0) {
    return;
  }

  const movedX = event.clientX - dragStartX;
  const scrollRatio = maxScrollLeft.value / draggableWidth;
  const nextScrollLeft = dragStartScrollLeft + movedX * scrollRatio;

  scrollAreaElement.scrollLeft = Math.min(
    Math.max(nextScrollLeft, 0),
    maxScrollLeft.value,
  );
}

function handleThumbPointerUp() {
  isScrollbarDragging.value = false;

  window.removeEventListener("pointermove", handleThumbPointerMove);
  window.removeEventListener("pointerup", handleThumbPointerUp);
}

onMounted(async () => {
  await nextTick();

  updateScrollState();

  const scrollAreaElement = scrollAreaRef.value;

  if (scrollAreaElement) {
    resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });

    resizeObserver.observe(scrollAreaElement);
  }

  window.addEventListener("resize", updateScrollState);
});

onBeforeUnmount(() => {
  stopMomentumScroll();

  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateScrollState);
  window.removeEventListener("pointermove", handleThumbPointerMove);
  window.removeEventListener("pointerup", handleThumbPointerUp);
});

watch(
  () => props.products.length,
  async () => {
    await nextTick();
    updateScrollState();
  },
);
</script>

<template>
  <section class="mt-20">
    <div class="mb-8 flex items-end justify-between">
      <div>
        <p class="text-sm tracking-[0.3em] text-neutral-400">FEATURED</p>

        <h2 class="mt-2 text-2xl font-light text-neutral-900">精選商品</h2>
      </div>

      <NuxtLink
        to="/products"
        class="text-sm text-neutral-500 transition hover:text-neutral-900"
      >
        查看全部
      </NuxtLink>
    </div>

    <div
      ref="scrollAreaRef"
      class="-mx-4 flex gap-6 overflow-x-auto px-4 pb-4 select-none scrollbar-none touch-pan-y [&::-webkit-scrollbar]:hidden"
      :class="
        isContentDragging || isMomentumScrolling
          ? 'cursor-grabbing snap-none'
          : 'cursor-grab snap-x'
      "
      @scroll="updateScrollState"
      @pointerdown="handleScrollAreaPointerDown"
      @pointermove="handleScrollAreaPointerMove"
      @pointerup="handleScrollAreaPointerUp"
      @pointercancel="handleScrollAreaPointerCancel"
      @click.capture="handleScrollAreaClickCapture"
    >
      <article
        v-for="product in props.products"
        :key="product.id"
        :data-product-id="product.id"
        tabindex="0"
        class="group h-105 w-70 flex-none snap-start outline-none perspective-distant sm:w-[320px] lg:w-90"
        :class="isContentDragging ? 'cursor-grabbing' : 'cursor-pointer'"
        @keydown.enter="toggleProductFlip(product.id)"
        @keydown.space.prevent="toggleProductFlip(product.id)"
      >
        <div
          class="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform-3d"
          :class="
            isProductFlipped(product.id) ? 'transform-[rotateY(180deg)]' : ''
          "
        >
          <div
            class="absolute inset-0 overflow-hidden rounded-4xl bg-stone-200 shadow-xl backface-hidden"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="h-full w-full object-cover transition duration-700"
              draggable="false"
            >

            <div
              class="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent"
            />

            <div class="absolute inset-x-0 bottom-0 p-6 text-white">
              <p class="text-xs tracking-[0.25em] text-white/70">
                {{ getProductBadge(product) }}
              </p>

              <h3 class="mt-2 text-lg font-light tracking-wide">
                {{ product.name }}
              </h3>

              <p class="mt-2 text-sm tracking-wide text-white/80">
                {{ formatPrice(product.price) }}
              </p>
            </div>

            <div
              class="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow"
            >
              <Icon name="lucide:rotate-3d" class="size-4" />
            </div>
          </div>

          <div
            class="absolute inset-0 overflow-hidden rounded-4xl border border-stone-200 bg-white p-6 shadow-xl backface-hidden transform-[rotateY(180deg)]"
          >
            <div class="flex h-full flex-col">
              <div>
                <p class="text-xs tracking-[0.25em] text-neutral-400">
                  PRODUCT DETAIL
                </p>

                <h3
                  class="mt-4 text-3xl font-light leading-tight tracking-wide text-neutral-900"
                >
                  {{ product.name }}
                </h3>

                <p class="mt-3 text-lg font-light text-neutral-500">
                  {{ formatPrice(product.price) }}
                </p>

                <p class="mt-6 text-sm leading-7 text-neutral-500">
                  {{ getProductDescription(product) }}
                </p>
              </div>

              <div class="mt-auto">
                <NuxtLink
                  :to="getProductLink(product)"
                  class="inline-flex w-full items-center justify-center gap-2 border border-neutral-900 px-6 py-3 mb-3 text-sm tracking-wide text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                  @click.stop
                >
                  查看商品

                  <Icon name="lucide:arrow-right" class="size-4" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div v-if="canScroll" class="mt-6 flex justify-center">
      <div
        ref="trackRef"
        class="relative h-1 cursor-pointer rounded-full bg-stone-200"
        :style="scrollbarTrackStyle"
        @pointerdown="handleTrackPointerDown"
      >
        <div
          class="absolute top-1/2 h-1 -translate-y-1/2 cursor-grab rounded-full bg-neutral-900 shadow-sm transition-[left,width] duration-150 active:cursor-grabbing"
          :class="isScrollbarDragging ? 'transition-none' : ''"
          :style="{
            width: `${thumbWidthPercent}%`,
            left: `${thumbLeftPercent}%`,
          }"
          @pointerdown.stop="handleThumbPointerDown"
        />
      </div>
    </div>
  </section>
</template>
