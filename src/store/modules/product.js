import Product from '@/firebase/product.js';
import Nprogress from 'nprogress';

export const namespaced = true;

export const state = {
    productByID: {},
    totalNumberOfProducts: 1,
    pageLastDocuments: [],
    maxPages: 0,
    pagination: {
        first: '',
        last: '',
        products: [],
        page: 1,
        limit: 12,
        orderBy: ['name', 'asc'],
        category: null,
    },
};

export const mutations = {
    SET_PAGINATION(state, payload) {
        state.pagination.first = payload.first;
        state.pagination.last = payload.last;
        state.pagination.products = payload.array;
        state.pagination.page = payload.page;
    },

    ADD_PREVIOUS_LAST_DOCUMENT(state, payload) {
        state.pageLastDocuments.push(payload);
    },
    MODIFY_PAGE(state, payload) {
        state.pagination.page += payload;
    },
    REMOVE_PREVIOUS_LAST_DOCUMENT(state) {
        state.pageLastDocuments.pop();
    },

    SET_NO_OF_PRODUCTS(state, payload) {
        state.totalNumberOfProducts = payload;
    },

    SET_MAX_PAGE(state) {
        state.maxPages = Math.ceil(
            state.totalNumberOfProducts / state.pagination.limit
        );
    },

    SET_PRODUCT(state, payload) {
        state.productByID = payload;
    },

    DELETE_PRODUCT(state, payload) {
        state.pagination.products.splice(payload, 1);
    },

    MODIFY_PRODUCT(state, payload) {
        Object.assign(
            state.pagination.products[payload.indexToModify],
            payload.product
        );
    },

    ADD_PRODUCT(state, payload) {
        state.pagination.products.push(payload);
    },

    SET_ORDER_BY(state, payload) {
        state.pagination.orderBy[0] = payload[0];
        state.pagination.orderBy[1] = payload[1];
    },
    RESET_PAGINATION(state) {
        state.pagination.first = '';
        state.pagination.last = '';
        state.pagination.products = [];
        state.pagination.page = 1;
        state.pageLastDocuments = [];
    },
    SET_CATEGORY(state, payload) {
        state.pagination.category = payload;
    },
    SET_PRICE_RANGE(state, payload) {
        state.pagination.priceRange = payload;
    },
};

export const actions = {
    async initialPage({ state, commit, dispatch }) {
        Nprogress.start();
        const initialProducts = await Product.initialPageProducts(
            state.pagination.last,
            state.pagination.limit,
            state.pagination.orderBy,
            state.pagination.category,
            state.pagination.priceRange
        );
        await dispatch('allProducts');
        commit('SET_PAGINATION', initialProducts);
        Nprogress.done();
    },

    async otherPage({ state, commit, dispatch }) {
        Nprogress.start();
        await dispatch('allProducts');
        const onPageProducts = await Product.otherPageProducts(
            state.pagination.first,
            state.pagination.last,
            state.pagination.limit,
            state.pagination.page,
            state.pageLastDocuments,
            state.pagination.orderBy,
            state.pagination.category,
            state.pagination.priceRange
        );
        commit('SET_PAGINATION', onPageProducts);
        Nprogress.done();
    },

    async nextPage({ state, commit }) {
        Nprogress.start();
        commit('ADD_PREVIOUS_LAST_DOCUMENT', state.pagination.last);
        state.pagination.products = [];
        const nextProducts = await Product.nextPageProducts(
            state.pagination.first,
            state.pagination.last,
            state.pagination.limit,
            state.pagination.page,
            state.pagination.orderBy,
            state.pagination.category,
            state.pagination.priceRange
        );
        commit('SET_PAGINATION', nextProducts);
        Nprogress.done();
    },

    async previousPage({ state, commit }) {
        Nprogress.start();
        state.pagination.products = [];
        const previousProducts = await Product.previousPageProducts(
            state.pagination.first,
            state.pagination.last,
            state.pagination.limit,
            state.pagination.page,
            state.pagination.orderBy,
            state.pagination.category,
            state.pagination.priceRange
        );
        commit('REMOVE_PREVIOUS_LAST_DOCUMENT');
        commit('SET_PAGINATION', previousProducts);
        Nprogress.done();
    },

    async allProducts({ state, commit }) {
        const products = await Product.products(
            state.pagination.category,
            state.pagination.priceRange,
            state.pagination.orderBy
        );
        commit('SET_NO_OF_PRODUCTS', products);
        commit('SET_MAX_PAGE', products);
    },

    async getProductByID({ commit }, productID) {
        const product = await Product.getProductsFromDatabaseById(productID);
        commit('SET_PRODUCT', product);
    },

    async deleteProduct({ commit, state, dispatch }, productID) {
        Nprogress.start();
        await Product.deleteProductById(productID);
        const indexToRemove = state.pagination.products
            .map((product) => {
                return product.id;
            })
            .indexOf(productID);
        commit('DELETE_PRODUCT', indexToRemove);
        if (state.pagination.page === 1) dispatch('initialPage');
        else {
            if (
                state.pagination.products.length === 0 &&
                state.pagination.page > 2
            ) {
                commit('MODIFY_PAGE', -1);
                dispatch('otherPage');
                commit('REMOVE_PREVIOUS_LAST_DOCUMENT');
                return;
            } else if (
                state.pagination.products.length === 0 &&
                state.pagination.page == 2
            ) {
                dispatch('initialPage');
                return;
            } else {
                dispatch('otherPage');
                return;
            }
        }
        Nprogress.done();
    },

    async modifyProduct({ commit }, payload) {
        Nprogress.start();
        const indexToModify = state.pagination.products.findIndex(
            (product) => product.id == payload.product.id
        );
        if (typeof payload.photo === 'string') {
            await Product.modifyProductWithoutImage(payload.product);
            commit('MODIFY_PRODUCT', {
                product: payload.product,
                indexToModify,
            });
        } else if (typeof payload.photo === 'object') {
            const newProduct = await Product.modifyProductWithImage(
                payload.product,
                payload.photo
            );
            newProduct.id = payload.product.id;
            console.log(newProduct);
            commit('MODIFY_PRODUCT', {
                product: newProduct,
                indexToModify,
            });
        }
        Nprogress.done();
    },

    async addProduct({ commit, dispatch }, payload) {
        Nprogress.start();
        const product = await Product.addProductToDatabase(
            payload.product,
            payload.photo
        );
        commit('ADD_PRODUCT', product);
        await dispatch('initialPage');
        Nprogress.done();
    },

    async setOrderBy({ commit, dispatch }, payload) {
        const orderGroup = payload.split('-');
        commit('RESET_PAGINATION');
        commit('SET_ORDER_BY', orderGroup);
        await dispatch('initialPage');
    },
    async setCategory({ commit, dispatch }, payload) {
        let category = null;
        if (payload) {
            category = `${payload}`;
        }
        commit('RESET_PAGINATION');
        commit('SET_CATEGORY', category);
        await dispatch('initialPage');
    },
};

export const getters = {
    noOfProducts: (state) => state.totalNumberOfProducts,
    productByID: (state) => state.productByID,
    products: (state) => state.pagination.products,
    isNext: (state) => !!(state.pagination.page < state.maxPages),
    isPrevious: (state) => !!!(state.pagination.page === 1),
};
