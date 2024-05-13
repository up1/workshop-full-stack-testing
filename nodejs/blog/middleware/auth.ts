import { authStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
    const auth = authStore();
    console.log('Current user', auth.currentUser);
    if (!auth.isAuthenticated) {
        return navigateTo('/user/login');
    }
});