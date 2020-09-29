<template>
    <div>
        <Navbar />
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
    methods: {
        ...mapActions('product', ['initialPage']),
    },
    created() {
        this.initialPage();
    },
};
</script>

<style></style>
