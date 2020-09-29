<template>
    <div>
        <div
            class="grid w-4/5 gap-20 mx-auto mt-16 xl:grid-cols-3 xxl:grid-cols-4"
        >
            <ProductCard
                v-for="(product, index) in products"
                v-bind:key="index"
                :product="product"
                class="px-4 border border-gray-200"
            />
        </div>
        <div class="inline-flex justify-center w-full mx-auto mt-16 mb-32">
            <button
                class="px-4 py-2 font-bold text-gray-800 duration-500 bg-gray-300 rounded-l focus:outline-none"
                :class="
                    isPrevious
                        ? 'duration-500 hover:bg-gray-400'
                        : 'opacity-50 cursor-not-allowed'
                "
                @click.prevent="isPrevious ? previousPage() : ''"
            >
                Prev
            </button>
            <button
                class="px-4 py-2 font-bold text-gray-800 duration-500 bg-gray-300 rounded-r focus:outline-none"
                :class="
                    isNext
                        ? 'duration-500 hover:bg-gray-400'
                        : 'opacity-50 cursor-not-allowed'
                "
                @click.prevent="isNext ? nextPage() : ''"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard';
import { mapGetters, mapActions } from 'vuex';
export default {
    components: {
        ProductCard,
    },
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
