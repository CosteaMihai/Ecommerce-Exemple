import Product from '@/firebase/product.js';
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
        limit: 2,
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
};

export const actions = {
    async initialPage({ state, commit, dispatch }) {
        const initialProducts = await Product.initialPageProducts(
            state.pagination.last,
            state.pagination.limit
        );
        await dispatch('allProducts');
        commit('SET_PAGINATION', initialProducts);
    },

    async otherPage({ state, commit, dispatch }) {
        await dispatch('allProducts');
        const onPageProducts = await Product.otherPageProducts(
            state.pagination.first,
            state.pagination.last,
            state.pagination.limit,
            state.pagination.page,
            state.pageLastDocuments
        );
        commit('SET_PAGINATION', onPageProducts);
    },

    async nextPage({ state, commit }) {
        commit('ADD_PREVIOUS_LAST_DOCUMENT', state.pagination.last);
        state.pagination.products = [];
        const nextProducts = await Product.nextPageProducts(
            state.pagination.first,
            state.pagination.last,
            state.pagination.limit,
            state.pagination.page
        );
        commit('SET_PAGINATION', nextProducts);
    },

    async previousPage({ state, commit }) {
        state.pagination.products = [];
        const previousProducts = await Product.previousPageProducts(
            state.pagination.first,
            state.pagination.last,
            state.pagination.limit,
            state.pagination.page
        );
        commit('REMOVE_PREVIOUS_LAST_DOCUMENT');
        commit('SET_PAGINATION', previousProducts);
    },

    async allProducts({ commit }) {
        const products = await Product.products();
        commit('SET_NO_OF_PRODUCTS', products);
        commit('SET_MAX_PAGE', products);
    },

    async getProductByID({ commit }, productID) {
        const product = await Product.getProductsFromDatabaseById(productID);
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
    },

    async modifyProduct({ commit }, payload) {
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
    },

    async addProduct({ commit, state }, payload) {
        const product = await Product.addProductToDatabase(
            payload.product,
            payload.photo
        );
        commit('ADD_PRODUCT', product);
    },
};

export const getters = {
    noOfProducts: (state) => state.totalNumberOfProducts,
    productByID: (state) => state.productByID,
    products: (state) => state.pagination.products,
    isNext: (state) => !!(state.pagination.page < state.maxPages),
    isPrevious: (state) => !!!(state.pagination.page === 1),
};
