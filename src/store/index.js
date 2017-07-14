import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import mutations from './mutations';
import actions from './actions';
const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        settings: {
            isDebug: true,
            apiUrl: 'http://tab01:01@10.100.50.248/planshet_kl/hs/garson',
            url: '10.100.50.248/planshet_kl/hs/garson',
            login: 'planshet',
            pass: 'planshet',
            getUrl: () => {return `http://${this.a.state.settings.login}:${this.a.state.settings.pass}@${this.a.state.settings.url}`}
        },
        tabletNumber: '13',
        waiter: {},
        usrID: 241182,
        testMessage: 'Планшет официанта!',
        halls: [],
        login: false,
        selectedHallId: 0,
        guestsCount: 0,
        currentTable: 0,
        currentGuest: 0,
        pages: {
            main: true,
            password: false,
            users: false,
            addorder: false
        },
        modsCommon: [],
        modsPosition: [],
        FullTree: [],
        SourceMenu: {},
        orders: {
            current: [],
            summary: 0,
            currentOrderId: 0,
            printed: []
        },
        currentPayload: {}
    },
    mutations: mutations,
    actions: actions
});
export default store;