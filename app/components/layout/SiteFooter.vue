<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-stone-200 bg-stone-100">
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="grid gap-8 md:grid-cols-3">
        <div>
          <p class="text-lg font-light tracking-[0.2em] text-neutral-900">
            MINIMAL
          </p>

          <p class="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
            簡潔、自然、耐看的生活選品商店。
          </p>
        </div>

        <div>
          <h3 class="text-sm font-medium text-neutral-800">
            客戶服務
          </h3>

          <ul class="mt-3 space-y-2 text-sm text-neutral-500">
            <li>
              <NuxtLink to="/guide" class="hover:text-neutral-900">
                購物說明
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/shipping" class="hover:text-neutral-900">
                配送方式
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/returns" class="hover:text-neutral-900">
                退換貨政策
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-medium text-neutral-800">
            關於我們
          </h3>

          <ul class="mt-3 space-y-2 text-sm text-neutral-500">
            <li>
              <NuxtLink to="/about" class="hover:text-neutral-900">
                品牌故事
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/stores" class="hover:text-neutral-900">
                門市資訊
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/contact" class="hover:text-neutral-900">
                聯絡我們
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <p class="mt-10 text-xs text-neutral-400">
        © {{ currentYear }} MINIMAL SHOP. All rights reserved.
      </p>
    </div>
  </footer>
</template>