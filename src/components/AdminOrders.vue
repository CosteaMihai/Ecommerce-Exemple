<template>
    <div v-if="!openOrder" class="orders-section">
        <div class="order-table">
            <div>
                Order ID
            </div>
            <div>
                No of products
            </div>
            <div>
                Date
            </div>
            <div>
                Status
            </div>
        </div>
        <div v-for="order in orders" :key="order.id" class="order-table">
            <div>
                <button
                    @click.prevent="
                        currentOrder = order;
                        openOrder = true;
                    "
                >
                    {{ order.id }}
                </button>
            </div>
            <div>
                {{ order.order.products.length }}
            </div>
            <div>
                {{ orderDate(order.order.date) }}
            </div>
            <div>
                <button
                    :style="
                        order.order.complete
                            ? 'background:limegreen;'
                            : 'background: #4299e1;'
                    "
                >
                    {{ order.order.complete ? 'Done' : 'Pending' }}
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        <AdminOrdersOpenOrder :order="currentOrder" @close-order="closeOrder" />
    </div>
</template>

<script>
import AdminOrdersOpenOrder from './AdminOrdersOpenOrder';
import { formatDate } from '@/helpers/order.js';
import { mapGetters } from 'vuex';
export default {
    components: {
        AdminOrdersOpenOrder,
    },
    data() {
        return {
            openOrder: false,
            currentOrder: '',
        };
    },
    methods: {
        orderDate(date) {
            return date ? formatDate(date) : '';
        },
        closeOrder() {
            this.openOrder = false;
            this.currentOrder = '';
        },
    },
    computed: {
        ...mapGetters('order', ['orders']),
    },
};
</script>

<style scoped>
.orders-section {
    width: 90%;
    margin: 40px auto;
}
.order-table {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}
.order-table div {
    color: #4299e1;
    text-align: center;
    padding-bottom: 5px;
    border-bottom: 1px solid #e2e8f0;
    margin-top: 10px;
}
.order-table div button {
    color: white;
    padding: 2px 10px;
    border-radius: 5px;
}
.order-table div button:focus {
    outline: 0;
}
.order-table div:first-child button {
    color: #4299e1;
    border-radius: 0px;
    border-bottom: 1px solid transparent;
    transition: border 0.3s, color 0.3s;
}
.order-table div:first-child button:hover {
    border-bottom-color: #2b6cb0;
    color: #2b6cb0;
}
</style>
