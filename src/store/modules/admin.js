import firebase from 'firebase';
import Cookies from 'js-cookie';
export const namespaced = true;

export const state = {
    isAdminAuthenticated: Cookies.get('admin') ? true : false,
    error: false,
};

export const mutations = {
    SET_AUTHENTICATED(state, payload) {
        state.isAdminAuthenticated = payload;
    },
    SET_ERROR(state) {
        state.error = true;
    },
    CLEAR_ERROR(state) {
        state.error = false;
    },
};

export const actions = {
    async signInAdmin({ commit }, payload) {
        try {
            commit('CLEAR_ERROR');
            const user = await firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password);
            commit('SET_AUTHENTICATED', true);
            Cookies.set('admin', 'yes', { expires: 0.08333 });
        } catch (error) {
            commit('SET_ERROR');
            console.log(error);
        }
    },
    signOutAdmin({ commit }) {
        commit('CLEAR_ERROR');
        Cookies.remove('admin');
        commit('SET_AUTHENTICATED', false);
    },
};

export const getters = {
    isAdminAuthenticated: (state) => state.isAdminAuthenticated,
    error: (state) => state.error,
};
