import * as m_types from './mutations-types';
import _ from 'lodash';
export default {
    [m_types.SET_FULL_MENU](state, payload){
        state.FullTree = payload;
    },
    [m_types.SET_SOURCE_MENU](state, payload){
        state.SourceMenu = payload;
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
    [m_types.SET_EDIT_ORDER_PAGE](state, payload){
        state.pages.editorder = payload.editorder;
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
    /*
     [m_types.SET_NEW_ORDER](state, payload){
     state.orders = payload.order;
     },
     */

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

    /**
     * Очищает весь текущий заказ
     * @param state
     */
        [m_types.REMOVE_FULL_CURRENT_ORDER](state){
        state.orders.current = [];
        state.orders.current = _.map(state.orders.current, (item) => {
            return item
        });
    },

    [m_types.SET_CURRENT_SUMMARY](state, payload){
        state.orders.summary = payload;
    },
    [m_types.SET_CURRENT_COURSE](state, payload){
        console.log(payload);
        //state.orders.current[payload.index].course = payload.course;
    },
    [m_types.SET_ORDER_FROM_GUEST_TABLET](state, payload){
        state.orders.current = state.orders.current.concat(payload.order);
        if (payload.callback && typeof(payload.callback) === "function") {
            state.orders.current = _.map(state.orders.current, (item) => {
                return item
            });
            payload.callback();
        }
    },

    [m_types.SET_GUEST_TABLET](state, payload){

    },

    /**
     * Установка общих модификаторов
     * @param state состояние
     * @param payload параметры (массив, callback*)
     */
        [m_types.SET_COMMON_MODS](state, payload){
        state.modsCommon = payload.mods;
        if (payload.callback && typeof(payload.callback) === "function") {
            payload.callback();
        }
    },

    /**
     * Установка модификаторов товаров
     * @param state состояние
     * @param payload параметры (массив, callback*)
     */
        [m_types.SET_POSITIONS_MODS](state, payload){
        state.modsPosition = payload.mods;
        if (payload.callback && typeof(payload.callback) === "function") {
            payload.callback();
        }
    },

    /**
     * Обновляет общий модификатор для выбранной строки
     * @param state
     * @param payload параметры строки, новое значение
     */
        [m_types.UPDATE_COMMON_MODS](state, payload){
        let params = payload.params;

        state.orders.current = _.map(state.orders.current, (item) => {
            if (
                item.item.code === params.item.code &&
                item.course === params.course &&
                item.waiterId === params.waiterId &&
                item.tableId === params.tableId &&
                item.guestId === params.guestId &&
                item.modsPosition === params.modsPosition &&
                item.modsCommon === params.modsCommon
            ) {
                item.modsCommon = payload.newValue;
            }
            return item;
        });
    },

    /**
     * Обновляет модификатор товара для выбранной строки
     * @param state
     * @param payload параметры строки, новое значение
     */
        [m_types.UPDATE_POSITIONS_MODS](state, payload){
        let params = payload.params;
        state.orders.current = _.map(state.orders.current, (item) => {
            if (
                item.item.code === params.item.code &&
                item.course === params.course &&
                item.waiterId === params.waiterId &&
                item.tableId === params.tableId &&
                item.guestId === params.guestId &&
                item.modsPosition === params.modsPosition &&
                item.modsCommon === params.modsCommon
            ) {
                item.modsPosition = payload.newValue;
            }
            return item;
        });
    },

    /**
     * Обновляет курс для выбранной строки
     * @param state
     * @param payload параметры строки, новое значение
     */
        [m_types.UPDATE_STRING_COURSE](state, payload){
        let params = payload.params;
        state.orders.current = _.map(state.orders.current, (item) => {
            if (
                item.item.code === params.item.code &&
                item.course === params.course &&
                item.waiterId === params.waiterId &&
                item.tableId === params.tableId &&
                item.guestId === params.guestId &&
                item.modsPosition === params.modsPosition &&
                item.modsCommon === params.modsCommon
            ) {
                item.course = payload.newValue;
            }
            return item;
        });
        console.log(state.orders.current);
    },

    /**
     * Устанавливает текущую выбранную строку для взаимодействия между компонентами
     * @param state
     * @param строка заказа
     */
        [m_types.SET_CURRENT_PAYLOAD](state, payload){
        state.currentPayload = payload;
    },

    /**
     * Устанавливает текущий номер заказа
     * @param state
     * @param payload
     */
        [m_types.SET_CURRENT_ORDER_ID](state, payload){
        state.orders.currentOrderId = payload.orderId;
        state.orders.summary = 0;
    },

    [m_types.SET_PRINTED_ORDER](state, payload){
        state.orders.printed = _.map(payload.printedOrders, it => {
            return it;
        });
    },

    /**
     * Установка логина
     * @param state
     * @param payload - логин
     */
        [m_types.SET_LOGIN](state, payload){
        state.settings.login = payload;
    },

    /**
     * Установка пароля
     * @param state
     * @param payload - пароль
     */
        [m_types.SET_PASS](state, payload){
        state.settings.pass = payload;
    },

    /**
     * Установка номера планшета
     * @param state
     * @param payload - номер планшета
     */
        [m_types.SET_TABLET_NUM](state, payload){
        state.tabletNumber = payload;
    },

    /**
     * Устанавливает признак показа панели действий со столом
     * @param state
     * @param payload true/false
     */
    [m_types.SET_SHOW_TABLE_ACTIONS_PANEL](state, payload){
            state.showTableActions = payload;
    }
}