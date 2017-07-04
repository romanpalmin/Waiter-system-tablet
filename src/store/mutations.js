import * as m_types from './mutations-types';
import _ from 'lodash';
export default {
    [m_types.SET_FULL_MENU](state, payload){
        state.FullTree = payload;
    },
    [m_types.SET_WAITER](state, payload){
        state.waiter = payload.waiter;
    },
    [m_types.SET_HALLS](state, payload){
        state.halls = payload.halls;
    },
    [m_types.SET_USER_LOG_IN_OUT](state, payload){
        state.login = payload.login;
    },
    [m_types.SET_MAIN_PAGE](state, payload){
        state.pages.main = payload.main;
    },
    [m_types.SET_PASSWORD_PAGE](state, payload){
        state.pages.password = payload.password;
    },
    [m_types.SET_ADD_ORDER_PAGE](state, payload){
        state.pages.addorder = payload.addorder;
    },
    [m_types.SET_USERS_PAGE](state, payload){
        state.pages.users = payload.users;
    },
    [m_types.SET_SELECTED_HALL](state, payload){
        state.selectedHallId = payload.hallId;
    },
    [m_types.SET_CURRENT_TABLE](state, payload){
        state.currentTable = payload.tableId;
    },
    [m_types.SET_CURRENT_GUESTS](state, payload){
        state.guestsCount = +payload.guestsCount;
    },
    [m_types.SET_CURRENT_GUEST](state, payload){
        state.currentGuest = +payload.currentGuest;
        if (payload.callback && typeof(payload.callback) === "function") {
            payload.callback();
        }
    },
    [m_types.SET_NEW_ORDER](state, payload){
        state.orders = payload.order;
    },

    /**
     * Добавляет новый товар и мутирует состояние
     * @param state
     * @param payload
     */
        [m_types.ADD_NEW_ORDER_STRING](state, payload){
        state.orders.current.push(payload);
        if (payload.callback && typeof(payload.callback) === "function") {
            payload.callback();
        }
    },

    /**
     * Удаляет элемент по индексу, подсчитывает сумму и мутирует массив для обновлений через map
     * @param state
     * @param payload index, callback
     */
        [m_types.REMOVE_STRING_FROM_ORDER](state, payload){
        if (payload.index >= 0) {
            _.pullAt(state.orders.current, [payload.index]);
            if (payload.callback && typeof(payload.callback) === "function") {
                state.orders.current = _.map(state.orders.current, (item) => {
                    return item
                });
                payload.callback();
            }
        }
    },

    /**
     * Удаляет все строки из заказа по заданным условиям
     * @param state
     * @param payload
     */
        [m_types.REMOVE_ALL_STRINGS_FROM_ORDER](state, payload){

        if (payload.indexes.length >= 0) {
            _.pullAt(state.orders.current, payload.indexes);
            if (payload.callback && typeof(payload.callback) === "function") {
                state.orders.current = _.map(state.orders.current, (item) => {
                    return item
                });
                payload.callback();
            }
        }
    },

    [m_types.SET_CURRENT_SUMMARY](state, payload){
        state.orders.summary = payload;
    },
    [m_types.SET_CURRENT_COURSE](state, payload){
        state.orders.current[payload.index].course = payload.course;
    }
}