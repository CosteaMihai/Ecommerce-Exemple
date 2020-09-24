<template>
    <div>
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
//import store from './store/index';
import { mapActions } from 'vuex';
export default {
    components: {
        Navbar,
    },
    methods: {
        ...mapActions(['getProductsFromDatabase']),
    },
    created() {
        this.getProductsFromDatabase();
    },
};
</script>

<style></style>
