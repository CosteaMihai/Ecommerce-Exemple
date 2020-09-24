<template>
    <div class="flex flex-col m-12">
        <div class="flex justify-center w-2/3 mx-auto mt-10">
            <div class="">
                <img class="object-cover h-64 w-80" :src="product.urlPoza" :alt="product.name" />
            </div>
            <div class="relative w-2/5 px-8 mx-20 mr-4">
                <h2 class="font-bold uppercase">{{ product.name }}</h2>
                <p class="mt-2 font-bold">
                    Manufacture: <span class="font-normal">{{ product.manufacture }}</span>
                </p>
                <p class="mt-2 font-bold">
                    Price: <span class="font-normal">${{ product.price }}</span>
                </p>
                <div class="flex items-center mt-2 font-bold">
                    <div>Documentation:</div>
                    <a v-if="product.urlDocumentation" v-bind:href="product.urlDocumentation" class="font-normal">
                        Datasheet
                    </a>
                    <div v-else class="ml-2"><Xsvg class="w-3 h-3" /></div>
                </div>
                <p class="mt-2 font-bold">
                    Total: <span class="font-normal">${{ product.price * productQuantity }}</span>
                </p>
                <div class="flex justify-between mt-4">
                    <div class="flex items-center justify-start">
                        <button
                            class="flex items-center justify-center w-10 h-10 duration-300 transform bg-gray-300 rounded-lg translation focus:outline-none hover:bg-gray-400"
                            @click="productQuantity > 1 ? productQuantity-- : ''"
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
                    <button @click="addToCart()" class="w-1/2 px-4 py-2 text-white bg-blue-600 rounded-lg ">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
        <div class="w-2/3 mx-auto mt-12">
            <div
                class="px-24 mt-1"
                v-for="(value, specificationName) in product.specifications"
                :key="specificationName"
            >
                <div class="flex bg-gray-200">
                    <div class="flex-none w-1/2 px-4 py-2 m-2 text-center text-gray-700 bg-gray-400">
                        {{ specificationName }}
                    </div>
                    <div class="w-1/2 px-4 py-2 m-2 text-center text-gray-800 bg-gray-500 flex-">
                        {{ value }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Xsvg from '../assets/svg/x.svg';
import store from '../store/index';
import { db } from '../main';
export default {
    components: {
        Xsvg,
    },
    data() {
        return {
            id: this.$route.params.id,
            product: {},
            productQuantity: 1,
        };
    },
    methods: {
        addToCart() {
            const cartObject = {
                product: this.product,
                quantity: this.productQuantity,
            };
            store.commit('addProductToCart', cartObject);
            this.$router.push({ path: '/' });
        },
    },
    async beforeMount() {
        try {
            const doc = await db
                .collection('products')
                .doc(this.id)
                .get();
            if (doc.exists) {
                this.product = doc.data();
                console.log(this.product);
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
            }
        } catch (error) {
            console.log('Error getting document:', error);
        }
    },
};
</script>

<style></style>
