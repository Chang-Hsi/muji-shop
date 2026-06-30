<template>
  <div class="mt-6 rounded-3xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
    <p class="text-lg font-medium text-stone-950">
      找不到符合條件的商品
    </p>

    <p class="mt-2 text-sm text-stone-500">
      可以試著清除篩選，或換個關鍵字搜尋。
    </p>

    <button
      type="button"
      class="mt-6 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
      @click="emit('clear')"
    >
      清除所有篩選
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  clear: [];
}>();
</script>