<template>
    <form class="form">
        <div class="form-section">
            <BaseInput
                type="text"
                :label="'Name'"
                v-model.lazy="product.name"
                :error="$v.product.name.$error"
                @blur="$v.product.name.$touch()"
            />
            <BaseInput
                :label="'Manufacture'"
                v-model.lazy="product.manufacture"
                :error="$v.product.manufacture.$error"
                @blur="$v.product.manufacture.$touch()"
            />
        </div>

        <div class="form-section">
            <div v-if="$v.product.name.$error">
                <p class="error-message" v-if="!$v.product.name.required">
                    The name of the product is required!
                </p>
            </div>

            <div
                style="grid-column-start: 2;"
                v-if="$v.product.manufacture.$error"
            >
                <p
                    class="error-message"
                    v-if="!$v.product.manufacture.required"
                >
                    The manufacture name is required!
                </p>
            </div>
        </div>

        <div class="form-section">
            <BaseSelect
                :label="'Category'"
                v-model.lazy="product.category"
                :options="categories"
                :error="$v.product.category.$error"
                @blur="$v.product.category.$touch()"
            />
            <BaseInput
                :label="'Documentation'"
                v-model.lazy="product.urlDocumentation"
                :error="$v.product.urlDocumentation.$error"
                @blur="$v.product.urlDocumentation.$touch()"
            />
        </div>
        <div class="form-section">
            <div v-if="$v.product.category.$error">
                <p class="error-message" v-if="!$v.product.category.required">
                    Select a category!
                </p>
            </div>
            <div
                style="grid-column-start: 2;"
                v-if="$v.product.urlDocumentation.$error"
            >
                <p
                    class="error-message"
                    v-if="!$v.product.urlDocumentation.url"
                >
                    This is not the URL format!
                </p>
            </div>
        </div>
        <div class="form-section">
            <BaseInput
                :label="'Price'"
                v-model.lazy="product.price"
                :error="$v.product.price.$error"
                @blur="$v.product.price.$touch()"
            />
            <BaseInput
                :label="'Stock'"
                v-model.lazy="product.stock"
                :error="$v.product.stock.$error"
                @blur="$v.product.stock.$touch()"
            />
        </div>

        <div class="form-section">
            <div v-if="$v.product.price.$error">
                <p class="error-message" v-if="!$v.product.price.required">
                    The price value is required!
                </p>
                <p class="error-message" v-else-if="!$v.product.price.decimal">
                    This must be a number!
                </p>
                <p class="error-message" v-else-if="!$v.product.price.minValue">
                    Minimum value is 0!
                </p>
            </div>
            <div style="grid-column-start: 2;" v-if="$v.product.stock.$error">
                <p class="error-message" v-if="!$v.product.stock.required">
                    The price value is required!
                </p>
                <p class="error-message" v-else-if="!$v.product.stock.integer">
                    This must be an integer!
                </p>
                <p class="error-message" v-else-if="!$v.product.stock.minValue">
                    Minimum value is 0!
                </p>
            </div>
        </div>

        <AdminProductPhotoUpload
            id="upload-image"
            :urlPhoto="product.urlPhoto"
            @change-photo="changePhoto"
            ref="upload"
        />
        <AdminProductSpecifications
            ref="specifications"
            style="text-align:center;"
            :specification="product.specification"
            @add-row="addRow"
            @remove-row="removeRow"
        />
        <button
            class="form-button"
            id="action-button"
            @click.prevent="operationToExecute === 'modify' ? update() : add()"
        >
            <span id="button-text">
                {{ operationToExecute === 'modify' ? 'Update' : 'Add' }}
            </span>
            <svg
                v-if="operationToExecute == 'modify'"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 477.867 477.867"
                style="enable-background:new 0 0 477.867 477.867;"
                xml:space="preserve"
            >
                <g>
                    <g>
                        <path
                            d="M409.6,0c-9.426,0-17.067,7.641-17.067,17.067v62.344C304.667-5.656,164.478-3.386,79.411,84.479
			c-40.09,41.409-62.455,96.818-62.344,154.454c0,9.426,7.641,17.067,17.067,17.067S51.2,248.359,51.2,238.933
			c0.021-103.682,84.088-187.717,187.771-187.696c52.657,0.01,102.888,22.135,138.442,60.976l-75.605,25.207
			c-8.954,2.979-13.799,12.652-10.82,21.606s12.652,13.799,21.606,10.82l102.4-34.133c6.99-2.328,11.697-8.88,11.674-16.247v-102.4
			C426.667,7.641,419.026,0,409.6,0z"
                        />
                    </g>
                </g>
                <g>
                    <g>
                        <path
                            d="M443.733,221.867c-9.426,0-17.067,7.641-17.067,17.067c-0.021,103.682-84.088,187.717-187.771,187.696
			c-52.657-0.01-102.888-22.135-138.442-60.976l75.605-25.207c8.954-2.979,13.799-12.652,10.82-21.606
			c-2.979-8.954-12.652-13.799-21.606-10.82l-102.4,34.133c-6.99,2.328-11.697,8.88-11.674,16.247v102.4
			c0,9.426,7.641,17.067,17.067,17.067s17.067-7.641,17.067-17.067v-62.345c87.866,85.067,228.056,82.798,313.122-5.068
			c40.09-41.409,62.455-96.818,62.344-154.454C460.8,229.508,453.159,221.867,443.733,221.867z"
                        />
                    </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
            </svg>
            <svg
                v-else
                height="512pt"
                viewBox="0 0 512 512"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"
                />
                <path
                    d="m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
                />
                <path
                    d="m256 384c-8.832031 0-16-7.167969-16-16v-224c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v224c0 8.832031-7.167969 16-16 16zm0 0"
                />
            </svg>
        </button>
    </form>
