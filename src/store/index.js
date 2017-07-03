import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import mutations from './mutations';
import actions from './actions';
const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        tabletNumber: '13',
        waiter: {},
        testMessage: 'Планшет официанта!',
        halls: [],
        category: [],
        login: false,
        selectedHallId: 0,
        guestsCount: 0,
        currentTable:0,
        currentGuest:0,
        pages:{
            main: true,
            password: false,
            users: false,
            addorder: false
        },
        FullTree: [],
        orders: {
            current: [],
            summary: 0
        }
    },
    mutations: mutations,
    actions: actions
});
export default store;