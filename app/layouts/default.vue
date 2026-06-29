<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-neutral-800">
    <LayoutSiteHeader />

    <main class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>

    <LayoutSiteFooter />
  </div>
</template>
