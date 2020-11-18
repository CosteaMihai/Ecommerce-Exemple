import Order from '@/firebase/order.js';

export const namespaced = true;

export const state = {
    orders: [],
};

export const mutations = {
    SET_ORDER(state, payload) {
        state.orders.push(payload);
    },
};

export const actions = {
    async fetchOrders({ commit }) {
        const orders = await Order.extractOrdersFromDatabase();
        orders.forEach((doc) => {
            const order = {
                id: doc.id,
                order: doc.data(),
            };
            commit('SET_ORDER', order);
        });
        console.log(state.orders);
    },
};

export const getters = {
    orders: (state) => state.orders,
};
