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
            uuid:'64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7' //  1010101
            //uuid:'91$b9$41$9d$27$d4$59$7d$7f$00$7e$ed$e8$62$b0$15' // 101011
            //uuid:'da$1e$09$df$97$50$72$d1$2e$43$8e$60$e7$37$06$f5' // 101012
            //uuid:'9a$f2$d2$33$fd$74$1e$75$5c$60$25$18$e1$45$0d$47' // 101013
            //uuid:'61$52$2a$ef$f5$9e$94$0a$0f$28$70$fd$15$17$52$96' // 101014
            //uuid:'a5$77$2f$78$f2$9e$4a$99$f7$ec$c2$e5$9f$e1$11$ef' // 101015
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
        },
        intervals:{
            updateUserTables: false
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