<template>
    <div>
        <Navbar
            v-if="routeName !== 'Admin' && routeName !== 'Admin Dashboard'"
        />
        <router-view />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { mapActions } from 'vuex';
export default {
    components: {
        Navbar,
    },
    computed: {
        routeName() {
            return this.$route.name;
        },
    },
};
</script>

<style></style>
