<template>
    <div>
        <div v-show="!checkout">
            <div v-if="cartProducts.length" class="max-w-full mx-auto mt-10 rounded-lg">
                <div v-for="(cartItem, index) in cartProducts" :key="index" class="mx-auto">
                    <CartProduct :cartItem="cartItem" class="mt-8" />
                </div>
                <div class="flex items-center justify-between max-w-6xl mx-auto mt-10 mb-16">
                    <div class="font-semibold uppercase">Total: ${{ totalCart }}</div>
                    <button
                        @click.prevent="checkout = true"
                        class="px-10 py-3 text-lg text-white bg-blue-500 rounded-lg shadow-lg"
                    >
                        Checkout
                    </button>
                </div>
            </div>
            <div v-else class="max-w-6xl mx-auto mt-10 text-center">
                <div class="text-lg">The cart is empty</div>
                <button
                    class="px-10 py-3 mt-20 text-lg text-white bg-blue-500 rounded-lg shadow-lg focus:outline-none"
                    @click="$router.push({ path: '/' })"
                >
                    Add products
                </button>
            </div>
        </div>
        <div v-show="checkout">
            <div class="max-w-full mx-auto mt-10 rounded-lg">
                <Checkout @cancel="checkout = false" />
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store/index';
import CartProduct from '../components/CartProduct';
import Checkout from '../components/Checkout';
export default {
    components: {
        Checkout,
        CartProduct,
    },
    data() {
        return {
            checkout: false,
            cartProducts: store.state.cart,
        };
    },
    computed: {
        totalCart() {
            let total = 0;
            for (let item of store.state.cart) {
                console.log(item);
                total += item.quantity * item.product.price;
            }
            return total;
        },
    },
};
</script>

<style></style>
