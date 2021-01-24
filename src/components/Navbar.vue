<template>
    <div>
        <header
            class="bg-transparent sm:flex sm:justify-between sm:items-center sm:px-8 sm:py:3"
        >
            <div class="flex items-center justify-between px-4 py-3 sm:p-0">
                <div>
                    <router-link
                        :to="{ name: 'Home' }"
                        class="flex flex-col items-center pt-3 text-blue-500"
                    >
                        <img
                            class="h-8"
                            src="@/assets/logo.png"
                            alt="eCommerce"
                        />
                        <div>E-commerce</div>
                    </router-link>
                </div>
            </div>
            <nav class="px-2 pt-2 pb-4 sm:flex sm:p-0">
                <router-link
                    :to="{ path: '/cart' }"
                    class="flex items-center px-2 py-1 font-semibold text-blue-700 rounded sm:mt-0 sm:mr-4"
                >
                    <svg
                        class="w-6 h-6 fill-current"
                        height="512pt"
                        viewBox="0 -31 512.00033 512"
                        width="512pt"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m166 300.003906h271.003906c6.710938 0 12.597656-4.4375 14.414063-10.882812l60.003906-210.003906c1.289063-4.527344.40625-9.390626-2.433594-13.152344-2.84375-3.75-7.265625-5.964844-11.984375-5.964844h-365.632812l-10.722656-48.25c-1.523438-6.871094-7.617188-11.75-14.648438-11.75h-91c-8.289062 0-15 6.710938-15 15 0 8.292969 6.710938 15 15 15h78.960938l54.167968 243.75c-15.9375 6.929688-27.128906 22.792969-27.128906 41.253906 0 24.8125 20.1875 45 45 45h271.003906c8.292969 0 15-6.707031 15-15 0-8.289062-6.707031-15-15-15h-271.003906c-8.261719 0-15-6.722656-15-15s6.738281-15 15-15zm0 0"
                        />
                        <path
                            d="m151 405.003906c0 24.816406 20.1875 45 45.003906 45 24.8125 0 45-20.183594 45-45 0-24.8125-20.1875-45-45-45-24.816406 0-45.003906 20.1875-45.003906 45zm0 0"
                        />
                        <path
                            d="m362.003906 405.003906c0 24.816406 20.1875 45 45 45 24.816406 0 45-20.183594 45-45 0-24.8125-20.183594-45-45-45-24.8125 0-45 20.1875-45 45zm0 0"
                        />
                    </svg>
                    <div class="pl-2 pr-1">{{ cartLength }}</div>
                </router-link>

                <router-link
                    v-if="!isCurrentUser"
                    :to="{ path: '/login' }"
                    class="block px-2 py-1 mt-1 font-semibold text-blue-700 rounded sm:mt-0 sm:ml-2"
                >
                    <svg
                        class="w-6 h-6 fill-current"
                        id="Capa_1"
                        enable-background="new 0 0 515.556 515.556"
                        height="512"
                        viewBox="0 0 515.556 515.556"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m348.918 37.751c50.334 50.334 50.334 131.942 0 182.276s-131.942 50.334-182.276 0-50.334-131.942 0-182.276c50.334-50.335 131.942-50.335 182.276 0"
                        />
                        <path
                            d="m455.486 350.669c-117.498-79.391-277.917-79.391-395.415 0-17.433 11.769-27.848 31.656-27.848 53.211v111.676h451.111v-111.676c0-21.555-10.416-41.442-27.848-53.211z"
                        />
                    </svg>
                </router-link>
                <router-link
                    v-else
                    :to="{ path: '/account' }"
                    class="block px-2 py-1 mt-1 font-semibold text-blue-700 rounded sm:mt-0 sm:ml-2"
                >
                    <svg
                        class="w-6 h-6 fill-current"
                        id="Capa_1"
                        enable-background="new 0 0 515.556 515.556"
                        height="512"
                        viewBox="0 0 515.556 515.556"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m348.918 37.751c50.334 50.334 50.334 131.942 0 182.276s-131.942 50.334-182.276 0-50.334-131.942 0-182.276c50.334-50.335 131.942-50.335 182.276 0"
                        />
                        <path
                            d="m455.486 350.669c-117.498-79.391-277.917-79.391-395.415 0-17.433 11.769-27.848 31.656-27.848 53.211v111.676h451.111v-111.676c0-21.555-10.416-41.442-27.848-53.211z"
                        />
                    </svg>
                </router-link>
            </nav>
        </header>
        <nav class="px-8 pt-2 bg-transparent shadow-md">
            <div class="flex justify-center -mb-px">
                <a
                    class="py-3 mr-8 text-xs font-bold tracking-wide no-underline uppercase border-b-2 border-transparent text-grey-dark hover:underline"
                    href="#"
                    >Home</a
                >
                <a
                    class="py-3 mr-8 text-xs font-bold tracking-wide no-underline uppercase border-b-2 border-transparent text-grey-dark hover:underline"
                    href="#"
                    >Products</a
                >
                <a
                    class="py-3 mr-8 text-xs font-bold tracking-wide no-underline uppercase border-b-2 border-transparent text-grey-dark hover:underline"
                    href="#"
                    >About us</a
                >
                <a
                    class="py-3 text-xs font-bold tracking-wide no-underline uppercase border-b-2 border-transparent text-grey-dark hover:underline"
                    href="#"
                    >Contact</a
                >
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '../store/index';
export default {
    data() {
        return {
            isOpen: false,
        };
    },
    computed: {
        ...mapGetters('cart', ['cartLength']),
        ...mapGetters('user', ['isCurrentUser', 'currentUser']),
    },
};
</script>

<style></style>