</template>

<script>
import AdminProductSpecifications from './AdminProductSpecifications';
import AdminProductPhotoUpload from './AdminProductPhotoUpload';
import { cloneDeep } from 'lodash';
import {
    required,
    minValue,
    url,
    decimal,
    integer,
} from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
export default {
    components: {
        AdminProductPhotoUpload,
        AdminProductSpecifications,
    },
    props: {
        parentProduct: {
            type: Object,
            required: true,
        },
        operationToExecute: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            product: cloneDeep(this.parentProduct),
            newPhoto: '',
        };
    },
    methods: {
        changePhoto(value) {
            this.newPhoto = value;
            let uploadImage = document.getElementById('upload-image');
            uploadImage.style.transition = '0.3s';
            if (this.newPhoto) {
                uploadImage.style.borderColor = '#4299e1';
                uploadImage.style.color = '#4299e1';
            }
        },
        addRow() {
            this.product.specification.push({
                title: '',
                description: '',
            });
        },
        removeRow(index) {
            this.product.specification.splice(index, 1);
        },
        uploadPhotoStyling() {
            let uploadImage = document.getElementById('upload-image');
            uploadImage.style.transition = '0.3s';
            if (this.newPhoto) {
                uploadImage.style.borderColor = '#4299e1';
                uploadImage.style.color = '#4299e1';
            } else {
                uploadImage.style.borderColor = 'red';
                uploadImage.style.color = 'red';
            }
        },
        validate() {
            this.uploadPhotoStyling();
            this.$v.product.$touch();
            this.$refs.specifications.validate();
            if (
                this.$v.product.$invalid ||
                this.$refs.specifications.$v.specification.$invalid ||
                !this.newPhoto
            )
                return false;
            return true;
        },
        resetData() {
            this.product = cloneDeep(this.freshProductObject());
            this.$v.product.$reset();
            this.$refs.specifications.reset();
            this.$refs.upload.freshImage();
        },
        async update() {
            if (!this.validate()) {
                document.getElementById('action-button').blur();
                return;
            }
            console.log(typeof this.product.price);
            await this.$emit('modify-product', {
                product: this.product,
                photo: this.newPhoto,
            });
        },
        async add() {
            if (!this.validate()) return;
            await this.$emit('add-product', {
                product: this.product,
                photo: this.newPhoto,
            });
        },
        freshProductObject() {
            return {
                name: '',
                manufacture: '',
                price: 0,
                stock: 0,
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
    },
    computed: {
        ...mapGetters('categories', ['categories']),
    },
    validations: {
        product: {
            name: { required },
            manufacture: {
                required,
            },
            stock: { required, integer, minValue: minValue(0) },
            price: { required, decimal, minValue: minValue(0) },
            urlDocumentation: { url },
            category: {
                required,
            },
        },
    },
};
</script>

<style scoped>
@import './../../assets/css/modules/admin_page/admin_form.css';
</style>
