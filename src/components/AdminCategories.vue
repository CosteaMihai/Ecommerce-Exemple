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
import AdminCategoriesItem from '@/components/AdminCategoriesItem';
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
.category-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.category-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 80%;
    margin: 50px;
}
.category-item {
    position: relative;
    background: #4299e1;
    color: white;
    text-align: center;
    text-transform: uppercase;
    border-radius: 3px;
    margin: 10px;
    padding: 5px;
    transition: background 0.3s;
}
.category-item:hover {
    background: #2b6cb0;
}
.category-add-button {
    margin: 20px;
    background: #4299e1;
    color: white;
    padding: 5px 20px;
    border-radius: 3px;
    transition: background 0.3s;
}
.category-add-button:hover {
    background: #2b6cb0;
}
</style>
