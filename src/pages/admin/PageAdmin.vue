<template>
    <div>
        <form class="admin-form">
            <BaseInput v-model="adminEmail" :label="'Admin'" />
            <BaseInput
                v-model="adminPassword"
                :label="'Password'"
                :type="'password'"
            />
            <button class="admin-form-button" @click.prevent="verifyAdmin()">
                Sign In
            </button>
            <div v-if="error" class="error-admin-message">
                Wrong Password!
            </div>
            <div v-if="errorEmail" class="error-admin-message">
                Wrong Email!
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            adminEmail: 'admin@ecommerce.com',
            adminPassword: '',
            loginDone: false,
            errorEmail: false,
            //password: adminecommerce
        };
    },
    methods: {
        async verifyAdmin() {
            this.errorEmail=false
            if(this.adminEmail !== 'admin@ecommerce.com') {
                this.errorEmail=true
                return
            }
            await this.signInAdmin({
                email: this.adminEmail,
                password: this.adminPassword,
            });
            if (this.isAdminAuthenticated) {
                this.$router.push({ name: 'Admin Dashboard' });
            }
        },
        ...mapActions('admin', ['signInAdmin']),
    },
    computed: {
        ...mapGetters('admin', ['isAdminAuthenticated', 'error']),
    },
};
</script>

<style scoped>
@import './../../assets/css/modules/admin_page/admin_login.css';
</style>
