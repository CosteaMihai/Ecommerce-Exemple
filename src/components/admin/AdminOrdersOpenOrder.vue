<template>
    <div class="admin-order">
        <button class="back-button" @click="$emit('close-order')">Back</button>
        <div class="order-section">
            <div style="font-size:18px">
                Order Number:
                <span style="font-weight:600">{{ order.id }}</span>
            </div>
            <div
                class="order-status-div"
                :style="
                    order.order.status == 1
                        ? 'background:limegreen;'
                        : order.order.status == 0
                        ? 'background: #4299e1;'
                        : 'background:#fd4c4c;'
                "
            >
                <select
                    class="order-status-select"
                    v-model="order.order.status"
                    @change.prevent="
                        changeStatus({
                            id: order.id,
                            status: order.order.status,
                        })
                    "
                >
                    <option
                        v-for="option in options"
                        :key="option.value"
                        :value="option.value"
                        style="background:white; color:black"
                    >
                        {{ option.title }}
                    </option>
                </select>
                <span class="order-status-arraow">></span>
            </div>
        </div>
        <div class="order-section">
            <div>
                Payment method:
                <span style="text-transform:uppercase">
                    {{ order.order.paymentMethod }}
                </span>
            </div>
            <div>{{ date }}</div>
        </div>
        <div
            v-for="product in order.order.products"
            :key="product.id"
            class="order-products"
        >
            <div>
                <img
                    :src="product.product.urlPhoto"
                    :alt="product.product.id"
                />
                <div style="margin-left:30px">
                    <div style="font-size:18px; font-weight:600;">
                        {{ product.product.name }}
                    </div>
                    <div style="margin-top:10px">
                        {{ product.product.manufacture }}
                    </div>
                    <div style="margin-top:10px">
                        ID: <span>{{ product.product.id }}</span>
                    </div>
                    <div style="margin-top:10px">
                        {{ product.product.price }}$
                    </div>
                    <div style="margin-top:10px">
                        Quantity: <span>{{ product.quantity }}</span>
                    </div>
                </div>
            </div>
            <div class="order-product-total">
                <p style="font-size:18px">Total</p>
                <div>{{ product.product.price * product.quantity }}$</div>
            </div>
        </div>
        <div
            style="display:flex; justify-content:space-between; margin-top:10px"
        >
            <div>Total order:</div>
            <div>{{ totalOrder }}$</div>
        </div>
        <div class="order-owner">
            <div>
                User has an account:
                {{ order.order.user.id ? 'Yes' : 'No' }}
            </div>
            <div v-if="order.order.user.id">
                User ID:
                <span style="font-weight:600">{{ order.order.user.id }}</span>
            </div>
            <div>
                {{ order.order.user.firstName }}
                {{ order.order.user.lastName }}
            </div>
            <div>
                {{ order.order.user.email }}
            </div>
            <div>
                {{ order.order.user.phone }}
            </div>
            <button
                class="order-delete-button"
                @click.prevent="
                    $emit('close-order');
                    deleteOrder(order.id);
                "
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script>
import { formatDate } from '@/helpers/order.js';
import { mapActions } from 'vuex';
export default {
    props: {
        order: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            options: [
                {
                    title: 'Pending',
                    value: 0,
                },
                {
                    title: 'Done',
                    value: 1,
                },
                {
                    title: 'Canceled',
                    value: 2,
                },
            ],
        };
    },
    methods: {
        ...mapActions('order', ['fetchOrders', 'changeStatus', 'deleteOrder']),
    },
    computed: {
        date() {
            return this.order.order.date
                ? formatDate(this.order.order.date)
                : '';
        },
        totalOrder() {
            return this.order.order.products.reduce((acc, item) => {
                return acc + item.quantity * item.product.price;
            }, 0);
        },
    },
};
</script>

<style>
@import './../../assets/css/modules/admin_page/admin_order_item.css';
</style>
