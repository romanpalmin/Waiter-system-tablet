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
            url: '10.100.50.248/planshet_kl/hs/garson',
            urlModel: '10.100.50.248/planshet_kl/hs/model',
            /*url: '10.10.182.11/planshet/hs/garson',
            urlModel: '10.10.182.11/planshet/hs/model',*/
            login: 'planshet',
            pass: 'planshet',
            uuid:this.$store.state.settings.uuid
        },
        tabletNumber: '13',
        waiter: {},
        waiters: [],
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
            addorder: false,
            editorder: false
        },
        modsCommon: [],
        modsPosition: [],
        FullTree: [],
        SourceMenu: {},
        orders: {
            current: [],
            summary: 0,
            currentOrderId: 0,
            printed: [],
            preloaded: [],
            loadedFromTablet: []
        },
        currentPayload: {},
        showTableActions: false,
        showPrinterBtn: false,
        showOrderPreloaderSpinner: false,
        openedPanel: {
            status: 'menu',
            printed: false,
            menu: true,
            current: false
        }
    },
    mutations: mutations,
    actions: actions,
    getters: {
        apiUrl: state => {
            return `http://${state.settings.login}:${state.settings.pass}@${state.settings.url}`;
        },
        apiUrlModel: state => {
            return `http://${state.settings.login}:${state.settings.pass}@${state.settings.urlModel}`;
        }
    }
});
export default store;