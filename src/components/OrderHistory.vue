<template>
    <div class="h-full px-10 py-10 bg-blue-500 rounded-lg shadow-lg lg:px-5">
        <div
            v-for="(order, index) in orders"
            :key="index"
            class="flex justify-between px-10 py-2 my-5 bg-white rounded-lg"
        >
            <div class="flex">
                <div v-for="(product, index) in order.products" :key="index">
                    <div
                        class="flex-none px-4 overflow-hidden"
                        v-if="index < 3"
                    >
                        <img
                            class="object-cover w-40 h-40"
                            :src="product.product.urlPhoto"
                            :alt="product.product.name"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-center justify-between py-3 ">
                <router-link
                    :to="{ name: 'Order', params: { id: order.id } }"
                    class=""
                >
                    <button
                        class="px-10 py-3 text-white bg-blue-500 rounded-lg shadow-lg "
                    >
                        Order view
                    </button>
                </router-link>
                <div class="font-thin">
                    <div class="">Total: ${{ totalOrder(order) }}</div>
                    <div>
                        Pyment Method :
                        <span class="uppercase">{{ order.paymentMethod }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../main';
export default {
    props: ['currentUser'],
    data() {
        return {
            orders: [],
        };
    },
    methods: {
        totalOrder(order) {
            let total = 0;
            for (let item of order.products) {
                console.log(item);
                total += item.quantity * item.product.price;
            }
            return total;
        },
    },
    async beforeMount() {
        try {
            console.log(this.currentUser.id);
            const snapshot = await db
                .collection('orders')
                .where('userID', '==', this.currentUser.id)
                .get();
            await snapshot.forEach((doc) => {
                let product = { ...doc.data() };
                product.id = doc.id;
                this.orders.push(product);
            });
        } catch (error) {
            console.log('Error getting documents: ', error);
        }
    },
};
</script>

<style></style>
