<script setup lang="ts">
type StoreItem = {
  id: number;
  title: string;
  image: string;
  to: string;
};

type StoreGroup = {
  key: string;
  label: string;
  stores: StoreItem[];
};

const props = defineProps<{
  storeGroups: StoreGroup[];
}>();

const activeKey = ref(props.storeGroups[0]?.key || "");

const activeGroup = computed(() => {
  return (
    props.storeGroups.find((group) => group.key === activeKey.value) ||
    props.storeGroups[0] ||
    null
  );
});

const gridClass = computed(() => {
  if (!activeGroup.value) {
    return "";
  }

  if (activeGroup.value.stores.length <= 2) {
    return "grid-cols-1 md:grid-cols-2 max-w-5xl";
  }

  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
});

function setActiveKey(key: string) {
  activeKey.value = key;
}

watch(
  () => props.storeGroups,
  (groups) => {
    if (!groups.some((group) => group.key === activeKey.value)) {
      activeKey.value = groups[0]?.key || "";
    }
  },
  {
    deep: true,
  },
);
</script>

<template>
  <section class="mt-24">
    <div class="mb-6">
      <div class="mb-8 flex items-end justify-between">
        <div>
          <p class="text-sm tracking-[0.3em] text-neutral-400">STORE</p>

          <h2 class="mt-2 text-2xl font-light text-neutral-900">
            旗艦店｜大型店資訊
          </h2>
        </div>
      </div>

      <div class="mt-5 flex items-center gap-10">
        <button
          v-for="group in storeGroups"
          :key="group.key"
          type="button"
          class="relative pb-4 text-sm font-bold transition"
          :class="
            activeKey === group.key
              ? 'text-neutral-950'
              : 'text-neutral-300 hover:text-neutral-500'
          "
          @click="setActiveKey(group.key)"
        >
          {{ group.label }}

          <span
            class="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-neutral-950 transition-transform duration-300"
            :class="activeKey === group.key ? 'scale-x-100' : 'scale-x-0'"
          />
        </button>
      </div>
    </div>

    <Transition
      mode="out-in"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-3 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="activeGroup"
        :key="activeGroup.key"
        class="grid gap-x-6 gap-y-10"
        :class="gridClass"
      >
        <NuxtLink
          v-for="store in activeGroup.stores"
          :key="store.id"
          :to="store.to"
          class="group block"
        >
          <div class="aspect-16/10 overflow-hidden bg-stone-100">
            <img
              :src="store.image"
              :alt="store.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              draggable="false"
            >
          </div>

          <h3
            class="mt-3 text-base font-bold text-neutral-950 transition group-hover:text-neutral-500"
          >
            {{ store.title }}
          </h3>
        </NuxtLink>
      </div>
    </Transition>
  </section>
</template>
