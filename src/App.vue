<template>
    <div id="app">
        <Navbar
            v-if="
                routeName !== 'Admin' &&
                    routeName !== 'Admin Dashboard' &&
                    routeName !== 'Not Found'
            "
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
    methods: {
        ...mapActions('product', ['initialPage']),
        ...mapActions('categories', ['fetchCategories']),
    },
    computed: {
        routeName() {
            return this.$route.name;
        },
    },
    async created() {
        if (
            this.$route.name === 'Admin' ||
            this.$route.name === 'Admin Dashboard'
        )
            return;
        await this.initialPage();
        await this.fetchCategories();
    },
};
</script>

<style>
#app {
    font-family: 'Livvic', Arial, Helvetica, sans-serif;
}
</style>
