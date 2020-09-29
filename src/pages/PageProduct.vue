<template>
    <div class="flex flex-col m-12">
        <div class="flex justify-center w-2/3 mx-auto mt-10">
            <div class="">
                <img
                    class="object-cover h-64 w-80"
                    :src="productByID.urlPhoto"
                    :alt="productByID.name"
                />
            </div>
            <div class="relative w-2/5 px-8 mx-20 mr-4">
                <h2 class="font-bold uppercase">{{ productByID.name }}</h2>
                <p class="mt-2 font-bold">
                    Manufacture:
                    <span class="font-normal">{{
                        productByID.manufacture
                    }}</span>
                </p>
                <p class="mt-2 font-bold">
                    Price:
                    <span class="font-normal">${{ productByID.price }}</span>
                </p>
                <div class="flex items-center mt-2 font-bold">
                    <div>Documentation:</div>
                    <a
                        v-if="productByID.urlDocumentation"
                        v-bind:href="productByID.urlDocumentation"
                        class="font-normal"
                    >
                        Datasheet
                    </a>
                    <div v-else class="ml-2">X</div>
                </div>
                <p class="mt-2 font-bold">
                    Total:
                    <span class="font-normal"
                        >${{ productByID.price * productQuantity }}</span
                    >
                </p>
                <div class="flex justify-between mt-4">
                    <div class="flex items-center justify-start">
                        <button
                            class="flex items-center justify-center w-10 h-10 duration-300 transform bg-gray-300 rounded-lg translation focus:outline-none hover:bg-gray-400"
                            @click="
                                productQuantity > 1 ? productQuantity-- : ''
                            "
                        >
                            -
                        </button>

                        <p class="px-3">{{ productQuantity }}</p>

                        <button
                            class="flex items-center justify-center w-10 h-10 duration-300 transform bg-gray-300 rounded-lg translation focus:outline-none hover:bg-gray-400"
                            @click="productQuantity++"
                        >
                            +
                        </button>
                    </div>
                    <button
                        @click="addToCart()"
                        class="w-1/2 px-4 py-2 text-white bg-blue-600 rounded-lg "
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
        <div class="w-2/3 mx-auto mt-12">
            <div
                class="px-24 mt-1"
                v-for="(value, index) in productByID.specification"
                :key="index"
            >
                <div class="flex bg-gray-200">
                    <div
                        class="flex-none w-1/2 px-4 py-2 m-2 text-center text-gray-700 bg-gray-400"
                    >
                        {{ value.title }}
                    </div>
                    <div
                        class="w-1/2 px-4 py-2 m-2 text-center text-gray-800 bg-gray-500 flex-"
                    >
                        {{ value.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from '../store/index';
export default {
    data() {
        return {
            productQuantity: 1,
        };
    },
    methods: {
        ...mapActions('product', ['getProductByID']),
        addToCart() {
            store.dispatch('cart/addToCart', {
                product: this.productByID,
                quantity: this.productQuantity,
            });
            this.$router.push({ path: '/' });
        },
    },
    computed: {
        ...mapGetters('product', ['productByID']),
    },
    async created() {
        await this.getProductByID(this.$route.params.id);
    },
};
</script>

<style></style>
