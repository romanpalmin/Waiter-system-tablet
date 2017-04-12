import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import * as types from './mutations-types'

const store = new Vuex.Store({
    state: {
        tabletNumber: '13',
        waiter: {},
        testMessage: 'Hello, world!',
        halls: [],
        login: false,
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
        }
    }

});
export default store;