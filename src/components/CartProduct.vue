<template>
    <div
        class="relative flex max-w-6xl px-2 py-2 mx-auto border border-blue-200 rounded-lg"
    >
        <div class="flex-none overflow-hidden">
            <img
                class="object-cover w-48 h-48"
                :src="cartItem.product.urlPhoto"
                :alt="cartItem.product.name"
            />
        </div>

        <div class="flex flex-col justify-center ml-10">
            <div class="font-semibold">{{ cartItem.product.name }}</div>
            <div class="mt-1 font-semibold">
                {{ cartItem.product.manufacture }}
            </div>
            <div class="mt-1">
                ${{ cartItem.product.price * cartItem.quantity }}
            </div>
            <div class="flex items-center justify-start mt-6">
                <button
                    class="flex items-center justify-center w-10 h-10 duration-300 bg-gray-300 rounded-lg focus:outline-none"
                    @click="addOrSubstractItemQuantity(-1)"
                    :class="
                        cartItem.quantity == 1
                            ? 'opacity-50'
                            : 'hover:bg-gray-400'
                    "
                >
                    -
                </button>

                <p class="px-3">{{ cartItem.quantity }}</p>

                <button
                    class="flex items-center justify-center w-10 h-10 duration-300 bg-gray-300 rounded-lg focus:outline-none hover:bg-gray-400"
                    @click="addOrSubstractItemQuantity(1)"
                >
                    +
                </button>
            </div>
        </div>
        <div class="absolute top-0 bottom-0 right-0 flex items-center mr-8">
            <button
                class="focus:outline-none"
                @click.prevent="deleteCartItem()"
            >
                <svg
                    height="512pt"
                    viewBox="0 0 512 512"
                    width="512pt"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                >
                    <path
                        d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
                        fill="#f44336"
                    />
                    <path
                        d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
                        fill="#fafafa"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import store from '../store/index';
export default {
    props: ['cartItem'],
    methods: {
        addOrSubstractItemQuantity(value) {
            if (this.cartItem.quantity < 2 && value == -1) return;
            const cartObject = {
                product: this.cartItem.product,
                quantity: value,
            };
            store.dispatch('cart/addToCart', cartObject);
        },
        deleteCartItem() {
            store.dispatch('cart/deleteFromCart', this.cartItem);
        },
    },
};
</script>

<style></style>
