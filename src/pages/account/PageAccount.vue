<template>
    <div class="grid grid-cols-12 px-10 xxl:px-24">
        <div class="col-start-1 mt-10 h-full col-end-3 mb-20">
            <AccountMenu @modifyState="modifyState" :currentUser="currentUser" />
        </div>
        <div class="col-start-4 mt-10 h-full col-end-13 mb-20">
            <OrderHistory v-if="state == 1" :currentUser="currentUser" />
            <PersonalInfo v-if="state == 2" :currentUser="currentUser" />
        </div>
    </div>
</template>

<script>
import AccountMenu from '@/components/AccountMenu';
import OrderHistory from '@/components/OrderHistory';
import PersonalInfo from '@/components/PersonalInfo';
import store from '../../store/index';
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
        currentUser() {
            return store.state.currentUser;
        },
    },
};
</script>

<style></style>
