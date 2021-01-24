import firebase from 'firebase';
import { usersCollection } from '../../main';

export const namespaced = true;

export const state = {
    user: null,
    assignEmail: false,
    assignPhone: false,
    newUserSignIn: false,
    errorSignIn: null,
};

export const mutations = {
    SET_USER(state, payload) {
        state.user = payload;
    },
    CLEAR_USER(state) {
        state.user = null;
    },
    SET_ASSIGN_EMAIL(state) {
        state.assignEmail = true;
    },
    CLEAR_ASSIGN_EMAIL(state) {
        state.assignEmail = false;
    },
    SET_ASSIGN_PHONE(state) {
        state.assignPhone = true;
    },
    CLEAR_ASSIGN_PHONE(state) {
        state.assignPhone = false;
    },
    SET_NEW_USER_SIGN_IN(state) {
        state.newUserSignIn = true;
    },
    CLEAR_NEW_USER_SIGN_IN(state) {
        state.newUserSignIn = false;
    },
    SET_ERROR_SIGN_IN(state, payload) {
        state.errorSignIn = payload;
    },
    CLEAR_ERROR_SIGN_IN(state) {
        state.errorSignIn = null;
    },
};

export const actions = {
    async signUpWithEmailAndPassword({ state, commit }, user) {
        console.log(user);
        commit('CLEAR_ASSIGN_EMAIL');
        commit('CLEAR_ASSIGN_PHONE');

        delete user.confirmPassword;

        try {
            const snapshot = await usersCollection
                .where('email', '==', user.email)
                .get();
            if (!snapshot.empty) {
                commit('SET_ASSIGN_EMAIL');
            }
        } catch (err) {
            console.log('Error getting documents', err);
        }

        if (state.assignEmail) return;

        try {
            const snapshot = await usersCollection
                .where('phone', '==', user.phone)
                .get();
            if (!snapshot.empty) {
                commit('SET_ASSIGN_PHONE');
            }
        } catch (err) {
            console.log('Error getting documents', err);
        }

        if (state.assignPhone) return;

        try {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password);
        } catch (err) {
            if (err) {
                console.log(err);
                return;
            }
        }

        await firebase.auth().onAuthStateChanged((newuser) => {
            if (newuser) {
                user.id = newuser.uid;
                try {
                    usersCollection.add({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        email: user.email,
                    });
                    commit(SET_USER, {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        email: user.email,
                    });
                } catch (err) {
                    console.log('Error getting documents', err);
                    return;
                }
            }
        });
    },
    async signInWithEmailAndPassword({ state, commit }, user) {
        console.log(user);
        commit('CLEAR_NEW_USER_SIGN_IN');
        commit('CLEAR_ERROR_SIGN_IN');
        let userSignIn = {};
        try {
            const snapshot = await usersCollection
                .where('email', '==', user.email)
                .get();

            if (snapshot.empty) {
                commit('SET_NEW_USER_SIGN_IN');
                return;
            }

            await snapshot.forEach((doc) => {
                userSignIn = { ...doc.data() };
                console.log(userSignIn);
            });
        } catch (err) {
            console.log('Error getting documents', err);
        }
        if (state.newUserSignIn) return;
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password);
        } catch (err) {
            commit('SET_ERROR_SIGN_IN', err);
            console.log(err);
        }
        if (state.errorSignIn) return;

        commit('SET_USER', userSignIn);
    },

    clearUser({ commit }) {
        commit('CLEAR_USER');
    },
};

export const getters = {
    isCurrentUser: (state) => (state.user ? true : false),
    currentUser: (state) => state.user,
    assignEmail: (state) => state.assignEmail,
    assignPhone: (state) => state.assignPhone,
    newUserSignIn: (state) => state.newUserSignIn,
    errorSignIn: (state) => state.errorSignIn,
};
