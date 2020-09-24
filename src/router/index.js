import Vue from 'vue';
import VueRouter from 'vue-router';
import PageHome from '@/pages/PageHome';
import PageProduct from '@/pages/PageProduct';
import PageCart from '@/pages/PageCart';
import PageLogIn from '@/pages/PageLogIn';
import PageAccount from '@/pages/account/PageAccount';
import PageOrder from '@/pages/account/PageOrder';
import PageAdmin from '@/pages/PageAdmin';
import store from '../store';
import { isEmpty } from 'underscore';
import Cookies from 'js-cookie';
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: PageHome,
        },
        {
            path: '/product/:id',
            name: 'Product',
            component: PageProduct,
            props: true,
        },
        {
            path: '/cart',
            name: 'Cart',
            component: PageCart,
        },

        {
            path: '/login',
            name: 'LogIn',
            component: PageLogIn,
        },
        {
            path: '/account',
            name: 'Account',
            component: PageAccount,
        },
        { path: '/account/order/:id', name: 'Order', component: PageOrder },
        {
            path: '/admin',
            name: 'Admin',
            component: PageAdmin,
        },
    ],
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    if (Cookies.get('licenta-user') && isEmpty(store.state.currentUser)) {
        store.commit('setCurrentUser', JSON.parse(Cookies.get('licenta-user')));
    }
    if (
        (to.name === 'LogIn' && !isEmpty(store.state.currentUser)) ||
        (to.name === 'Account' && isEmpty(store.state.currentUser))
    ) {
        next({ name: 'Home' });
        return;
    }
    next();
});

export default router;
