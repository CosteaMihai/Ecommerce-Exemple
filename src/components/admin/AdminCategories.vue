<template>
    <div class="category-section">
        <div class="category-list">
            <AdminCategoriesItem
                v-for="(category, index) in categories"
                :key="index"
                :category="category"
                class="category-item"
                @delete-item="deleteItem"
            />
        </div>
        <BaseInput
            style="width:300px;"
            :label="'Category Name'"
            v-model.lazy="category"
            :error="$v.category.$error"
            @blur="$v.category.$touch()"
            v-on:keyup.enter="add()"
        />
        <div v-if="$v.category.$error">
            <p class="error-message" v-if="!$v.category.required">
                The category is required!
            </p>
            <p class="error-message" v-else-if="!$v.category.alpha">
                This must be a word!
            </p>
        </div>
        <button class="category-add-button" @click.prevent="add()">
            Add
        </button>
        <p class="error-message">
            {{ error }}
        </p>
    </div>
</template>

<script>
import AdminCategoriesItem from '@/components/admin/AdminCategoriesItem';
import { mapActions, mapGetters } from 'vuex';
import { required, alpha } from 'vuelidate/lib/validators';
export default {
    components: {
        AdminCategoriesItem,
    },
    data() {
        return {
            category: '',
            error: '',
        };
    },
    methods: {
        async add() {
            this.$v.category.$touch();
            if (this.$v.category.$invalid) return;
            if (this.categories.includes(this.category.toUpperCase())) {
                this.error = 'Category already exists!';
                this.category = '';
                this.$v.category.$reset();
                setTimeout(() => {
                    this.error = '';
                }, 2000);
                return;
            }
            await this.addCategory(this.category.toUpperCase());
            this.category = '';
            this.$v.category.$reset();
        },
        async deleteItem(category) {
            this.deleteCategory(category);
        },
        ...mapActions('categories', ['addCategory', 'deleteCategory']),
    },
    computed: {
        ...mapGetters('categories', ['categories']),
    },
    validations: {
        category: {
            required,
            alpha,
        },
    },
};
</script>

<style scoped>
@import './../../assets/css/modules/admin_page/admin_categories.css';
</style>
