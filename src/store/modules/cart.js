export const namespaced = true;
export const state = {
    cart: [],
};
export const mutations = {
    ADD_TO_CART(state, payload) {
        if (!state.cart.length) {
            state.cart.push(payload);
            return;
        } else {
            for (let product of state.cart) {
                if (
                    JSON.stringify(product.product.id) ===
                    JSON.stringify(payload.product.id)
                ) {
                    product.quantity += payload.quantity;
                    return;
                }
            }
            state.cart.push(payload);
        }
    },

    DELETE_FROM_CART(state, payload) {
        for (let i of state.cart) {
            if (
                JSON.stringify(i.product.id) ===
                JSON.stringify(payload.product.id)
            ) {
                state.cart.splice(state.cart.indexOf(i), 1);
            }
        }
    },

    CLEAR_CART(state) {
        state.cart = [];
    },
};
export const actions = {
    addToCart({ commit }, payload) {
        commit('ADD_TO_CART', payload);
    },

    deleteFromCart({ commit }, payload) {
        commit('DELETE_FROM_CART', payload);
    },

    clearCart({ commit }) {
        commit('CLEAR_CART');
    },
};
export const getters = {
    cartProducts: (state) => {
        return state.cart;
    },

    cartLength: (state) => {
        return state.cart.length;
    },

    totalCart: (state) => {
        return state.cart.length
            ? state.cart.reduce(
                  (acc, value) => acc + value.quantity * value.product.price,
                  0
              )
            : 0;
    },
};
