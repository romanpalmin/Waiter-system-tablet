import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
import * as types from './mutations-types'

const store = new Vuex.Store({
    state: {
        waiter: {},
        testMessage: 'Hello, world!'
    },
    mutations:{
        [types.SET_WAITER](state, payload){
            state.waiter = payload.waiter;
        }
    }

});
export default store;