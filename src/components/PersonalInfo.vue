<template>
    <div class="relative flex flex-col items-center h-full text-white bg-blue-500 rounded-lg shadow-lg">
        <div class="pt-5 text-white">
            <svg
                class="w-24 h-24 fill-current"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="510px"
                height="510px"
                viewBox="0 0 510 510"
                style="enable-background:new 0 0 510 510;"
                xml:space="preserve"
            >
                <g>
                    <g id="account-circle">
                        <path
                            d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M255,76.5
			c43.35,0,76.5,33.15,76.5,76.5s-33.15,76.5-76.5,76.5c-43.35,0-76.5-33.15-76.5-76.5S211.65,76.5,255,76.5z M255,438.6
			c-63.75,0-119.85-33.149-153-81.6c0-51,102-79.05,153-79.05S408,306,408,357C374.85,405.45,318.75,438.6,255,438.6z"
                        />
                    </g>
                </g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
                <g></g>
            </svg>
        </div>
        <div class="flex flex-wrap w-full mt-5">
            <div class="flex flex-col justify-center w-1/2">
                <div class="mt-2 text-center">First Name</div>
                <input
                    :class="modify ? 'border-blue-700' : ''"
                    class="py-1 mx-16 text-center text-black bg-blue-100 border-2 rounded-lg focus:outline-none focus:border-blue-900"
                    type="text"
                    :disabled="!modify"
                    placeholder="First Name"
                    v-model.lazy="getCurrentUser.firstName"
                    @blur="$v.getCurrentUser.firstName.$touch()"
                />
            </div>
            <div class="flex flex-col justify-center w-1/2">
                <div class="mt-2 text-center">Last Name</div>
                <input
                    :class="modify ? 'border-blue-700' : ''"
                    class="py-1 mx-16 text-center text-black bg-blue-100 border-2 rounded-lg focus:outline-none focus:border-blue-900"
                    type="text"
                    :disabled="!modify"
                    placeholder="Last Name"
                    v-model.lazy="getCurrentUser.lastName"
                    @blur="$v.getCurrentUser.lastName.$touch()"
                />
            </div>
            <div class="flex w-full mx-16">
                <div v-if="$v.getCurrentUser.firstName.$error" class="w-1/2 mr-3">
                    <p v-if="!$v.getCurrentUser.firstName.required" class="text-xs italic text-red-300">
                        Introduce your first name!
                    </p>

                    <p v-else-if="!$v.getCurrentUser.firstName.minLength" class="text-xs italic text-red-300">
                        First name must be at least 3 characters!
                    </p>
                </div>
                <div v-else-if="!$v.getCurrentUser.firstName.$error" class="w-1/2 h-1 mr-3"></div>
                <div v-if="$v.getCurrentUser.lastName.$error" class="px-2 mx-12">
                    <p v-if="!$v.getCurrentUser.lastName.required" class="text-xs italic text-red-300">
                        Introduce your last name!
                    </p>

                    <p v-else-if="!$v.getCurrentUser.lastName.minLength" class="text-xs italic text-red-300">
                        Last name must be at least 3 characters!
                    </p>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap w-full mt-3">
            <div class="flex flex-col justify-center w-1/2">
                <div class="mt-5 text-center">Email</div>
                <input
                    :class="modify ? 'border-blue-700' : ''"
                    class="py-1 mx-16 text-center text-black bg-blue-100 border-2 rounded-lg cursor-not-allowed focus:outline-none"
                    type="text"
                    disabled
                    v-model="getCurrentUser.email"
                />
            </div>
            <div class="flex flex-col justify-center w-1/2">
                <div class="mt-5 text-center">Phone Number</div>
                <input
                    :class="modify ? 'border-blue-700' : ''"
                    class="py-1 mx-16 text-center text-black bg-blue-100 border-2 rounded-lg focus:outline-none focus:border-blue-900"
                    type="tel"
                    :disabled="!modify"
                    placeholder="Phone Number"
                    v-mask="'+40 (###) ### ###'"
                    v-model.lazy="getCurrentUser.phone"
                    @blur="$v.getCurrentUser.phone.$touch()"
                />
            </div>
            <div class="flex w-full mx-16">
                <div class="w-1/2 h-1 mr-3"></div>
                <div v-if="$v.getCurrentUser.phone.$error" class="px-2 mx-12">
                    <p v-if="!$v.getCurrentUser.phone.required" class="text-xs italic text-red-300">
                        Introduce a phone number!
                    </p>

                    <p v-else-if="!$v.getCurrentUser.phone.minLength" class="text-xs italic text-red-300">
                        Insufficient digits in the phone number!
                    </p>
                </div>
                <p class="px-2 mx-12 text-xs italic text-red-300" v-else-if="assignPhone">Phone already registerd</p>
            </div>
        </div>
        <div class="absolute bottom-0 mb-10">
            <button
                v-if="!modify"
                @click.prevent="
                    userInitialPhone = getCurrentUser.phone;
                    modify = true;
                "
                class="px-10 py-2 bg-blue-800 rounded-lg focus:outline-none"
            >
                Modify
            </button>
            <button v-else @click.prevent="save()" class="px-10 py-2 bg-blue-800 rounded-lg focus:outline-none">
                Save
            </button>
        </div>
    </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import { required, minLength } from 'vuelidate/lib/validators';
import { db } from '../main';
import store from '../store/index';
export default {
    directives: {
        mask,
    },
    data() {
        return {
            modify: false,
            userInitialPhone: '',
            assignPhone: false,
        };
    },
    methods: {
        async save() {
            this.assignPhone = false;
            this.$v.getCurrentUser.$touch();
            if (this.$v.getCurrentUser.$invalid) return;

            await db
                .collection('users')
                .where('phone', '==', this.getCurrentUser.phone)
                .get()
                .then((snapshot) => {
                    if (!snapshot.empty) {
                        this.assignPhone = true;

                        return;
                    }
                })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });
            if (this.assignPhone && this.getCurrentUser.phone != this.userInitialPhone) {
                return;
            } else if (this.assignPhone && this.getCurrentUser.phone == this.userInitialPhone) {
                this.assignPhone = false;
            }
            await db
                .collection('users')
                .where('id', '==', this.getCurrentUser.id)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        db.collection('users')
                            .doc(doc.id)
                            .set(this.getCurrentUser);
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });

            this.modify = false;
        },
    },
    computed: {
        getCurrentUser() {
            return store.state.currentUser;
        },
    },
    validations: {
        getCurrentUser: {
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
