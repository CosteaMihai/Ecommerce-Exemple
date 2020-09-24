<template>
    <div class="grid grid-cols-4 mx-32 mt-16">
        <ProductCard
            v-for="(product, index) in products"
            v-bind:key="index"
            :product="product"
            class="mx-5 my-10 w-80"
        />
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard';
import { mapGetters } from 'vuex';
export default {
    components: {
        ProductCard,
        //LeftMenu,
    },
    computed: {
        ...mapGetters(['products']),
    },
};
</script>
