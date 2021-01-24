import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/tailwind.css';
import firebase from 'firebase/app';
import '@firebase/firestore';
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import 'nprogress/nprogress.css';

const requireComponent = require.context(
    './components',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = upperFirst(
        camelCase(
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    );
    Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.use(VueTheMask);
Vue.use(Vuelidate);

var firebaseConfig = {
    apiKey: 'AIzaSyCBZYob321x_-R88jtJfxF6M5newovLtVo',
    authDomain: 'licentatuta.firebaseapp.com',
    databaseURL: 'https://licentatuta.firebaseio.com',
    projectId: 'licentatuta',
    storageBucket: 'licentatuta.appspot.com',
    messagingSenderId: '945946610308',
    appId: '1:945946610308:web:8a0fd79921ce43f399d0d1',
    measurementId: 'G-Q4X6MN0TBZ',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const productsCollection = db.collection('products');
const ordersCollection = db.collection('orders');
const categoriesCollection = db.collection('categories');

Vue.config.productionTip = false;

export {
    db,
    storage,
    usersCollection,
    productsCollection,
    ordersCollection,
    categoriesCollection,
};

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
