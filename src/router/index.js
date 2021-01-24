import Vue from 'vue';
import VueRouter from 'vue-router';
import PageHome from '@/pages/PageHome';
import PageProduct from '@/pages/PageProduct';
import PageCart from '@/pages/PageCart';
import PageLogIn from '@/pages/PageLogIn';
import PageAccount from '@/pages/account/PageAccount';
import PageOrder from '@/pages/account/PageOrder';
import PageAdmin from '@/pages/admin/PageAdmin';
import PageAdminDashboard from '@/pages/admin/PageAdminDashboard';
import PageNotFound from '@/pages/PageNotFound';
import store from '@/store';
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
        {
            path: '/dashboard',
            name: 'Admin Dashboard',
            component: PageAdminDashboard,
        },
        { path: '*', name: 'Not Found', component: PageNotFound },
    ],
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    let isAdminAuthenticated = store.getters['admin/isAdminAuthenticated'];
    let isUserAuthenticated = store.getters['user/isCurrentUser'];
    if (
        (to.name === 'Account' || to.name === 'Order') &&
        !isUserAuthenticated
    ) {
        next({ name: 'Home' });
        return;
    }
    if (to.name === 'Admin Dashboard' && !isAdminAuthenticated) {
        next({ name: 'Admin' });
        return;
    } else if (to.name === 'Admin' && isAdminAuthenticated) {
        next({ name: 'Admin Dashboard' });
        return;
    }
    next();
});

export default router;
