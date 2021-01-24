<template>
    <form class="w-full max-w-2xl mx-auto mt-10">
        <div class="flex">
            <div
                class="w-1/2 py-2 mr-5 border-b"
                :class="
                    $v.user.email.$error ? 'border-red-500' : 'border-blue-500'
                "
            >
                <input
                    class="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                    type="text"
                    placeholder="Email"
                    aria-label="Full name"
                    v-model.lazy="user.email"
                    @blur="$v.user.email.$touch()"
                />
            </div>
            <div
                class="w-1/2 py-2 border-b"
                :class="
                    $v.user.phone.$error ? 'border-red-500' : 'border-blue-500'
                "
            >
                <input
                    class="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                    type="tel"
                    placeholder="Phone Number"
                    aria-label="Full name"
                    v-mask="'+40 (###) ### ###'"
                    v-model.lazy="user.phone"
                    @blur="$v.user.phone.$touch()"
                />
            </div>
        </div>
        <div class="flex w-full">
            <div v-if="$v.user.email.$error" class="w-1/2 mr-3">
                <p
                    v-if="!$v.user.email.required"
                    class="text-xs italic text-red-500"
                >
                    Introduce an email address!
                </p>

                <p
                    v-else-if="!$v.user.email.email"
                    class="text-xs italic text-red-500"
                >
                    Invalid email format!
                </p>
            </div>
            <div v-else-if="!$v.user.email.$error" class="w-1/2 h-1 mr-3"></div>
            <div v-if="$v.user.phone.$error">
                <p
                    v-if="!$v.user.phone.required"
                    class="text-xs italic text-red-500"
                >
                    Introduce a phone number!
                </p>

                <p
                    v-else-if="!$v.user.phone.minLength"
                    class="text-xs italic text-red-500"
                >
                    Insufficient digits in the phone number!
                </p>
            </div>
        </div>
        <div class="flex mt-10">
            <div
                class="w-1/2 py-2 mr-5 border-b"
                :class="
                    $v.user.password.$error
                        ? 'border-red-500'
                        : 'border-blue-500'
                "
            >
                <input
                    class="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                    type="password"
                    placeholder="Password"
                    aria-label="Full name"
                    v-model.lazy="user.password"
                    @blur="$v.user.password.$touch()"
                />
            </div>
            <div
                class="w-1/2 py-2 border-b"
                :class="
                    $v.user.confirmPassword.$error
                        ? 'border-red-500'
                        : 'border-blue-500'
                "
            >
                <input
                    class="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                    type="password"
                    placeholder="Repeat Password"
                    aria-label="Full name"
                    v-model.lazy="user.confirmPassword"
                    @blur="$v.user.confirmPassword.$touch()"
                />
            </div>
        </div>
        <div class="flex w-full">
            <div v-if="$v.user.password.$error" class="w-1/2 mr-3">
                <p
                    v-if="!$v.user.password.required"
                    class="text-xs italic text-red-500"
                >
                    Introduce a password!
                </p>

                <p
                    v-else-if="!$v.user.password.minLength"
                    class="text-xs italic text-red-500"
                >
                    Password must be at least 6 characters!
                </p>
            </div>
            <div
                v-else-if="!$v.user.password.$error"
                class="w-1/2 h-1 mr-3"
            ></div>
            <div v-if="$v.user.confirmPassword.$error">
                <p
                    v-if="!$v.user.confirmPassword.required"
                    class="text-xs italic text-red-500"
                >
                    Repeat the password!
                </p>

                <p
                    v-else-if="!$v.user.confirmPassword.sameAs"
                    class="text-xs italic text-red-500"
                >
                    Passwords does not match!
                </p>
            </div>
        </div>
        <div class="flex mt-10">
            <div
                class="w-1/2 py-2 mr-5 border-b"
                :class="
                    $v.user.firstName.$error
                        ? 'border-red-500'
                        : 'border-blue-500'
                "
            >
                <input
                    class="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                    type="text"
                    placeholder="First Name"
                    aria-label="Full name"
                    v-model.lazy="user.firstName"
                    @blur="$v.user.firstName.$touch()"
                />
            </div>
            <div
                class="w-1/2 py-2 border-b"
                :class="
                    $v.user.lastName.$error
                        ? 'border-red-500'
                        : 'border-blue-500'
                "
            >
                <input
                    class="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                    type="text"
                    placeholder="Last Name"
                    aria-label="Full name"
                    v-model.lazy="user.lastName"
                    @blur="$v.user.lastName.$touch()"
                />
            </div>
        </div>
        <div class="flex w-full">
            <div v-if="$v.user.firstName.$error" class="w-1/2 mr-3">
                <p
                    v-if="!$v.user.firstName.required"
                    class="text-xs italic text-red-500"
                >
                    Introduce your first name!
                </p>

                <p
                    v-else-if="!$v.user.firstName.minLength"
                    class="text-xs italic text-red-500"
                >
                    First name must be at least 3 characters!
                </p>
            </div>
            <div
                v-else-if="!$v.user.firstName.$error"
                class="w-1/2 h-1 mr-3"
            ></div>
            <div v-if="$v.user.lastName.$error">
                <p
                    v-if="!$v.user.lastName.required"
                    class="text-xs italic text-red-500"
                >
                    Introduce your last name!
                </p>

                <p
                    v-else-if="!$v.user.lastName.minLength"
                    class="text-xs italic text-red-500"
                >
                    Last name must be at least 3 characters!
                </p>
            </div>
        </div>
        <div class="flex items-center justify-start mt-10">
            <button
                class="px-4 py-2 mr-10 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="button"
                @click.prevent="signUp()"
            >
                Sign Up
            </button>
            <button
                @click.prevent="$emit('requestSignIn')"
                class="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
            >
                Sign In
            </button>
        </div>
        <div v-if="assignEmail" class="mt-5 text-sm italic text-red-500">
            Email already register!
        </div>
        <div v-if="assignPhone" class="mt-5 text-sm italic text-red-500">
            Phone number already used!
        </div>
    </form>
</template>

<script>
import { mask } from 'vue-the-mask';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';
export default {
    props: ['assignEmail', 'assignPhone'],
    directives: { mask },
    data() {
        return {
            user: {
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                phone: '',
            },
        };
    },
    methods: {
        signUp() {
            this.$v.user.$touch();
            if (!this.$v.user.$invalid) {
                this.$emit('signUp', this.user);
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
            confirmPassword: {
                required,
                sameAsPassword: sameAs('password'),
            },
            firstName: {
                required,
                minLength: minLength(3),
            },
            lastName: {
                required,
                minLength: minLength(3),
            },
            phone: {
                required,
                minLength: minLength(17),
            },
        },
    },
};
</script>

<style></style>
