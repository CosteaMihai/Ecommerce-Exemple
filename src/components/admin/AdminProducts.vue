<template>
    <div class="page">
        <div class="filters">
            <div class="filter">
                <label for="">Order by:</label>
                <select
                    class="filter-select"
                    v-model="orderBy"
                    @change="setOrderBy(orderBy)"
                >
                    <option
                        v-for="option in orderByOptions"
                        :key="option.id"
                        :value="option.value"
                    >
                        {{ option.displayName }}
                    </option>
                </select>
            </div>
            <div class="filter">
                <label for="">Category:</label>
                <select
                    class="filter-select"
                    v-model="selectedCategory"
                    @change="setCategory(selectedCategory)"
                >
                    <option value="null" disabled selected hidden>
                        Select a category
                    </option>
                    <option
                        v-for="option in categories"
                        :key="option"
                        :value="option"
                    >
                        {{ option }}
                    </option>
                </select>
                <button
                    v-if="selectedCategory"
                    class="select-clear-button"
                    @click.prevent="
                        selectedCategory = null;
                        setCategory(selectedCategory);
                    "
                >
                    x
                </button>
            </div>
        </div>
        <div v-if="noOfProducts > 0">
            <div class="container">
                <AdminProductsCard
                    v-for="product in products"
                    :key="product.id"
                    :product="product"
                    :nextOrPrevious="nextOrPrevious"
                    @open="openModal(product)"
                />
            </div>
            <div v-show="products.length" class="secitionPreviousNext">
                <button
                    id="previousButton"
                    :disabled="!isPrevious"
                    @click.prevent="isPrevious ? loadPreviousPage() : ''"
                    class="previousNextButtons"
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
                        class="arrow"
                    >
                        <g>
                            <g>
                                <path
                                    d="M492,236H68.442l70.164-69.824c7.829-7.792,7.859-20.455,0.067-28.284c-7.792-7.83-20.456-7.859-28.285-0.068
			l-104.504,104c-0.007,0.006-0.012,0.013-0.018,0.019c-7.809,7.792-7.834,20.496-0.002,28.314c0.007,0.006,0.012,0.013,0.018,0.019
			l104.504,104c7.828,7.79,20.492,7.763,28.285-0.068c7.792-7.829,7.762-20.492-0.067-28.284L68.442,276H492
			c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"
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
                </button>
                <button
                    id="nextButton"
                    :disabled="!isNext"
                    @click.prevent="isNext ? loadNextPage() : ''"
                    class="previousNextButtons"
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
                        class="arrow"
                        xml:space="preserve"
                    >
                        <g>
                            <g>
                                <path
                                    d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068
			c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557
			l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104
			c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z"
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
                </button>
            </div>

            <AdminProductsModal
                v-if="isModalOpen"
                :product="product"
                :isModalOpen="isModalOpen"
                @close-modal="closeModal()"
            />
        </div>
        <div v-else class="no-products">
            <p>You have no products added in Database!</p>
            <p>Go and add some products:</p>
            <button
                class="no-products-button"
                @click.prevent="$emit('change-to-add')"
            >
                Add products
            </button>
        </div>
    </div>
</template>

<script>
import AdminProductsCard from './AdminProductsCard';
import AdminProductsModal from './AdminProductsModal';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        AdminProductsModal,
        AdminProductsCard,
    },
    data() {
        return {
            isModalOpen: false,
            product: {},
            nextOrPrevious: '',
            orderBy: 'name-asc',
            selectedCategory: null,
            orderByOptions: [
                {
                    id: 1,
                    displayName: 'Name ascending',
                    value: 'name-asc',
                },
                {
                    id: 2,
                    displayName: 'Name descending',
                    value: 'name-desc',
                },
                {
                    id: 3,
                    displayName: 'Price ascending',
                    value: 'price-asc',
                },
                {
                    id: 4,
                    displayName: 'Price descending',
                    value: 'price-desc',
                },
            ],
        };
    },
    methods: {
        async loadNextPage() {
            await this.nextPage();
            this.nextOrPrevious = 'next';
        },
        async loadPreviousPage() {
            await this.previousPage();
            this.nextOrPrevious = 'previous';
        },
        openModal(product) {
            this.product = { ...product };
            this.isModalOpen = true;
            document.documentElement.style.overflow = 'hidden';
        },
        closeModal() {
            this.isModalOpen = false;
            document.documentElement.style.overflow = 'auto';
        },
        ...mapActions('product', [
            'nextPage',
            'previousPage',
            'setOrderBy',
            'setCategory',
        ]),
    },
    computed: {
        ...mapGetters('product', [
            'products',
            'noOfProducts',
            'isNext',
            'isPrevious',
        ]),
        ...mapGetters('categories', ['categories']),
    },
};
</script>

<style scoped>
@import './../../assets/css/modules/admin_page/admin_products.css';
</style>
