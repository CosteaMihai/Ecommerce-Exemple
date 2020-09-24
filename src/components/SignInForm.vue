<template>
    <form class="w-full max-w-2xl mx-auto mt-10">
        <div class="flex">
            <div class="w-1/2 py-2 mr-5 border-b" :class="$v.user.email.$error ? 'border-red-500' : 'border-blue-500'">
                <input
                    class="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                    type="email"
                    placeholder="Email"
                    v-model.lazy="user.email"
                    @blur="$v.user.email.$touch()"
                />
            </div>
            <div class="w-1/2 py-2 border-b" :class="$v.user.password.$error ? 'border-red-500' : 'border-blue-500'">
                <input
                    class="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                    type="password"
                    placeholder="Password"
                    v-model.lazy="user.password"
                    @blur="$v.user.password.$touch()"
                />
            </div>
        </div>
        <div class="flex w-full">
            <div v-if="$v.user.email.$error" class="w-1/2 mr-3">
                <p v-if="!$v.user.email.required" class="text-xs italic text-red-500">
                    Introduce an email address!
                </p>

                <p v-else-if="!$v.user.email.email" class="text-xs italic text-red-500">
                    Invalid email format!
                </p>
            </div>
            <div v-else-if="!$v.user.email.$error" class="w-1/2 h-1 mr-3"></div>
            <div v-if="$v.user.password.$error">
                <p v-if="!$v.user.password.required" class="text-xs italic text-red-500">
                    Introduce a password!
                </p>

                <p v-else-if="!$v.user.password.minLength" class="text-xs italic text-red-500">
                    Password must be at least 6 characters!
                </p>
            </div>
        </div>
        <div class="flex items-center justify-start mt-10">
            <button
                class="px-4 py-2 mr-10 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button"
                @click.prevent="signIn()"
            >
                Sign In
            </button>
            <button
                @click.prevent="$emit('requestSignUp')"
                class="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
            >
                Sign Up
            </button>
        </div>
        <div v-if="newUserSignIn" class="mt-5 text-sm italic text-red-500">Email not register!</div>
        <div v-if="errorSignIn" class="mt-5 text-sm italic text-red-500">Invalid password!</div>
    </form>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {
    props: ['errorSignIn', 'newUserSignIn'],
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
        };
    },
    methods: {
        signIn() {
            this.$v.user.$touch();
            if (!this.$v.user.$invalid) {
                this.$emit('signIn', this.user);
            }
        },
    },
    validations: {
        user: {
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(6),
            },
        },
    },
};
</script>

<style></style>
