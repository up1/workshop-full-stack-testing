<script setup lang="ts">
const props = defineProps<{
  favoritesCount: number;
}>();
</script>

<template>
  <div>
    <button class="flex items-center px-2 py-1 text-sm font-medium bg-custom-green text-white rounded-full">
      <span class="inline-flex">
        <IconHeart color="currentColor" class="w-3 h-3 mr-1" />
      </span>
      <div>{{ props.favoritesCount }}</div>
    </button>
  </div>
</template>