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
        <AdminAllProducts v-show="state === 0" />
        <AdminAddProduct v-show="state === 1" />
        <AdminOrders v-show="state === 2" />
    </div>
</template>

<script>
import AdminAddProduct from '@/components/AdminAddProduct';
import AdminAllProducts from '@/components/AdminAllProducts';
import AdminOrders from '@/components/AdminOrders';
export default {
    components: {
        AdminAddProduct,
        AdminOrders,
        AdminAllProducts,
    },
    data() {
        return {
            state: 0,
            buttons: ['All products', 'Add new product', 'Orders'],
        };
    },
};
</script>

<style></style>
