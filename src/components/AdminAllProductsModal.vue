<template>
    <transition name="modal">
        <div class="modal-mask" @click.self="$emit('close-modal')">
            <div class="modal-container scrollbar">
                <AdminAllProductsModification :parentProduct="product" />
            </div>
        </div>
    </transition>
</template>
<script>
import AdminAllProductsModification from './AdminAllProductsModification';
export default {
    components: {
        AdminAllProductsModification,
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
};
</script>
<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
    overflow: hidden;
}

.modal-container {
    width: 50%;
    height: 75vh;
    max-height: 100%;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    overflow: auto;
    font-family: Helvetica, Arial, sans-serif;
}
.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
}
.scrollbar {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

.scrollbar::-webkit-scrollbar {
    width: 6px;
    background: transparent;
}

.scrollbar::-webkit-scrollbar-thumb {
    background: #d3d3d3;
    border-radius: 12px;
}
</style>
