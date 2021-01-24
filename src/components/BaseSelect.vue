<template>
    <div>
        <select
            :id="label"
            :value="value"
            @input="updateValue"
            v-bind="$attrs"
            v-on="listeners"
            :style="error ? 'border-color:#F56565;' : ''"
            required
        >
            <option disabled :value="null" selected>
                Select a category
            </option>
            <option
                v-for="(option, index) in options"
                :key="index"
                :value="option"
            >
                {{ option }}
            </option>
        </select>
        <label :for="label">{{ label }}</label>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        options: {
            type: Array,
            required: true,
        },
        label: {
            type: String,
            required: true,
            default: '',
        },
        value: [String, Number],
        error: Boolean,
    },
    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.updateValue,
            };
        },
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
    position: relative;
    margin-bottom: 5px;
}
div::after {
    content: '>';
    font: 17px 'Consolas', monospace;
    color: #333;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    right: 11px;
    top: 31px;
    padding: 0 0 2px;
    position: absolute;
    pointer-events: none;
}
select {
    height: 60px;
    width: 100%;
    padding-top: 23px;
    padding-left: 5px;
    border-bottom-width: 0.05rem;
    border-color: #4299e1;
    transition: 0.3s;
    appearance: none;
}
select:focus {
    outline: 0;
}
label {
    position: absolute;
    left: 5px;
    top: 10px;
    font-size: 14px;
    color: #2b6cb0;
}
select:valid {
    border-bottom-width: 0.1rem;
    border-color: #2b6cb0;
}
</style>
