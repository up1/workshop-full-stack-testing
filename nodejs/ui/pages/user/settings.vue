<script setup lang="ts">
import { navigateTo } from 'nuxt/app';
import { authStore } from '~/stores/auth';

// TODO: Redirect to home page if not authenticated with middleware !!
const auth = authStore();
// if (!auth.isAuthenticated) {
//   await navigateTo('/');
// }

definePageMeta({
    middleware: 'auth'
})

const { signOut } = authStore();
const onLogoutButtonClick = async () => {
    signOut();
    await navigateTo('/');
};
</script>

<template>
    <div>

        <Head>
            <title>Settings page</title>
        </Head>

        <MyContainer>
            <div class="w-full md:w-1/2 md:mx-auto">
                <h1 class="text-center text-4xl font-medium mb-2">Your Settings</h1>
                <hr class="mb-5" />
                <button
                    class="text-red-600 border-white inline-block text-center no-underline align-middle cursor-pointer p-2 text-base rounded hover:border-red-600 border"
                    @click="onLogoutButtonClick">
                    Click here to logout.
                </button>
            </div>
        </MyContainer>
    </div>
</template>