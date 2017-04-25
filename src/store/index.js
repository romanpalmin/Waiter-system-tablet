import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import * as types from './mutations-types'

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        tabletNumber: '13',
        waiter: {},
        testMessage: 'Планшет официанта!',
        halls: [],
        login: false,
        selectedHallId: 0,
        guestsCount: 0,
        currentTable:0,
        pages:{
            main: true,
            password: false,
            users: false
        }
    },
    mutations:{
        [types.SET_WAITER](state, payload){
            state.waiter = payload.waiter;
        },
        [types.SET_HALLS](state, payload){
            state.halls = payload.halls;
        },
        [types.SET_USER_LOG_IN_OUT](state, payload){
            state.login = payload.login;
        },
        [types.SET_MAIN_PAGE](state, payload){
            state.pages.main = payload.main;
        },
        [types.SET_PASSWORD_PAGE](state, payload){
            state.pages.password = payload.password;
        },
        [types.SET_USERS_PAGE](state, payload){
            state.pages.users = payload.users;
        },
        [types.SET_SELECTED_HALL](state, payload){
            state.selectedHallId = payload.hallId;
        },
        [types.SET_CURRENT_TABLE](state, payload){
            state.currentTable = payload.tableId;
        },
        [types.SET_CURRENT_GUESTS](state, payload){
            state.guestsCount = +payload.guestsCount;
        }
    }

});
export default store;