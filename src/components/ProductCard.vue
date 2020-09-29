<template>
    <div class="overflow-hidden bg-white rounded-lg shadow-xl">
        <router-link :to="{ name: 'Product', params: { id: product.id } }">
            <img
                class="object-cover w-full h-48"
                :src="product.urlPhoto"
                :alt="product.name"
            />
        </router-link>
        <div class="px-2 py-4">
            <router-link :to="{ name: 'Product', params: { id: product.id } }">
                <div
                    class="h-12 overflow-hidden text-lg font-semibold text-center text-gray-800"
                >
                    {{ product.name }}
                </div>
            </router-link>
            <p class="mt-4 text-center text-gray-600">${{ product.price }}</p>
            <div class="flex justify-center mt-4">
                <div
                    class="px-2 py-1 text-center text-white rounded-md"
                    :class="product.stock > 0 ? ' bg-green-400' : 'bg-red-500'"
                >
                    {{ product.stock > 0 ? 'In stock' : 'Sold out' }}
                </div>
            </div>
            <div class="flex justify-center mt-4">
                <button
                    :disabled="!product.stock"
                    class="px-5 py-2 mr-3 font-semibold text-white bg-blue-600 rounded-md shadow-md "
                    :class="
                        product.stock
                            ? 'hover:bg-blue-500 duration-500'
                            : 'opacity-50'
                    "
                    @click.prevent="addToChart()"
                >
                    Add to cart
                </button>
                <router-link
                    :to="{ name: 'Product', params: { id: product.id } }"
                    class="px-3 py-2 ml-3 font-semibold text-white duration-500 bg-gray-600 rounded-md shadow-md hover:bg-gray-500"
                >
                    More
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store/index';
export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    methods: {
        addToChart() {
            store.dispatch('cart/addToCart', {
                product: this.product,
                quantity: 1,
            });
        },
    },
};
</script>
