<template>
    <div>
        <input
            :id="label"
            :value="value"
            placeholder="Ana Are mre"
            @input="updateValue"
            v-bind="$attrs"
        />
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            required: true,
            default: '',
        },
        value: [String, Number],
    },
    methods: {
        updateValue(product) {
            this.$emit('input', product.target.value);
        },
    },
};
</script>

<style lang="css" scoped>
div {
    margin: 0.5rem 1rem 0.5rem 1rem;
    border-bottom-width: 1px;
    border-color: #4299e1;
    transition: 0.5s;
    padding: 0.5rem 0 0.5rem 0;
}
div:focus-within {
    border-color: #2b6cb0;
}
input {
    width: 100%;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    line-height: 1.25rem;
}
input:focus {
    outline: 0;
}
</style>
