import User from '@/firebase/user.js';

export const namespaced = true;

export const state = {};

export const mutations = {};

export const actions = {
    async getUser(userID) {
        const user = await User.getUserByID(userID);
        return user;
    },
};

export const getters = {
    categories: (state) => state.categories,
};
