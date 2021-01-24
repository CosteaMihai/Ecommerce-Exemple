<template>
    <transition-group tag="div" name="row">
        <div
            v-for="(row, index) in $v.specification.$each.$iter"
            :key="index"
            class="specification-section"
        >
            <BaseInput
                :label="'Title'"
                :id="`Titile${index}`"
                v-model.lazy="row.title.$model"
                :error="row.title.$error"
                @blur="row.title.$touch()"
                style="grid-column-start:1;grid-column-end: span 4;"
            />

            <BaseInput
                :error="row.description.$error"
                @blur="row.description.$touch()"
                style="grid-column-start:6;grid-column-end: span 4;"
                :label="'Description'"
                :id="`Description${index}`"
                v-model.lazy="row.description.$model"
            />
            <div class="specification-button-add">
                <button
                    v-if="index == specification.length - 1"
                    @click.prevent="addRow()"
                >
                    <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 512"
                        style="enable-background:new 0 0 512 512;"
                        xml:space="preserve"
                    >
                        <g>
                            <g>
                                <path
                                    d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341
			c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z
			"
                                />
                            </g>
                        </g>
                        <g>
                            <g>
                                <path
                                    d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318
			c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83
			s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
            <div class="specification-button-remove">
                <button v-if="index > 0" @click.prevent="removeRow(index)">
                    <svg
                        height="512pt"
                        viewBox="0 0 512 512"
                        width="512pt"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
                            fill="#f44336"
                        />
                        <path
                            d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
                            fill="#fafafa"
                        />
                    </svg>
                </button>
            </div>
            <div
                style="grid-column-start:1;grid-column-end: span 4;"
                v-if="row.title.$error"
            >
                <p class="error-message" v-if="!row.title.required">
                    The title is required!
                </p>
            </div>
            <div
                key="6"
                style="grid-column-start:6;grid-column-end: span 4;"
                v-if="row.description.$error"
            >
                <p class="error-message" v-if="!row.description.required">
                    The description is required!
                </p>
            </div>
        </div>
    </transition-group>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
export default {
    props: {
        specification: {
            type: Array,
        },
    },
    methods: {
        validate() {
            this.$v.specification.$touch();
        },
        reset() {
            this.$v.specification.$reset();
        },
        addRow() {
            this.$emit('add-row');
        },
        removeRow(index) {
            this.$emit('remove-row', index);
        },
    },
    validations: {
        specification: {
            $each: {
                title: {
                    required,
                },
                description: {
                    required,
                },
            },
        },
    },
};
</script>

<style scoped>
@import './../../assets/css/modules/admin_page/admin_specification.css';
</style>
