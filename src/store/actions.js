import * as a_types from './actions-types'
import axios from 'axios';
import fullMenu from '../components/data/full.js';
import modsPosition from '../components/data/modsPosition';
import modsCommon from '../components/data/modsCommon';
import store from '../store';

export default {
    /**
     * Добавояет товар в текущий заказ
     * @param payload - параметры (item, table, course, waiterId...)
     */
        [a_types.ADD_POSITION_TO_ORDER]({commit, dispatch}, payload) {
        payload.callback = () => {
            dispatch('CALCULATE_ORDER_SUMMARY', payload.tableId);
        };
        commit('ADD_NEW_ORDER_STRING', payload);
        commit('SET_CURRENT_PAYLOAD', payload);
    },

    /**
     * Удаляет товар из массива заказов текущего пользователя
     * @param payload - параметры (item, table, course ...)
     */
        [a_types.REMOVE_POSITION_FROM_ORDER]({state, commit, dispatch}, payload) {
        console.log(state.orders.current);
        console.log(payload);
        let index = _.findLastIndex(state.orders.current, function (items) {
            return (
            items.item.code === payload.item.code &&
            items.course === payload.course &&
            items.tableId === payload.tableId &&
            items.waiterId === payload.waiterId &&
            items.guestId === payload.guestId &&
            items.isHeader === payload.isHeader &&
            items.currentCount === payload.currentCount &&
            items.modsPosition === payload.modsPosition)
        });
        let comitPayload = {
            'index': index,
            callback: () => {
                dispatch('CALCULATE_ORDER_SUMMARY', payload.tableId)
            }
        };
        commit('REMOVE_STRING_FROM_ORDER', comitPayload);
    },

    /**
     * Удаляет строку заказа из массива заказов текущего пользователя
     * @param payload - параметры (item, table, course ...)
     */
        [a_types.REMOVE_POSITION_STRING_FROM_ORDER]({state, commit, dispatch}, payload) {
        let indexArr = [];
        let cursor = 0;
        let comitPayload = {
            callback: () => {
                dispatch('CALCULATE_ORDER_SUMMARY', payload.tableId)
            }
        };
        state.orders.current.forEach(function (item, index, arr) {
            cursor++;
            if (item.item.code === payload.item.code &&
                item.course === payload.course &&
                item.tableId === payload.tableId &&
                item.waiterId === payload.waiterId &&
                item.guestId === payload.guestId &&
                item.currentCount === payload.currentCount &&
                item.modsPosition === payload.modsPosition) {
                indexArr.push(index);
            }
            if (cursor === arr.length) {
                comitPayload.indexes = indexArr;
                commit('REMOVE_ALL_STRINGS_FROM_ORDER', comitPayload);
            }
        });
    },

    /**
     * Подсчитывает ткущую сумму заказа
     * @param tableId - id стола
     */
        [a_types.CALCULATE_ORDER_SUMMARY]({state, commit}, tableId) {
        // отфильтровываем строки для текущего стола
        let currentTableOrder = _.filter(state.orders.current, (item) => {
            return item.tableId === tableId
                && item.isHeader === true
        });
        // суммируем все строки заказа стола
        let result = _.reduce(currentTableOrder, (sum, curItem) => {
            return sum + curItem.item.price;
        }, 0);
        // комитим сумму в хранилище
        commit('SET_CURRENT_SUMMARY', result);
    },

    /**
     * Получение полного меню
     */
        [a_types.GET_MENU]({commit}) {
        console.log('Загружаем меню');
        //let url = store.getters.apiUrlModel;
        let url = store.getters.apiUrl;
        /*let options = {
         'groups': '',
         'category': '',
         'data': 1,
         'uuid': store.state.settings.uuid
         };*/
        let options = {
            'menuGarson': 1,
        };
        axios.get(url, {params: options})
            .then(resp => {
                console.log('Меню:');
                console.log(resp.data);
                formNewData(resp.data);
            })
            .catch(err => {
                console.log(err);
            });

        //formNewData(fullMenu);

        function formNewData(json) {
            console.log('json');
            console.log(json);
            if (json.groups && json.groups.length === 0) {
                return;
            }
            // todo добавить проверку
            let roots = _.filter(json.groups, function (item) {
                if (item.parrent_code === '') {
                    // заполняем первый уровень
                    item.groups = _.filter(json.groups, function (sub1) {
                        if (sub1.parrent_code !== sub1.code && sub1.parrent_code === item.code) {
                            sub1.items = _.filter(json.items, function (item1) {
                                //item1.img = загружваем на планшет
                                return item1.parent_code === sub1.code;
                            });
                            // заполняем второй уровень
                            sub1.groups = _.filter(json.groups, function (sub2) {
                                if (sub2.parrent_code !== sub2.code && sub2.parrent_code === sub1.code) {
                                    sub2.items = _.filter(json.items, function (item2) {
                                        //item2.img = загружваем на планшет
                                        return item2.parent_code === sub2.code;
                                    });
                                    // Заполняем третий уровень
                                    sub2.groups = _.filter(json.groups, function (sub3) {
                                        if (sub3.parrent_code !== sub3.code && sub3.parrent_code === sub2.code) {
                                            sub3.items = _.filter(json.items, function (item3) {
                                                //item3.img = загружваем на планшет
                                                return item3.parent_code === sub3.code;
                                            });
                                            // Заполняем четвертый уровень
                                            sub3.groups = _.filter(json.groups, function (sub4) {
                                                if (sub4.parent_code !== sub4.code && sub4.parrent_code === sub3.code) {
                                                    // При добавление новых уровней, добавляем фильтры по аналогичному алгоритму...
                                                    sub4.order = +sub4.order;
                                                    return sub4;
                                                }
                                            });
                                            sub3.order = +sub3.order;
                                            return sub3;
                                        }
                                    });
                                    sub2.order = +sub2.order;
                                    return sub2;
                                }
                            });
                            sub1.order = +sub1.order;
                            return sub1;
                        }
                    });
                    item.order = +item.order;
                    return item;
                }
            });
            commit('SET_FULL_MENU', roots);
            commit('SET_SOURCE_MENU', json);
        }
    },


    [a_types.LOAD_ORDER_FROM_GUEST_TABLET]({state, commit}, payload) {
        // payload = {tabletId, tableId, callback}

    },

    [a_types.LOAD_GUEST_TABLETS]() {

    },

    /**
     * Загрузка общих модификаторов
     * @param commit
     * @param payload пераметры ( URL или JSON, callback )
     */
        [a_types.LOAD_COMMON_MODS]({commit}, payload) {
        let result = modsCommon;
        let commitPayload = {};

        if (payload.callback) {
            commitPayload.callback = payload.callback;
        }
        commitPayload.mods = result;
        commit('SET_COMMON_MODS', commitPayload);
    },

    /**
     * Загрузка модификаторов товара
     * @param commit
     * @param payload пераметры ( URL или JSON, callback  )
     */
        [a_types.LOAD_POSITIONS_MODS]({commit}, payload) {
        let result = _.filter(modsPosition, (item) => {
            return item.code.length > 2;
        });
        let commitPayload = {};

        if (payload.callback) {
            commitPayload.callback = payload.callback;
        }
        commitPayload.mods = result;
        commit('SET_POSITIONS_MODS', commitPayload);
    }
}