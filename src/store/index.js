import Vue from 'vue';
import Vuex from 'vuex';
import * as product from './modules/product.js';
import * as cart from './modules/cart.js';
import * as categories from './modules/categories.js';
import * as order from './modules/order.js';
import * as user from './modules/user.js';
import * as admin from './modules/admin.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {},
    getters: {},
    modules: { user, product, cart, categories, order, admin },
});
