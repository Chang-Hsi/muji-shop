<script setup lang="ts">
type SubmenuLink = {
  title: string;
  description?: string;
  to: string;
};

type SubmenuGroup = {
  title: string;
  links: SubmenuLink[];
};

type NavItem = {
  label: string;
  to: string;
  panelWidth: number;
  submenu: SubmenuGroup[];
};

const navItems: NavItem[] = [
  {
    label: "商品分類",
    to: "/products",
    panelWidth: 680,
    submenu: [
      {
        title: "商品分類",
        links: [
          {
            title: "文創用品",
            description: "瀏覽新潮的創意產品",
            to: "/products?category=creative",
          },
          {
            title: "生活用品",
            description: "收納、清潔、居家日用品",
            to: "/products?category=living",
          },
          {
            title: "服飾",
            description: "自然舒適的基本穿搭",
            to: "/products?category=clothes",
          },
        ],
      },
      {
        title: "精選推薦",
        links: [
          {
            title: "新品上市",
            description: "最近加入的新商品",
            to: "/products?sort=new",
          },
          {
            title: "熱銷商品",
            description: "顧客經常選購的品項",
            to: "/products?sort=popular",
          },
          {
            title: "期間限定",
            description: "限定販售與季節商品",
            to: "/products?category=limited",
          },
        ],
      },
      {
        title: "生活主題",
        links: [
          {
            title: "臥室收納",
            to: "/products?topic=bedroom",
          },
          {
            title: "廚房日用",
            to: "/products?topic=kitchen",
          },
          {
            title: "通勤外出",
            to: "/products?topic=outdoor",
          },
          {
            title: "自然棉麻",
            to: "/products?topic=linen",
          },
        ],
      },
    ],
  },
  {
    label: "店鋪消息",
    to: "#",
    panelWidth: 460,
    submenu: [
      {
        title: "店鋪資訊",
        links: [
          {
            title: "門市一覽",
            description: "查看所有實體店鋪位置",
            to: "/stores",
          },
          {
            title: "門市服務",
            description: "各門市營業時間與公告",
            to: "/stores/services",
          },
        ],
      },
      {
        title: "門市服務",
        links: [
          {
            title: "門市取貨",
            to: "/stores/services?keyword=門市取貨",
          },
          {
            title: "商品預約",
            to: "/stores/services?keyword=商品預約",
          },
          {
            title: "庫存查詢",
            to: "/stores/services?keyword=庫存查詢",
          },
        ],
      },
    ],
  },
  {
    label: "最新消息",
    to: "#",
    panelWidth: 520,
    submenu: [
      {
        title: "最新消息",
        links: [
          {
            title: "全部公告",
            description: "品牌、活動與服務公告",
            to: "/announcement",
          },
          {
            title: "新品資訊",
            description: "最新商品與系列介紹",
            to: "/news/products",
          },
          {
            title: "活動消息",
            description: "優惠活動與會員專屬資訊",
            to: "/activity",
          },
        ],
      },
      {
        title: "推薦閱讀",
        links: [
          {
            title: "生活提案",
            to: "/journal",
          },
          {
            title: "商品保養",
            to: "/journal/care",
          },
          {
            title: "永續生活",
            to: "/journal/sustainability",
          },
        ],
      },
    ],
  },
  {
    label: "顧客服務",
    to: "#",
    panelWidth: 560,
    submenu: [
      {
        title: "購物協助",
        links: [
          {
            title: "購物說明",
            description: "下單、付款與發票相關說明",
            to: "/guide",
          },
          {
            title: "配送方式",
            description: "宅配、超商與門市取貨",
            to: "/shipping",
          },
          {
            title: "退換貨政策",
            description: "退貨、換貨與退款流程",
            to: "/returns",
          },
        ],
      },
      {
        title: "會員服務",
        links: [
          {
            title: "會員權益",
            to: "/member/benefits",
          },
          {
            title: "訂單查詢",
            to: "/member/orders",
          },
          {
            title: "聯絡客服",
            to: "/contact",
          },
        ],
      },
    ],
  },
  {
    label: "企業情報",
    to: "#",
    panelWidth: 500,
    submenu: [
      {
        title: "品牌資訊",
        links: [
          {
            title: "品牌理念",
            description: "簡潔、自然、實用的生活哲學",
            to: "/about",
          },
          {
            title: "永續計畫",
            description: "材料、包裝與環境友善行動",
            to: "/sustainability",
          },
          {
            title: "企業消息",
            description: "公司公告與品牌動態",
            to: "/company/news",
          },
        ],
      },
      {
        title: "合作與招募",
        links: [
          {
            title: "採購合作",
            to: "/company/partner",
          },
          {
            title: "人才招募",
            to: "/company/careers",
          },
        ],
      },
    ],
  },
];

