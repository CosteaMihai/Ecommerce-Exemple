<template>
    <div
        class="modal-background"
        @click.self="closeModal()"
        :class="isOpen ? 'modal-enter-background' : 'modal-leave-background'"
    >
        <div
            class="modal-overlay scrollbar"
            :class="isOpen ? 'modal-enter-overlay' : 'modal-leave-overlay'"
        >
            <AdminProductForm
                :parentProduct="product"
                :operationToExecute="'modify'"
                @close-modal="closeModal()"
                @modify-product="update"
            />
        </div>
    </div>
</template>
<script>
import AdminProductForm from './AdminProductForm';
import { mapActions } from 'vuex';
export default {
    components: {
        AdminProductForm,
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
        isModalOpen: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return { isOpen: JSON.parse(JSON.stringify(this.isModalOpen)) };
    },
    methods: {
        closeModal() {
            this.isOpen = false;
            setTimeout(() => {
                this.$emit('close-modal');
            }, 900);
        },
        async update(payload) {
            await this.modifyProduct(payload);
            this.closeModal();
        },
        ...mapActions('product', ['modifyProduct']),
    },
};
</script>
<style scoped>
@import './../../assets/css/modules/admin_page/admin_modal.css';
</style>
