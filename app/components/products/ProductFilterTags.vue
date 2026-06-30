<template>
  <div class="mt-4 flex flex-wrap gap-2">
    <button
      v-for="tag in activeFilterTags"
      :key="`${tag.type}-${tag.value}`"
      type="button"
      class="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-600 transition hover:border-stone-300 hover:text-stone-950"
      @click="emit('remove', tag)"
    >
      {{ tag.label }}

      <span class="text-stone-400">
        ×
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
type FilterTag = {
  type: "category" | "material" | "color" | "price" | "topic" | "keyword";
  value: string;
  label: string;
};

defineProps<{
  activeFilterTags: FilterTag[];
}>();

const emit = defineEmits<{
  remove: [tag: FilterTag];
}>();
</script>