const headerInnerRef = ref<HTMLElement | null>(null);
const panelContentRef = ref<HTMLElement | null>(null);
const navItemRefs = ref<HTMLElement[]>([]);
const route = useRoute();

const activeIndex = ref<number | null>(null);
const isPanelVisible = ref(false);
const isContentVisible = ref(false);

const panel = ref({
  left: 0,
  width: 520,
  height: 0,
  arrowLeft: 0,
});

let closeTimer: ReturnType<typeof setTimeout> | null = null;

const activeItem = computed(() => {
  if (activeIndex.value === null) {
    return null;
  }

  return navItems[activeIndex.value] || null;
});

const panelStyle = computed(() => {
  return {
    width: `${panel.value.width}px`,
    height: `${panel.value.height}px`,
    transform: `translate3d(${panel.value.left}px, 0, 0)`,
    opacity: isPanelVisible.value ? "1" : "0",
  };
});

const arrowStyle = computed(() => {
  return {
    left: `${panel.value.arrowLeft}px`,
  };
});

function setNavItemRef(el: unknown, index: number) {
  if (el instanceof HTMLElement) {
    navItemRefs.value[index] = el;
  }
}

function cancelClose() {
  if (!closeTimer) {
    return;
  }

  clearTimeout(closeTimer);
  closeTimer = null;
}

function startClose() {
  cancelClose();

  closeTimer = setTimeout(() => {
    isPanelVisible.value = false;
    isContentVisible.value = false;
  }, 120);
}

function closePanelNow() {
  cancelClose();

  isPanelVisible.value = false;
  isContentVisible.value = false;
  activeIndex.value = null;
}

async function handleNavEnter(index: number) {
  cancelClose();

  const item = navItems[index];

  if (!item) {
    startClose();
    return;
  }

  isContentVisible.value = false;
  activeIndex.value = index;
  isPanelVisible.value = true;

  panel.value.width = item.panelWidth;

  await nextTick();

  updatePanelPosition(index);

  window.requestAnimationFrame(() => {
    isContentVisible.value = true;
  });
}

function updatePanelPosition(index: number) {
  const headerInnerElement = headerInnerRef.value;
  const navItemElement = navItemRefs.value[index];
  const panelContentElement = panelContentRef.value;
  const item = navItems[index];

  if (!headerInnerElement || !navItemElement || !panelContentElement || !item) {
    return;
  }

  const headerRect = headerInnerElement.getBoundingClientRect();
  const navItemRect = navItemElement.getBoundingClientRect();

  const targetWidth = item.panelWidth;
  const contentHeight = panelContentElement.scrollHeight;

  const itemCenter = navItemRect.left - headerRect.left + navItemRect.width / 2;

  const rawLeft = itemCenter - targetWidth / 2;
  const maxLeft = headerRect.width - targetWidth;
  const safeLeft = Math.min(Math.max(rawLeft, 0), Math.max(maxLeft, 0));

  panel.value = {
    left: safeLeft,
    width: targetWidth,
    height: contentHeight,
    arrowLeft: itemCenter - safeLeft,
  };
}

