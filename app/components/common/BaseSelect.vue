<template>
  <div ref="selectRef" class="relative inline-block w-full">
    <button
      :id="id"
      type="button"
      class="flex h-10 w-full items-center justify-between rounded-full border border-stone-200 bg-white px-4 pr-3 text-left text-sm text-stone-900 outline-none transition hover:border-stone-300 focus:border-stone-400 focus:ring-4 focus:ring-stone-200/70"
      :aria-expanded="isOpen"
      :aria-controls="`${id}-options`"
      @click="toggleOpen"
      @keydown.down.prevent="openAndFocusNext"
      @keydown.up.prevent="openAndFocusPrev"
      @keydown.enter.prevent="toggleOpen"
      @keydown.space.prevent="toggleOpen"
      @keydown.esc.prevent="closeSelect"
    >
      <span class="truncate">
        {{ selectedLabel }}
      </span>

      <span
        class="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-stone-500 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
      >
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="m5 7.5 5 5 5-5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="-translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <div
        v-if="isOpen"
        :id="`${id}-options`"
        class="absolute right-0 z-50 mt-2 max-h-64 w-full min-w-40 overflow-hidden rounded-2xl border border-stone-200 bg-white py-1 shadow-xl"
      >
        <button
          v-for="(option, index) in options"
          :key="option.value"
          type="button"
          class="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition"
          :class="[
            option.value === modelValue
              ? 'bg-stone-700 text-white'
              : 'text-stone-700 hover:bg-stone-200 hover:text-stone-950',
            focusedIndex === index && option.value !== modelValue
              ? 'bg-stone-100 text-stone-950'
              : '',
          ]"
          @click="selectOption(option.value)"
          @mouseenter="focusedIndex = index"
        >
          <span class="truncate">
            {{ option.label }}
          </span>

          <svg
            v-if="option.value === modelValue"
            class="ml-3 h-4 w-4 shrink-0"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m5 10 3 3 7-7"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
type SelectOption = {
  label: string;
  value: string;
};

const props = withDefaults(
  defineProps<{
    id?: string;
    options: SelectOption[];
  }>(),
  {
    id: "base-select",
  },
);

const modelValue = defineModel<string>({
  required: true,
});

const selectRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const focusedIndex = ref(-1);

const selectedLabel = computed(() => {
  return props.options.find((option) => option.value === modelValue.value)?.label ?? "請選擇";
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

function toggleOpen() {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    focusedIndex.value = props.options.findIndex((option) => option.value === modelValue.value);
  }
}

function closeSelect() {
  isOpen.value = false;
}

function selectOption(value: string) {
  modelValue.value = value;
  closeSelect();
}

function handleClickOutside(event: MouseEvent) {
  if (!selectRef.value) {
    return;
  }

  if (!selectRef.value.contains(event.target as Node)) {
    closeSelect();
  }
}

function openAndFocusNext() {
  if (!isOpen.value) {
    isOpen.value = true;
  }

  if (!props.options.length) {
    return;
  }

  focusedIndex.value = focusedIndex.value < props.options.length - 1 ? focusedIndex.value + 1 : 0;
  const option = props.options[focusedIndex.value];

  if (option) {
    modelValue.value = option.value;
  }
}

function openAndFocusPrev() {
  if (!isOpen.value) {
    isOpen.value = true;
  }

  if (!props.options.length) {
    return;
  }

  focusedIndex.value = focusedIndex.value > 0 ? focusedIndex.value - 1 : props.options.length - 1;
  const option = props.options[focusedIndex.value];

  if (option) {
    modelValue.value = option.value;
  }
}
</script>