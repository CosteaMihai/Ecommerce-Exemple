<template>
    <div>
        <form class="flex flex-col justify-center max-w-xs mx-auto mt-10">
            <div class="text-center">Admin</div>
            <input
                type="text"
                class="w-full px-2 py-1 mt-1 mb-4 text-center bg-gray-200 rounded-lg"
                v-model="admin"
                disabled
            />
            <div class="text-center">Password</div>
            <input
                type="password"
                class="w-full px-2 py-1 mt-1 mb-8 text-center bg-gray-200 rounded-lg"
                v-model="password"
            />
            <button
                class="py-2 mx-16 text-white bg-blue-500 rounded-lg"
                @click.prevent="verifyAdmin()"
            >
                Verify
            </button>
            <div
                v-if="error == 'password'"
                class="mt-6 italic text-center text-red-500"
            >
                Wrong Password
            </div>
        </form>
    </div>
</template>

<script>
import { db } from '@/main';
export default {
    data() {
        return {
            admin: 'admin',
            password: 'admin',
            loginDone: false,
            error: '',
        };
    },
    methods: {
        async verifyAdmin() {
            this.error = '';
            const docRef = db.collection('users').doc('GnzbFUiTmb9miCLZTyvB');
            await docRef
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        if (this.password == doc.data().password) {
                            this.$router.push({ name: 'Admin Dashboard' });
                        } else {
                            this.error = 'password';
                        }
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!');
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error);
                });
        },
    },
};
</script>

<style></style>
