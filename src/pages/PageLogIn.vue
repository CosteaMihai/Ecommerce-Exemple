<template>
    <div>
        <SignInForm
            :errorSignIn="errorSignIn"
            :newUserSignIn="newUserSignIn"
            @requestSignUp="requestSignUp = true"
            @signIn="signInWithEmailAndPassword"
            v-if="!requestSignUp"
        />
        <SignUpForm
            :assignEmail="assignEmail"
            :assignPhone="assignPhone"
            @requestSignIn="requestSignUp = false"
            @signUp="signUpWithEmailAndPassword"
            v-else
        />
    </div>
</template>

<script>
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import store from '../store/index';
import Cookies from 'js-cookie';
import firebase from 'firebase';
import { db } from '../main';
export default {
    components: {
        SignInForm,
        SignUpForm,
    },
    data() {
        return {
            requestSignUp: false,
            assignEmail: false,
            assignPhone: false,
            newUserSignIn: false,
            errorSignIn: '',
        };
    },
    methods: {
        async signUpWithEmailAndPassword(user) {
            this.assignEmail = false;
            this.assignPhone = false;
            delete user.confirmPassword;

            try {
                const snapshot = await db
                    .collection('users')
                    .where('email', '==', user.email)
                    .get();
                if (!snapshot.empty) {
                    this.assignEmail = true;
                }
            } catch (err) {
                console.log('Error getting documents', err);
            }

            if (this.assignEmail) return;

            try {
                const snapshot = await db
                    .collection('users')
                    .where('phone', '==', user.phone)
                    .get();
                if (!snapshot.empty) {
                    this.assignPhone = true;
                }
            } catch (err) {
                console.log('Error getting documents', err);
            }

            if (this.assignPhone) return;

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
                        db.collection('users').add({
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

            this.$router.push({ path: '/' });
            delete user.password;
            store.commit('setCurrentUser', user);
        },
        async signInWithEmailAndPassword(user) {
            this.newUserSignIn = false;
            this.errorSignIn = '';
            let userSignIn = {};
            try {
                const snapshot = await db
                    .collection('users')
                    .where('email', '==', user.email)
                    .get();

                if (snapshot.empty) {
                    this.newUserSignIn = true;
                    return;
                }

                await snapshot.forEach((doc) => {
                    userSignIn = { ...doc.data() };
                    console.log(userSignIn);
                });
            } catch (err) {
                console.log('Error getting documents', err);
            }
            if (this.newUserSignIn) return;
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(user.email, user.password);
            } catch (err) {
                this.errorSignIn = err;
                console.log(err);
            }
            if (this.errorSignIn) return;

            //Cookies.set('licenta-user', JSON.stringify(userSignIn));
            store.commit('setCurrentUser', userSignIn);
            this.$router.push({ path: '/' });
        },
    },
};
</script>

<style></style>
