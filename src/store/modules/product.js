import Product from '@/firebase/product.js';

export const namespaced = true;

export const state = {
    productByID: {},
    totalNumberOfProducts: 0,
    pagination: {
        first: '',
        last: '',
        products: [],
        page: 1,
        limit: 8,
    },
};

export const mutations = {
    SET_PAGINATION(state, payload) {
        state.pagination.first = payload.first;
        state.pagination.last = payload.last;
        state.pagination.products = payload.array;
        state.pagination.page = payload.page;
    },
    SET_NO_OF_PRODUCTS(state, payload) {
        state.totalNumberOfProducts = payload;
    },
    SET_PRODUCT(state, payload) {
        state.productByID = payload;
    },
};

export const actions = {
    async initialPage({ state, commit, dispatch }) {
        await dispatch('allProducts');
        const initialProducts = await Product.initialPageProducts(
            state.pagination.last,
            state.pagination.limit
        );
        commit('SET_PAGINATION', initialProducts);
    },
    async nextPage({ state, commit }) {
        const nextProducts = await Product.nextPageProducts(
            state.pagination.first,
            state.pagination.last,
            state.pagination.limit,
            state.pagination.page
        );
        commit('SET_PAGINATION', nextProducts);
    },
    async previousPage({ state, commit }) {
        const previousProducts = await Product.previousPageProducts(
            state.pagination.first,
            state.pagination.last,
            state.pagination.limit,
            state.pagination.page
        );
        commit('SET_PAGINATION', previousProducts);
    },
    async allProducts({ commit }) {
        const products = await Product.products();
        commit('SET_NO_OF_PRODUCTS', products);
    },
    async getProductByID({ commit }, productID) {
        const product = await Product.getProductsFromDatabaseById(productID);
        console.log(product);
        commit('SET_PRODUCT', product);
    },
};

export const getters = {
    productByID: (state) => state.productByID,
    products: (state) => state.pagination.products,
    isNext: (state) =>
        !!(
            state.pagination.page * state.pagination.limit <
            state.totalNumberOfProducts
        ),
    isPrevious: (state) => !!!(state.pagination.page === 1),
};
