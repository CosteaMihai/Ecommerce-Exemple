<template>
    <div>
        <div>{{ products }}</div>
        <button
            v-show="isPrevious"
            @click.prevent="previousPage()"
            class="w-10 h-10"
        >
            prev
        </button>
        <button v-show="isNext" @click.prevent="nextPage()" class="w-10 h-10">
            next
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions('product', ['initialPage', 'nextPage', 'previousPage']),
    },
    computed: {
        ...mapGetters('product', ['products', 'isNext', 'isPrevious']),
    },
    created() {
        this.initialPage();
    },
};
</script>

<style></style>
