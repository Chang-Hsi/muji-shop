<template>
  <div class="p-0">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm font-medium text-stone-950">
          顯示 {{ count }} 件商品
        </p>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-34">
          <BaseSelect
            id="sort"
            v-model="selectedSort"
            :options="sortOptions"
          />
        </div>

        <div class="hidden rounded-full border border-stone-200 p-1 sm:flex">
          <button
            type="button"
            class="rounded-full px-3 py-1.5 text-sm transition"
            :class="viewMode === 'grid' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-950'"
            @click="viewMode = 'grid'"
          >
            卡片
          </button>

          <button
            type="button"
            class="rounded-full px-3 py-1.5 text-sm transition"
            :class="viewMode === 'list' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-950'"
            @click="viewMode = 'list'"
          >
            列表
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSelect from '../common/BaseSelect.vue';

type SortValue = "new" | "popular" | "priceLow" | "priceHigh";

defineProps<{
  count: number;
  sortOptions: {
    label: string;
    value: SortValue;
  }[];
}>();

const selectedSort = defineModel<SortValue>("selectedSort", {
  required: true,
});

const viewMode = defineModel<"grid" | "list">("viewMode", {
  required: true,
});
</script>