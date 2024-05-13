<script setup lang="ts">
const props = defineProps<{
    name: string;
}>();
</script>

<template>
    <span class="border border-gray-300 text-xs py-0.5 whitespace-nowrap inline-block px-2.5 rounded-full">
        {{ props.name }}
    </span>
</template>