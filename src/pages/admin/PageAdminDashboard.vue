<template>
    <div>
        <div class="admin-navbar">
            <div
                v-for="(button, index) in buttons"
                :key="index"
                style="margin-right:0.25rem;"
                :style="state === index ? 'margin-bottom:-1px;' : ''"
            >
                <button
                    class="admin-navbar-button"
                    :class="
                        state === index ? 'admin-navbar-button-selected' : ''
                    "
                    @click.prevent="
                        button != 'Sign Out' ? (state = index) : signOut()
                    "
                >
                    {{ button }}
                </button>
            </div>
        </div>
        <AdminProducts v-if="state === 0" @change-to-add="state = 1" />
        <AdminProductAdd v-show="state === 1" />
        <AdminOrders v-show="state === 2" />
        <AdminCategories v-show="state === 3" />
    </div>
</template>

<script>
import AdminProductAdd from '@/components/admin/AdminProductAdd';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminCategories from '@/components/admin/AdminCategories';
import store from '../../store/index';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        AdminProductAdd,
        AdminOrders,
        AdminProducts,
        AdminCategories,
    },
    data() {
        return {
            state: 0,
            buttons: [
                'All products',
                'Add new product',
                'Orders',
                'Categories',
                'Sign Out',
            ],
        };
    },
    methods: {
        signOut() {
            this.signOutAdmin();
            this.$router.push({ name: 'Admin' });
            window.location.reload();
        },
        ...mapActions('admin', ['signOutAdmin']),
    },
    async created() {
        await store.dispatch('categories/fetchCategories');
        await store.dispatch('product/initialPage');
        const startDate = new Date(Date.now());
        const endDate = new Date(Date.now());
        startDate.setHours(0, 0, 0);
        endDate.setHours(23, 59, 59);
        await store.dispatch('order/fetchOrders', {
            startDate,
            endDate,
            range: [0, 1, 2],
        });
    },
};
</script>

<style scoped>
@import './../../assets/css/modules/admin_page/admin_dashboard.css';
</style>
