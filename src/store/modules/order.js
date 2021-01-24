import Order from '@/firebase/order.js';

export const namespaced = true;

export const state = {
    orders: [],
};

export const mutations = {
    SET_ORDER(state, payload) {
        state.orders.push(payload);
    },
    CHANGE_STATUS_ORDER(state, payload) {
        state.orders[payload.index].order.status = payload.status;
    },
    CLEAR_ORDERS(state) {
        state.orders = [];
    },
    DELETE_ORDER(state, payload) {
        state.orders.splice(payload, 1);
    },
};

export const actions = {
    async fetchOrders({ commit }, payload) {
        commit('CLEAR_ORDERS');
        let orders = [];
        orders = await Order.extractOrdersFromDatabase(
            payload.startDate,
            payload.endDate,
            payload.range
        );
        orders.forEach((doc) => {
            const order = {
                id: doc.id,
                order: doc.data(),
            };
            commit('SET_ORDER', order);
        });
    },
    async searchOrderByID({ commit }, payload) {
        commit('CLEAR_ORDERS');
        const orderFromDatabase = await Order.searchOrderInDatabaseByID(
            payload
        );
        if (orderFromDatabase.exists) {
            const order = {
                id: orderFromDatabase.id,
                order: orderFromDatabase.data(),
            };
            commit('SET_ORDER', order);
        }
    },
    async deleteOrder({ commit }, payload) {
        await Order.deleteOrderFromDatabase(payload);
        const index = state.orders.map((obj) => obj.id).indexOf(payload);
        commit('DELETE_ORDER', index);
    },
    async changeStatus({ state, commit }, payload) {
        await Order.changeCompleteStatusOrder(payload.id, payload.status);
        const index = state.orders.map((obj) => obj.id).indexOf(payload.id);
        commit('CHANGE_STATUS_ORDER', { index, status: payload.status });
    },
};

export const getters = {
    orders: (state) => state.orders,
};
