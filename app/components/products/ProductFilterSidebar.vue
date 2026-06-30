<template>
  <aside class="h-fit pr-5 lg:sticky lg:top-24">
    <div class="flex items-center justify-between border-b border-stone-200 pb-4">
      <h2 class="text-base font-semibold text-stone-950">
        篩選條件
      </h2>

      <button
        type="button"
        class="text-sm text-stone-500 transition hover:text-stone-950"
        @click="emit('clear')"
      >
        清除
      </button>
    </div>

    <div class="divide-y divide-stone-100">
      <div class="group py-5">
        <button
          type="button"
          class="flex w-full cursor-pointer list-none items-center justify-between text-sm font-medium text-stone-950"
          @click="toggleSection('category')"
        >
          分類

          <span
            class="text-stone-400 transition-transform duration-300 ease-out"
            :class="filterOpen.category ? 'rotate-180' : 'rotate-0'"
          >
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>

        <div
          class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
          :class="filterOpen.category ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
        >
          <div class="min-h-0 overflow-hidden">
            <div class="mt-4 space-y-3">
              <label
                v-for="option in categoryOptions"
                :key="option.value"
                class="flex cursor-pointer items-center justify-between gap-3 text-sm text-stone-600"
              >
                <span class="flex items-center gap-3">
                  <input
                    v-model="selectedCategories"
                    type="checkbox"
                    :value="option.value"
                    class="h-4 w-4 rounded border-stone-200 text-stone-900 focus:ring-stone-400"
                  >
                  {{ option.label }}
                </span>

                <span class="text-xs text-stone-400">
                  {{ getCategoryCount(option.value) }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="group py-5">
        <button
          type="button"
          class="flex w-full cursor-pointer list-none items-center justify-between text-sm font-medium text-stone-950"
          @click="toggleSection('price')"
        >
          價格

          <span
            class="text-stone-400 transition-transform duration-300 ease-out"
            :class="filterOpen.price ? 'rotate-180' : 'rotate-0'"
          >
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>

        <div
          class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
          :class="filterOpen.price ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
        >
          <div class="min-h-0 overflow-hidden">
            <div class="mt-4 space-y-3">
              <label
                v-for="option in priceRangeOptions"
                :key="option.value"
                class="flex cursor-pointer items-center gap-3 text-sm text-stone-600"
              >
                <input
                  v-model="selectedPrice"
                  type="radio"
                  name="price"
                  :value="option.value"
                  class="h-4 w-4 border-stone-300 text-stone-900 focus:ring-stone-400"
                >
                {{ option.label }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="group py-5">
        <button
          type="button"
          class="flex w-full cursor-pointer list-none items-center justify-between text-sm font-medium text-stone-950"
          @click="toggleSection('material')"
        >
          材質

          <span
            class="text-stone-400 transition-transform duration-300 ease-out"
            :class="filterOpen.material ? 'rotate-180' : 'rotate-0'"
          >
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>

        <div
          class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
          :class="filterOpen.material ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
        >
          <div class="min-h-0 overflow-hidden">
            <div class="mt-4 space-y-3">
              <label
                v-for="option in materialOptions"
                :key="option.value"
                class="flex cursor-pointer items-center gap-3 text-sm text-stone-600"
              >
                <input
                  v-model="selectedMaterials"
                  type="checkbox"
                  :value="option.value"
                  class="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-400"
                >
                {{ option.label }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="group py-5">
        <button
          type="button"
          class="flex w-full cursor-pointer list-none items-center justify-between text-sm font-medium text-stone-950"
          @click="toggleSection('color')"
        >
          顏色

          <span
            class="text-stone-400 transition-transform duration-300 ease-out"
            :class="filterOpen.color ? 'rotate-180' : 'rotate-0'"
          >
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>

        <div
          class="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
          :class="filterOpen.color ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
        >
          <div class="min-h-0 overflow-hidden">
            <div class="mt-4 space-y-3">
              <label
                v-for="option in colorOptions"
                :key="option.value"
                class="flex cursor-pointer items-center justify-between gap-3 text-sm text-stone-600"
              >
                <span class="flex items-center gap-3">
                  <input
                    v-model="selectedColors"
                    type="checkbox"
                    :value="option.value"
                    class="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-400"
                  >

                  <span
                    class="h-4 w-4 rounded-full border border-stone-200"
                    :style="{ backgroundColor: option.hex }"
                  />

                  {{ option.label }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
type BasicOption = {
  label: string;
  value: string;
};

type ColorOption = {
  label: string;
  value: string;
  hex: string;
};

type PriceRangeOption = {
  label: string;
  value: string;
  min?: number;
  max?: number;
};

type FilterSectionKey = "category" | "price" | "material" | "color";

defineProps<{
  categoryOptions: BasicOption[];
  materialOptions: BasicOption[];
  colorOptions: ColorOption[];
  priceRangeOptions: PriceRangeOption[];
  getCategoryCount: (value: string) => number;
}>();

const emit = defineEmits<{
  clear: [];
}>();

const selectedCategories = defineModel<string[]>("selectedCategories", {
  required: true,
});

const selectedMaterials = defineModel<string[]>("selectedMaterials", {
  required: true,
});

const selectedColors = defineModel<string[]>("selectedColors", {
  required: true,
});

const selectedPrice = defineModel<string>("selectedPrice", {
  required: true,
});

const filterOpen = reactive<Record<FilterSectionKey, boolean>>({
  category: true,
  price: true,
  material: true,
  color: true,
});

function toggleSection(key: FilterSectionKey) {
  filterOpen[key] = !filterOpen[key];
}
</script>