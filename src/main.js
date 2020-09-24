import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/tailwind.css';
import firebase from 'firebase/app';
import '@firebase/firestore';
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask';

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
export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
