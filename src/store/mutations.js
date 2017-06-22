import * as m_types from './mutations-types';
export default {
    [m_types.SET_FULL_MENU](state, payload){
        state.FullTree = payload;
        console.log(payload);
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
    [m_types.SET_CATEGORY](state, payload){
        state.category = payload.category;
        if (payload.callback && typeof(payload.callback) === "function") {
            payload.callback();
        }
    }
}