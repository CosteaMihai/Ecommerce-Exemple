import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: null,
        cart: [],
        products: [],
    },
    mutations: {
        SET_PRODUCTS(state, payload) {
            state.products = payload;
        },
        ADD_TO_CART(state, payload) {
            if (!state.cart.length) {
                state.cart.push(payload);
                return;
            } else {
                for (let product of state.cart) {
                    if (JSON.stringify(product.product.name) === JSON.stringify(payload.product.name)) {
                        product.quantity += payload.quantity;
                        return;
                    }
                }
                state.cart.push(payload);
            }
        },
        deleteProductFromCart(state, payload) {
            for (let i of state.cart) {
                if (JSON.stringify(i.product.name) === JSON.stringify(payload.product.name)) {
                    state.cart.splice(state.cart.indexOf(i), 1);
                }
            }
        },
        setCurrentUser(state, payload) {
            state.currentUser = { ...payload };
            console.log(state.currentUser);
        },
        deleteCurrentUser(state) {
            state.currentUser = null;
            console.log(state.currentUser);
        },
    },
    actions: {
        async getProductsFromDatabase({ commit }) {
            try {
                let payload = [];
                const snapshot = await db.collection('products').get();
                snapshot.forEach((doc) => {
                    payload.push({
                        id: doc.id,
                        product: doc.data(),
                    });
                });
                commit('SET_PRODUCTS', payload);
            } catch (error) {
                console.log(error);
            }
        },
        addToCart({ commit }, payload) {
            const cartObject = {
                product: payload,
                quantity: 1,
            };
            commit('ADD_TO_CART', cartObject);
        },
    },
    getters: {
        products: (state) => {
            return state.products;
        },
    },
    modules: {},
});
