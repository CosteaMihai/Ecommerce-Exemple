<template>
    <form class="form">
        <BaseInput :label="'Name'" v-model="product.name" />
        <BaseInput :label="'Manufacture'" v-model="product.manufacture" />
        <BaseInput :label="'Type'" v-model="product.type" />
        <BaseInput
            :label="'Documentation'"
            v-model="product.urlDocumentation"
        />
        <BaseInput :label="'Price'" v-model="product.price" />
        <BaseInput :label="'Stock'" v-model="product.stock" />
    </form>
</template>

<script>
export default {
    props: {
        parentProduct: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            product: Object.assign({}, this.parentProduct),
        };
    },
};
</script>

<style lang="css" scoped>
.form {
    display: grid;
    margin: 1.5rem auto 1.5rem auto;
    grid-template-columns: repeat(2, 1fr);
}
</style>
