<template>
    <div class="flex">
        <div class="flex-none overflow-hidden">
            <img class="h-32 w-32 object-cover" :src="product.product.urlPoza" :alt="product.product.name" />
        </div>
        <div class="flex items-center ml-10 w-full justify-between px-10">
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
    props: ['product'],
};
</script>

<style></style>
