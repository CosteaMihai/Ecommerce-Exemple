<template>
    <div class="flex flex-col px-10 pt-5 pb-10 mx-32 mt-10 mb-10 text-white bg-blue-500 rounded-lg">
        <div class="font-thin">
            Order number: <span class="font-semibold">{{ $route.params.id }}</span>
        </div>
        <div class="mt-5 font-thin">
            Products:
            <div
                v-for="(item, index) in order.products"
                :key="index"
                class="w-full px-10 py-1 mt-5 text-black bg-white rounded-lg"
            >
                <div class="flex items-center justify-between">
                    <div class="flex">
                        <div class="flex-none px-4 overflow-hidden">
                            <img class="object-cover w-32 h-32" :src="item.product.urlPoza" :alt="item.product.name" />
                        </div>
                        <div class="flex flex-col ml-10">
                            <div class="mt-2">{{ item.product.name }}</div>
                            <div class="mt-2 text-xs">{{ item.product.manufacture }}</div>
                        </div>
                    </div>

                    <div class="flex">
                        <div class="mr-10">Quantity: {{ item.quantity }}</div>
                        <div>Price: ${{ item.product.price }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between px-2 mt-5">
            <div>
                Payment method: <span class="uppercase">{{ order.paymentMethod }}</span>
            </div>
            <div>
                Total order: <span class="uppercase">${{ total }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../../main';
export default {
    data() {
        return {
            order: {},
        };
    },
    computed: {
        total() {
            let total = 0;
            for (let item of this.order.products) {
                total = item.quantity * item.product.price;
            }
            return total;
        },
    },
    async created() {
        try {
            let snapshot = await db
                .collection('orders')
                .doc(this.$route.params.id)
                .get();

            if (snapshot.exists) {
                this.order = snapshot.data();
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.log('Error getting document:', error);
        }
        console.log(this.order);
    },
};
</script>

<style></style>
