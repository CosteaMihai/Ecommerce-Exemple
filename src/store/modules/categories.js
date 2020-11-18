import Category from '@/firebase/categories.js';

export const namespaced = true;

export const state = {
    categories: [],
};

export const mutations = {
    SET_CATEGORIES(state, payload) {
        state.categories.push(payload);
    },
    DELETE_CATEGORY(state, payload) {
        state.categories.splice(payload, 1);
    },
};

export const actions = {
    async fetchCategories({ commit }) {
        const categories = await Category.extractCategoriesFromDatabase();
        categories.forEach((doc) => commit('SET_CATEGORIES', doc.id));
    },
    async addCategory({ commit }, category) {
        await Category.addCategoryToDatabase(category);
        commit('SET_CATEGORIES', category);
    },
    async deleteCategory({ commit, state }, category) {
        await Category.deleteCategoryFromDatabase(category);
        const index = state.categories.indexOf(category);
        commit('DELETE_CATEGORY', index);
    },
};

export const getters = {
    categories: (state) => state.categories,
};
