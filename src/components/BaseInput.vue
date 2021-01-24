<template>
    <div class="form-div">
        <input
            class="form-input"
            :id="id"
            :value="value"
            :type="type"
            @input="updateValue"
            v-bind="$attrs"
            v-on="listeners"
            required
            autocomplete="off"
        />
        <label
            class="form-label"
            :for="label"
            :style="error ? 'border-color:#F56565;' : ''"
        >
            <span class="content">{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        id: {
            type: String,
        },
        label: {
            type: String,
            required: true,
            default: '',
        },
        value: [String, Number],
        error: Boolean,
        type: {
            type: String,
            required: false,
            default: 'text',
        },
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

<style scoped>
.form-div {
    position: relative;
    width: 100%;
    height: 60px;
    overflow: hidden;
    margin-bottom: 5px;
}
.form-input {
    width: 100%;
    height: 100%;
    border: none;
    padding-top: 20px;
    padding-left: 5px;
}
.form-input:focus {
    outline: 0;
}
.form-label {
    position: absolute;
    bottom: 0px;
    left: 0%;
    height: 100%;
    width: 100%;
    pointer-events: none;
    border-bottom-width: 1px;
    border-color: #4299e1;
}
.form-label::after {
    content: '';
    position: absolute;
    left: 0px;
    bottom: -1px;
    border-bottom-width: 2px;
    border-color: #2b6cb0;
    height: 100%;
    width: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}
.content {
    color: gray;
    position: absolute;
    bottom: 5px;
    left: 5px;
    transition: all 0.3s ease;
}
.form-input:focus + .form-label .content,
.form-input:valid + .form-label .content {
    transform: translateY(-110%);
    font-size: 14px;
    color: #2b6cb0;
}
.form-input:focus + .form-label::after,
.form-input:valid + .form-label::after {
    transform: translateX(0%);
}
</style>
