import * as a_types from './actions-types'
import fullMenu from '../components/data/full.js';
export default {
    /*    [a_types.ADD_POSITION_STRING_TO_ORDER]({state, commit, dispatch}, payload){
     let isAddNew = true;
     let str = {'item': payload.item, 'count': 1};
     if (state.orders.current.length > 0) {
     for (let i = 0; i < state.orders.current.length; i++) {
     if (state.orders.current[i].item.code === payload.item.code) {
     commit('CHANGE_COUNT_ORDER_STRING', {'index': i, 'inc': payload.increase});
     dispatch('CALCULATE_SUMMARY_OF_CURRENT_ORDER');
     isAddNew = false;
     break;
     }
     if (i === state.orders.current.length - 1 && isAddNew) {
     addNewString(str);
     break;
     }
     }
     }
     else {
     addNewString(str);
     }
     function addNewString(str) {
     commit('ADD_NEW_ORDER_STRING', {'orderString': str});
     dispatch('CALCULATE_SUMMARY_OF_CURRENT_ORDER');
     }

     },*/

    /**
     * Добавояет товар в текущий заказ
     * @param payload - параметры (item, table, course, waiterId...)
     */
        [a_types.ADD_POSITION_TO_ORDER]({commit, dispatch}, payload){
        payload.callback = () => {
            dispatch('CALCULATE_ORDER_SUMMARY', payload.tableId);
        };
        commit('ADD_NEW_ORDER_STRING', payload);
    },

    /**
     * Удаляет товар из массива заказов текущего пользователя
     * @param payload - параметры (item, table, course ...)
     */
        [a_types.REMOVE_POSITION_FROM_ORDER]({state, commit, dispatch}, payload){
        console.log('Удаление позиции из заказа');
        let index = _.findLastIndex(state.orders.current, function (items) {
            return (
            items.item.code === payload.item.code &&
            items.course === payload.course &&
            items.tableId === payload.tableId &&
            items.waiterId === payload.waiterId &&
            items.guestId === payload.guestId)
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
        [a_types.REMOVE_POSITION_STRING_FROM_ORDER]({state, commit, dispatch}, payload){
        console.log('Удаление строки из заказа');
        /*let newOrder = _.map(state.orders.current, function(item){

         });*/
        let indexArr = [];
        let cursor = 0;
        let comitPayload = {
            callback: () => {
                dispatch('CALCULATE_ORDER_SUMMARY', payload.tableId)
            }
        };
        state.orders.current.forEach(function(item, index, arr){
            cursor++;
            if (item.item.code === payload.item.code &&
                item.course === payload.course &&
                item.tableId === payload.tableId &&
                item.waiterId === payload.waiterId &&
                item.guestId === payload.guestId){
                indexArr.push(index);
            }
            if (cursor === arr.length){
                comitPayload.indexes = indexArr;
                commit('REMOVE_ALL_STRINGS_FROM_ORDER', comitPayload);
            }
        });

        //commit('REMOVE_ALL_STRINGS_FROM_ORDER', payload);

    },

    /**
     * Подсчитывает ткущую сумму заказа
     * @param tableId - id стола
     */
        [a_types.CALCULATE_ORDER_SUMMARY]({state, commit}, tableId){
        // отфильтровываем строки для текущего стола
        let currentTableOrder = _.filter(state.orders.current, (item) => {
            return item.tableId === tableId
        });
        // суммируем все строки заказа стола
        let result = _.reduce(currentTableOrder, (sum, curItem) => {
            return sum + curItem.item.price;
        }, 0);
        // комитим сумму в хранилище
        commit('SET_CURRENT_SUMMARY', result);
    },

    /*    [a_types.CALCULATE_SUMMARY_OF_CURRENT_ORDER]({state, commit}, payload){
     let result = 0;
     if (state.orders.current.length > 0) {
     result = _.reduce(state.orders.current, function (sum, curItem) {
     return sum + curItem.count * curItem.item.price;
     }, 0);
     commit('SET_CURRENT_SUMMARY', result);
     }
     },*/

    /*        [a_types.SET_POSITIONS_TO_CATEGORY]({commit}, payload)
     {
     let pl = {};
     pl.category = payload.ctgs;
     pl.callback = function () {
     console.log('Выполняется коллбэк');
     };
     commit('SET_CATEGORY', pl);
     }
     ,*/

    /**
     * Получение полного меню
     */
        [a_types.GET_MENU]({commit})
    {
        /*let cb = {};
         const self = this;
         ajax.exec({name: 'getDataNew'}, function (resp) {
         formNewData(resp.data);
         console.log(resp.data);
         });*/
        formNewData(fullMenu);

        function formNewData(json) {
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
        }
    }
}