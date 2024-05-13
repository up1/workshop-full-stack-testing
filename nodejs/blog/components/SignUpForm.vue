<script setup lang="ts">
import * as zod from 'zod';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
    zod.object({
        username: zod
            .string()
            .min(1, 'This is required')
            .min(4, { message: 'Too short' }),
        email: zod
            .string()
            .min(1, 'This is required')
            .email({ message: 'Must be a valid email' }),
        password: zod
            .string()
            .min(1, 'This is required')
            .min(6, { message: 'Too short' }),
    })
);

const { handleSubmit, errors } = useForm({
    validationSchema,
});

const { value: username } = useField('username');
const { value: email } = useField('email');
const { value: password } = useField('password');

const onSubmit = handleSubmit(async (values) => {
    isSubmitting.value = true;

    try {
        // Call Sigin api
        // Redirect to home page
        await navigateTo('/');
    } catch (error) {
        alert(error);
    } finally {
        isSubmitting.value = false;
    }
});
</script>

<template>
    <form @submit="onSubmit">
        <fieldset class="space-y-4">
            <div class="form-group" :class="{ 'opacity-50 pointer-events-none': isSubmitting }">
                <input v-model="username" name="username" type="username" placeholder="Username"
                    class="w-full px-6 py-3 text-base leading-5 text-gray-600 bg-white border border-gray-300 rounded-md" />
                <span class="text-red-500">{{ errors.username }}</span>
            </div>
            <div class="form-group" :class="{ 'opacity-50 pointer-events-none': isSubmitting }">
                <input v-model="email" name="email" type="email" placeholder="Email"
                    class="w-full px-6 py-3 text-base leading-5 text-gray-600 bg-white border border-gray-300 rounded-md" />
                <span class="text-red-500">{{ errors.email }}</span>
            </div>
            <div class="form-group">
                <input v-model="password" name="password" type="password" placeholder="Password"
                    class="w-full px-6 py-3 text-base leading-5 text-gray-600 bg-white border border-gray-300 rounded-md" />
                <span class="text-red-500">{{ errors.password }}</span>
            </div>
            <button :disabled="isSubmitting"
                class="float-right px-6 py-3 text-base text-white bg-custom-green border border-custom-green rounded-md hover:bg-green-600"
                :class="{ 'bg-gray-300 cursor-not-allowed': isSubmitting }">
                Sign in
            </button>
        </fieldset>
    </form>
</template>