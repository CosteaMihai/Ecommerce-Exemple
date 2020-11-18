<template>
    <div>
        <div class="flex px-32 mt-10 border-b">
            <div
                v-for="(button, index) in buttons"
                :key="index"
                class="mr-1"
                :class="state === index ? '-mb-px' : ''"
            >
                <button
                    class="inline-block px-4 py-2 font-semibold bg-white focus:outline-none"
                    :class="
                        state === index
                            ? 'border-t border-l border-r rounded-t text-blue-700'
                            : 'transition duration-500 text-blue-500  hover:text-blue-700'
                    "
                    @click.prevent="state = index"
                >
                    {{ button }}
                </button>
            </div>
        </div>
        <AdminProducts v-show="state === 0" @change-to-add="state = 1" />
        <AdminProductAdd v-show="state === 1" />
        <AdminOrders v-show="state === 2" />
        <AdminCategories v-show="state === 3" />
    </div>
</template>

<script>
import AdminProductAdd from '@/components/AdminProductAdd';
import AdminProducts from '@/components/AdminProducts';
import AdminOrders from '@/components/AdminOrders';
import AdminCategories from '@/components/AdminCategories';
import NProgress from 'nprogress';
import store from '../../store/index';
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
            ],
        };
    },

    async created() {
        NProgress.start();
        await store.dispatch('categories/fetchCategories');
        await store.dispatch('product/initialPage');
        await store.dispatch('order/fetchOrders');
        NProgress.done();
    },
};
</script>

<style></style>
