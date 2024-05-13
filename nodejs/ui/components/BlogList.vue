<script setup lang="ts">
import type { Blog } from '~/types';
const props = defineProps<{
    blogs: Blog[];
}>();

</script>

<template>
    <div>
        <div v-for="blog in props.blogs" :key="blog.id" class="border-t border-gray-200 py-6">
            <div class="font-light mb-4">
                <a>
                    <img src="~/assets/images/no-photo.jpeg" alt="author's profile image"
                        class="inline-block align-middle h-8 w-8 rounded-full" />
                </a>

                <div class="inline-block align-middle mr-6 ml-1">
                    <a class="author block font-medium text-green-500">
                        <span>{{ blog.username }}</span>
                    </a>
                    <span class="date block text-gray-400 text-xs">{{ blog.createdDate }}</span>
                </div>

                <div class="float-right">
                    <FavoriteButton :favoritesCount="blog.favoritesCount" />
                </div>
            </div>

            <a class="preview-link block text-black">
                <h1 class="font-bold text-lg mb-1 text-gray-700">
                    {{ blog.title }}
                </h1>

                <p class="font-thin text-sm text-gray-400 mb-4">
                    {{ blog.description }}
                </p>

                <div class="flex justify-between items-center">
                    <span class="text-xs font-light text-gray-400">Read more...</span>

                    <ul class="tag-list list-none">
                        <li v-for="tag in blog.tags" :key="tag"
                            class="inline-block font-light text-xs py-0 border-gray-300 text-gray-400 mr-1">
                            <Tag :name="tag" />
                        </li>
                    </ul>
                </div>
            </a>
        </div>

    </div>
</template>