function handleResize() {
  if (activeIndex.value === null || !isPanelVisible.value) {
    return;
  }

  updatePanelPosition(activeIndex.value);
}

watch(
  () => route.fullPath,
  () => {
    closePanelNow();
  },
);

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  cancelClose();
});
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur"
    @mouseenter="cancelClose"
    @mouseleave="startClose"
  >
    <div
      ref="headerInnerRef"
      class="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="text-xl font-light tracking-[0.2em] text-neutral-900"
      >
        MINIMAL
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <div
          v-for="(item, index) in navItems"
          :key="item.label"
          :ref="(el) => setNavItemRef(el, index)"
          class="relative flex h-16 items-center"
          @mouseenter="handleNavEnter(index)"
          @focusin="handleNavEnter(index)"
        >
          <NuxtLink
            :to="item.to"
            class="group flex items-center gap-1 text-sm tracking-wide transition"
            :class="
              activeIndex === index && isPanelVisible
                ? 'text-neutral-950'
                : 'text-neutral-600 hover:text-neutral-950'
            "
          >
            <span>
              {{ item.label }}
            </span>

            <Icon
              name="lucide:chevron-down"
              class="size-3.5 transition duration-200"
              :class="
                activeIndex === index && isPanelVisible
                  ? 'rotate-180'
                  : 'rotate-0'
              "
            />
          </NuxtLink>

          <span
            class="absolute bottom-0 left-0 h-px w-full origin-center scale-x-0 bg-neutral-900 transition duration-200"
            :class="
              activeIndex === index && isPanelVisible
                ? 'scale-x-100'
                : 'scale-x-0'
            "
          />
        </div>
      </nav>

      <div class="flex items-center gap-4">
        <NuxtLink
          to="/cart"
          class="text-sm tracking-wide text-neutral-600 transition hover:text-neutral-950"
        >
          購物車
        </NuxtLink>

        <NuxtLink
          to="/login"
          class="hidden text-sm tracking-wide text-neutral-600 transition hover:text-neutral-950 sm:inline"
        >
          登入
        </NuxtLink>
      </div>

      <div
        class="absolute top-[calc(100%+0px)] z-50 overflow-hidden rounded-b-2xl border border-stone-200 bg-white shadow-xl transition-[transform,width,height,opacity] duration-300 ease-out"
        :class="isPanelVisible ? 'pointer-events-auto' : 'pointer-events-none'"
        :style="panelStyle"
        @mouseenter="cancelClose"
        @mouseleave="startClose"
      >
        <span
          class="absolute top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-stone-200 bg-white transition-all duration-300 ease-out"
          :style="arrowStyle"
        />

        <div
          v-if="activeItem"
          ref="panelContentRef"
          class="p-5 transition duration-200 ease-out"
          :class="
            isContentVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-2 opacity-0'
          "
        >
          <div
            class="grid gap-4"
            :class="
              activeItem.submenu.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'
            "
          >
            <section v-for="group in activeItem.submenu" :key="group.title">
              <p
                class="mb-3 text-xs font-medium tracking-[0.2em] text-neutral-400"
              >
                {{ group.title }}
              </p>

              <div class="space-y-1">
                <NuxtLink
                  v-for="link in group.links"
                  :key="link.title"
                  :to="link.to"
                  class="group block rounded-xl p-3 transition hover:bg-stone-50"
                  @click="closePanelNow"
                >
                  <div class="flex items-center justify-between gap-4">
                    <p class="text-sm font-medium text-neutral-800">
                      {{ link.title }}
                    </p>

                    <Icon
                      name="lucide:arrow-right"
                      class="size-3.5 text-neutral-300 transition group-hover:translate-x-1 group-hover:text-neutral-700"
                    />
                  </div>

                  <p
                    v-if="link.description"
                    class="mt-1 text-xs leading-5 text-neutral-500"
                  >
                    {{ link.description }}
                  </p>
                </NuxtLink>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
