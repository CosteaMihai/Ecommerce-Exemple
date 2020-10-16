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
    DELETE_PRODUCT(state, payload) {
        state.pagination.products.splice(payload, 1);
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
    async deleteProduct({ commit, state, dispatch }, productID) {
        await Product.deleteProductById(productID);
        const indexToRemove = state.pagination.products
            .map((product) => {
                return product.id;
            })
            .indexOf(productID);
        commit('DELETE_PRODUCT', indexToRemove);
        if (state.pagination.page === 1) await dispatch('initialPage');
    },
    async modifyProduct({ commit, state }, productId) {},
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
