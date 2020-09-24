<template>
    <div>
        <form v-show="!loginDone" class="mx-auto max-w-xs mt-10 flex flex-col justify-center">
            <div class="text-center">Admin</div>
            <input
                type="text"
                class="bg-gray-200 w-full py-1 px-2 rounded-lg text-center mt-1 mb-4"
                v-model="admin"
                disabled
            />
            <div class="text-center">Password</div>
            <input
                type="password"
                class="bg-gray-200 w-full py-1 px-2 rounded-lg text-center mt-1 mb-8"
                v-model="password"
            />
            <button class="bg-blue-500 text-white py-2 mx-16 rounded-lg" @click.prevent="verifyAdmin()">
                Verify
            </button>
            <div v-if="error == 'password'" class="mt-6 text-center italic text-red-500">Wrong Password</div>
        </form>
        <div v-show="loginDone">
            <AdminData />
        </div>
    </div>
</template>

<script>
import AdminData from '@/components/AdminData';
import { db } from '../main';
export default {
    components: {
        AdminData,
    },
    data() {
        return {
            admin: 'admin',
            password: '',
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
                            this.loginDone = true;
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
