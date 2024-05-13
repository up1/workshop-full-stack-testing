<script setup lang="ts">
const route = useRoute();
const username = route.params.username;
</script>
<template>
    <div>

        <Head>
            <title>Hello, {{ username }}</title>
        </Head>

        <MyContainer>
            <div class="w-full md:w-4/5 md:mx-auto">
                TODO {{ username }}
            </div>
        </MyContainer>
    </div>
</template>