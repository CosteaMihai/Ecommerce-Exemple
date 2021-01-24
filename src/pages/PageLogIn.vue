<template>
    <div>
        <SignInForm
            :errorSignIn="errorSignIn"
            :newUserSignIn="newUserSignIn"
            @requestSignUp="requestSignUp = true"
            @signIn="signIn"
            v-if="!requestSignUp"
        />
        <SignUpForm
            :assignEmail="assignEmail"
            :assignPhone="assignPhone"
            @requestSignIn="requestSignUp = false"
            @signUp="signUp"
            v-else
        />
    </div>
</template>

<script>
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        SignInForm,
        SignUpForm,
    },
    data() {
        return {
            requestSignUp: false,
        };
    },
    methods: {
        async signUp(user) {
            console.log(user);
            delete user.confirmPassword;
            await this.signUpWithEmailAndPassword(user);
            this.$router.push({ path: '/' });
        },
        async signIn(user) {
            console.log(user);
            await this.signInWithEmailAndPassword(user);
            this.$router.push({ path: '/' });
        },
        ...mapActions('user', [
            'signUpWithEmailAndPassword',
            'signInWithEmailAndPassword',
        ]),
    },
    computed: {
        ...mapGetters('user', [
            'assignEmail',
            'assignPhone',
            'newUserSignIn',
            'errorSignIn',
        ]),
    },
};
</script>

<style></style>
