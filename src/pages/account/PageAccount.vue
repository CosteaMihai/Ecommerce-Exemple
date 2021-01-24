<template>
    <div class="grid grid-cols-12 px-10 xxl:px-24">
        <div class="h-full col-start-1 col-end-3 mt-10 mb-20">
            <AccountMenu
                @modifyState="modifyState"
                :currentUser="currentUser"
            />
        </div>
        <div class="h-full col-start-4 col-end-13 mt-10 mb-20">
            <OrderHistory v-if="state == 1" :currentUser="currentUser" />
            <PersonalInfo v-if="state == 2" :currentUser="currentUser" />
        </div>
    </div>
</template>

<script>
import AccountMenu from '@/components/AccountMenu';
import OrderHistory from '@/components/OrderHistory';
import PersonalInfo from '@/components/PersonalInfo';
import { mapGetters } from 'vuex';
export default {
    components: {
        AccountMenu,
        OrderHistory,
        PersonalInfo,
    },
    data() {
        return {
            state: 1,
        };
    },
    methods: {
        modifyState(e) {
            this.state = e;
        },
    },
    computed: {
        ...mapGetters('user', ['currentUser']),
    },
};
</script>

<style></style>
