import Vue from 'vue';
import Vuex from 'vuex';
import * as product from './modules/product.js';
import * as cart from './modules/cart.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: null,
    },
    mutations: {
        setCurrentUser(state, payload) {
            state.currentUser = { ...payload };
            console.log(state.currentUser);
        },
        deleteCurrentUser(state) {
            state.currentUser = null;
            console.log(state.currentUser);
        },
    },
    actions: {},
    getters: {},
    modules: { product, cart },
});
