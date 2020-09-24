<template>
    <div class="flex flex-col items-center h-full bg-blue-500 rounded-lg shadow-lg">
        <div class="mt-5 text-white">
            <svg
                class="w-24 h-24 fill-current"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="510px"
                height="510px"
                viewBox="0 0 510 510"
                style="enable-background:new 0 0 510 510;"
                xml:space="preserve"
            >
                <g>
                    <g id="account-circle">
                        <path
                            d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M255,76.5
			c43.35,0,76.5,33.15,76.5,76.5s-33.15,76.5-76.5,76.5c-43.35,0-76.5-33.15-76.5-76.5S211.65,76.5,255,76.5z M255,438.6
			c-63.75,0-119.85-33.149-153-81.6c0-51,102-79.05,153-79.05S408,306,408,357C374.85,405.45,318.75,438.6,255,438.6z"
                        />
                    </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
            </svg>
        </div>
        <div class="mt-2 text-white">{{ currentUser.firstName }} {{ currentUser.lastName }}</div>
        <div class="w-full px-10">
            <button
                @click.prevent="$emit('modifyState', 1)"
                class="w-full py-3 mt-6 text-white bg-blue-800 rounded-lg shadow-lg"
            >
                Order History
            </button>
            <button
                @click.prevent="$emit('modifyState', 2)"
                class="w-full py-3 mt-6 text-white bg-blue-800 rounded-lg shadow-lg"
            >
                Personal Info
            </button>
            <button @click.prevent="logOut()" class="w-full py-3 mt-6 text-white bg-blue-800 rounded-lg shadow-lg">
                Log out
            </button>
        </div>
    </div>
</template>

<script>
import store from '../store/index';
import Cookies from 'js-cookie';
export default {
    props: ['currentUser'],
    methods: {
        logOut() {
            Cookies.remove('licenta-user');
            store.commit('deleteCurrentUser');
            this.$router.push({ path: '/' });
        },
    },
};
</script>

<style></style>
