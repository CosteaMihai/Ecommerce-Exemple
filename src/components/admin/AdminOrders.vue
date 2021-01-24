<template>
    <div v-if="!openOrder" class="orders-section">
        <div class="order-search">
            <div style="width:33%; position: relative;">
                <BaseInput
                    class="search-input"
                    :label="'Search by ID'"
                    v-model="idToSearch"
                    @change.prevent="searchByID()"
                />
                <button
                    v-if="idToSearch"
                    class="clear-button"
                    @click.prevent="clear()"
                >
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512.001 512.001"
                        style="enable-background:new 0 0 512.001 512.001;"
                        xml:space="preserve"
                    >
                        <g>
                            <g>
                                <path
                                    d="M294.111,256.001L504.109,46.003c10.523-10.524,10.523-27.586,0-38.109c-10.524-10.524-27.587-10.524-38.11,0L256,217.892
			L46.002,7.894c-10.524-10.524-27.586-10.524-38.109,0s-10.524,27.586,0,38.109l209.998,209.998L7.893,465.999
			c-10.524,10.524-10.524,27.586,0,38.109c10.524,10.524,27.586,10.523,38.109,0L256,294.11l209.997,209.998
			c10.524,10.524,27.587,10.523,38.11,0c10.523-10.524,10.523-27.586,0-38.109L294.111,256.001z"
                                />
                            </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                    </svg>
                </button>
            </div>
            <date-picker
                v-model="startDate"
                type="date"
                value-type="timestamp"
                :editable="false"
                :clearable="false"
                @change="searchByDate()"
            >
            </date-picker>
        </div>
        <div class="order-filter">
            <div>
                <input
                    type="checkbox"
                    id="value0"
                    name="value0"
                    :value="0"
                    v-model="statusRnage"
                />
                <label for="value0"> Pending</label>
            </div>

            <div>
                <input
                    type="checkbox"
                    id="value1"
                    name="value1"
                    :value="1"
                    v-model="statusRnage"
                />
                <label for="value1"> Done</label>
            </div>

            <div>
                <input
                    type="checkbox"
                    id="value2"
                    name="value2"
                    :value="2"
                    v-model="statusRnage"
                />
                <label for="value2"> Canceled</label>
            </div>
        </div>
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
                <span
                    class="order-status"
                    :style="
                        order.order.status == 1
                            ? 'background:limegreen;'
                            : order.order.status == 0
                            ? 'background: #4299e1;'
                            : 'background:#fd4c4c;'
                    "
                >
                    {{
                        order.order.status == 0
                            ? 'Pending'
                            : order.order.status == 1
                            ? 'Done'
                            : 'Canceled'
                    }}
                </span>
            </div>
        </div>
    </div>
    <div v-else>
        <AdminOrdersOpenOrder :order="currentOrder" @close-order="closeOrder" />
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import AdminOrdersOpenOrder from './AdminOrdersOpenOrder';
import { formatDate } from '@/helpers/order.js';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        AdminOrdersOpenOrder,
        DatePicker,
    },
    data() {
        return {
            openOrder: false,
            currentOrder: '',
            startDate: Date.now(),
            statusRnage: [],
            idToSearch: '',
        };
    },
    watch: {
        statusRnage(newValue) {
            const startDate = new Date(this.startDate);
            let endDate = new Date(this.startDate);
            endDate.setHours(23, 59, 59);
            this.fetchOrders({ startDate, endDate, range: newValue });
        },
    },
    methods: {
        clear() {
            if (!this.idToSearch) return;
            this.idToSearch = '';
            this.statusRnage = [];
            this.startDate = Date.now();
            this.searchByDate();
        },
        searchByID() {
            this.statusRnage = [];
            this.startDate = Date.now();
            if (this.idToSearch) {
                this.searchOrderByID(this.idToSearch);
            } else {
                this.searchByDate();
            }
        },
        orderDate(date) {
            return date ? formatDate(date) : '';
        },
        closeOrder() {
            this.openOrder = false;
            this.currentOrder = '';
        },
        searchByDate() {
            const startDate = new Date(this.startDate);
            let endDate = new Date(this.startDate);
            endDate.setHours(23, 59, 59);
            this.fetchOrders({ startDate, endDate, range: [0, 1, 2] });
        },
        ...mapActions('order', ['fetchOrders', 'searchOrderByID']),
    },
    computed: {
        ...mapGetters('order', ['orders']),
    },
};
</script>

<style scoped>
@import './../../assets/css/modules/admin_page/admin_order.css';
</style>
