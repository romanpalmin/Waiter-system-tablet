import * as a_types from './actions-types'
import fullMenu from '../components/data/full.js';
export default {
    [a_types.SET_POSITIONS_TO_CATEGORY]({commit}, payload){
        let pl = {};
        pl.category = payload.ctgs;
        pl.callback = function(){
            console.log('Выполняется коллбэк');
        };
        commit('SET_CATEGORY', pl);
    },

    /**
     * Получение полного меню
     */
    [a_types.GET_MENU]({commit}){
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