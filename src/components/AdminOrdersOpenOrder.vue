<template>
    <div class="admin-order">
        <button class="back-button" @click="$emit('close-order')">Back</button>
        <div class="order-section">
            <div style="font-size:18px">
                Order Number:
                <span style="font-weight:600">{{ order.id }}</span>
            </div>
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
            <button class="order-delete-button">Delete</button>
        </div>
    </div>
</template>

<script>
import { formatDate } from '@/helpers/order.js';
export default {
    props: {
        order: {
            type: Object,
            required: true,
        },
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
.admin-order {
    width: 80%;
    margin: 50px auto;
}
.order-section {
    margin-top: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.back-button {
    background: #4299e1;
    color: white;
    width: 65px;
    height: 27px;
    border-radius: 3px;
    transition: background 0.5s;
}
.back-button::before {
    content: '<';
    font-size: 18px;
}
.back-button:focus {
    outline: 0;
}
.back-button:hover {
    background: #2b6cb0;
}
.order-section button {
    color: white;
    padding: 2px 10px;
    border-radius: 5px;
}
.order-section button:focus {
    outline: 0;
}
.order-products {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 50px 0px 20px 0px;

    border-bottom: 1px solid #4299e1;
}
.order-products div:first-child {
    display: flex;
}

.order-products img {
    width: 200px;
    height: 200px;
    object-fit: cover;
}
.order-product-total {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.order-owner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
}
.order-owner div {
    text-align: center;
    margin-top: 10px;
}
.order-delete-button {
    background: #fd4c4c;
    color: white;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    border-radius: 5px;
    padding: 5px 30px;
}
</style>
