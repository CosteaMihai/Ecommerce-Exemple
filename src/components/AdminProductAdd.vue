<template>
    <AdminProductForm
        :parentProduct.sync="product"
        :operationToExecute="'add'"
        style="width: 75%; margin: 1.5rem auto 1.5rem auto"
        @add-product="add"
    />
</template>

<script>
import AdminProductForm from './AdminProductForm';
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            product: this.freshProductObject(),
        };
    },
    components: {
        AdminProductForm,
    },
    methods: {
        async add(payload) {
            await this.addProduct(payload);
        },
        freshProductObject() {
            return {
                name: '',
                manufacture: '',
                price: '',
                stock: '',
                specification: [
                    {
                        title: '',
                        description: '',
                    },
                ],
                category: null,
                urlPhoto: '',
                urlDocumentation: '',
            };
        },
        ...mapActions('product', ['addProduct']),
    },
};
</script>

<style></style>
