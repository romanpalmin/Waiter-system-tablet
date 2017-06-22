import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import * as types from './mutations-types'
import * as a_types from './actions-types'

import cat332020 from '../components/data/332020.js';
import cat342020 from '../components/data/342020.js';
import cat352020 from '../components/data/352020.js';
import cat392020 from '../components/data/392020.js';
import cat412020 from '../components/data/412020.js';
import cat422020 from '../components/data/422020.js';
import cat432020 from '../components/data/432020.js';
import cat462020 from '../components/data/462020.js';
import cat472020 from '../components/data/472020.js';
import cat482020 from '../components/data/482020.js';
import cat492020 from '../components/data/492020.js';

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
        pages:{
            main: true,
            password: false,
            users: false,
            addorder: false
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
        [types.SET_ADD_ORDER_PAGE](state, payload){
            state.pages.addorder = payload.addorder;
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
        },
        [types.SET_CATEGORY](state, payload){
            state.category = payload.category;
            if (payload.callback && typeof(payload.callback) === "function") {
                payload.callback();
            }
        }
    },

    actions:{
        [a_types.SET_POSITIONS_TO_CATEGORY]({commit}, payload){
            let pl = {};
            pl.category = payload.ctgs;
            pl.callback = function(){
                console.log('Выполняется коллбэк');
            };
            commit('SET_CATEGORY', pl);
        }
    }

});
export default store;