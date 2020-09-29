<template>
    <div class="flex">
        <div class="flex-none overflow-hidden">
            <img
                class="object-cover w-32 h-32"
                :src="product.product.urlPhoto"
                :alt="product.product.name"
            />
        </div>
        <div class="flex items-center justify-between w-full px-10 ml-10">
            <div class="font-semibold">
                {{ product.product.name }}
                <div class="-mb-2 font-normal">Qnt: {{ product.quantity }}</div>
            </div>
            <div class="">${{ product.product.price * product.quantity }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style></style>
