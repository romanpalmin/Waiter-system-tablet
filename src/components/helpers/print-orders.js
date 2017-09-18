import store from './../../store/index';
import blocker from './table-blocker';
import ajax from './ajax';


export default {
    addStringsToOrder: async(ctx) => {
        //ctx.$f7.closeModal();
        ctx.$f7.showPreloader('Печать стола №' + store.state.currentTable);

        let uuid = store.state.settings.uuid;
        let usrID = store.state.waiter.id;
        let table = store.state.currentTable;
        let zakNo = store.state.orders.currentOrderId;
        let guests = store.state.guestsCount === 0
            ? 1 : store.state.guestsCount;
        let numTablet = store.state.tabletNumber.length === 1
            ? '0' + store.state.tabletNumber
            : store.state.tabletNumber;
        let rows = populateOrderStrings(usrID, store.state.currentTable);
        if (rows && rows.length === 0) {
            let optionsCan = {
                'cmd_garson': 'CAN', numTablet, zakNo, usrID, table, guests, uuid
            };
            ctx.$f7.hidePreloader();
            if (store.state.orders.printed.length === 0) {
                if (!store.state.pages.addorder) {
                    blocker.unblockTable({
                        tableId: table,
                        zakNo,
                        uuid,
                        callback: () => {
                            exitToTables(ctx);
                        }
                    });
                } else {
                    deleteOrder(optionsCan, ctx);
                }
            } else {
                blocker.unblockTable({
                    tableId: table,
                    zakNo,
                    uuid,
                    callback: () => {
                        exitToTables(ctx);
                    }
                });
            }
        } else {

            let optionsAdd = {
                'cmd_garson': 'ADD', numTablet, usrID, table, zakNo, guests,
                'rows': rows, uuid
            };
            try {
                const add = await ajax.getData(optionsAdd);
                let str = add.str1[0] ? add.str1[0] : '';
                if (str) {

                    if (typeof str === 'object') {
                        blocker.unblockTable({
                            tableId: table,
                            zakNo,
                            uuid,
                            callback: () => {
                                store.commit('SET_CURRENT_ORDER_ID', {'orderId': 0});
                                exitToTables(ctx);
                            }
                        });
                    } else {
                        ctx.$f7.hidePreloader();
                        throw new Error(str.answText);
                    }
                }
            }
            catch (err) {
                console.log(err);
                ctx.$f7.hidePreloader();
                if (err) {
                    ctx.$f7.alert(`Ошибка ${err}`, 'Ошибка!');
                } else {
                    ctx.$f7.alert(`Неизвестная ошибка`, 'Ошибка!');
                }
            }
        }

    },
    backToTables: async(ctx) => {
        {
            const self = ctx;
            self.$f7.showPreloader('Проверка текущего заказа');
            let uuid = self.$store.state.settings.uuid;
            let table = self.$store.state.currentTable;
            let zakNo = self.$store.state.orders.currentOrderId;
            if (self.$store.state.orders.printed && self.$store.state.orders.printed.length === 0) {
                let usrID = self.$store.state.waiter.id;
                let guests = self.$store.state.guestsCount;
                let numTablet = self.$store.state.tabletNumber;
                let optionsRec = {
                    'cmd_garson': 'REC', numTablet, zakNo, usrID, table, guests, uuid
                };
                if (!self.$store.state.pages.addorder) {
                    self.$f7.hidePreloader();
                    blocker.unblockTable({
                        tableId: table,
                        zakNo,
                        uuid,
                        callback: () => {
                            //exitToTables(ctx);
                            success();
                        }
                    });
                } else {
                    try {
                        const res = await ajax.getData(optionsRec);
                        let currentPrinted = res.str2 ? res.str2 : [];
                        if (currentPrinted && currentPrinted.length > 0) {
                            console.log('Оставляем все как есть');
                            success();
                            self.$f7.hidePreloader();
                        } else {
                            console.log('Обнуляем заказ');
                            self.$f7.hidePreloader();
                            const optionsDel = Object.assign({}, optionsRec, {'cmd_garson': 'CAN'});
                            blocker.unblockTable({
                                tableId: table,
                                zakNo,
                                uuid,
                                callback: () => {
                                    if (!self.$store.state.pages.addorder) {
                                        blocker.unblockTable({
                                            tableId: table,
                                            zakNo,
                                            uuid,
                                            callback: () => {
                                                //exitToTables(ctx);
                                                success();
                                            }
                                        });
                                    } else {
                                        deleteOrder(optionsDel, self);
                                    }
                                }
                            });
                        }
                    }
                    catch (err) {
                        self.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                        self.$f7.hidePreloader();
                    }
                }
            }

            else {
                self.$f7.hidePreloader();
                console.log('Оставляем');
                success();
            }

            function success() {
                setTimeout(() => {
                    blocker.unblockTable({
                        tableId: table,
                        zakNo,
                        uuid,
                        callback: () => {
                            //exitToTables(ctx);
                            self.$store.commit('SET_CURRENT_ORDER_ID', {'orderId': 0});
                        }
                        //usrId: self.store.state.waiter.waiterId,

                    });
                    self.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                    self.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                    self.$store.commit('SET_EDIT_ORDER_PAGE', {'editorder': false});
                    self.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': 'current'});
                    setTimeout(() => {
                        self.$router.load({'url': '/tables/', 'reload': true});
                    }, 0);
                }, 0)
            }
        }
    }
}

function exitToTables(ctx) {
    ctx.$store.commit('REMOVE_FULL_CURRENT_ORDER');
    ctx.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
    ctx.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
    ctx.$store.commit('SET_EDIT_ORDER_PAGE', {'editorder': false});
    setTimeout(() => {
        ctx.$f7.hidePreloader();
        ctx.$router.load({'url': '/tables/', 'reload': true});
    }, 0);
}

function getCurrentOrder() {
    let filtered = _.filter(store.state.orders.current, (item) => {
        return item.tableId === store.state.currentTable
    });
    if (filtered.length === 0) return;
    if (filtered.length > 1) {
        let groupByProps = [];
        groupByProps.push({el: filtered[0], count: 1});
        for (let idx = 1; idx < filtered.length; idx++) {
            for (let innerIdx = 0; innerIdx < groupByProps.length; innerIdx++) {
                if (
                    filtered[idx].item.code === groupByProps[innerIdx].el.item.code &&
                    filtered[idx].item.code2 === groupByProps[innerIdx].el.item.code2 &&
                    filtered[idx].course === groupByProps[innerIdx].el.course &&
                    //filtered[idx].guestId === groupByProps[innerIdx].el.guestId &&
                    filtered[idx].tableId === groupByProps[innerIdx].el.tableId &&
                    filtered[idx].waiterId === groupByProps[innerIdx].el.waiterId &&
                    filtered[idx].modsPosition === groupByProps[innerIdx].el.modsPosition &&
                    filtered[idx].modsCommon === groupByProps[innerIdx].el.modsCommon
                ) {
                    groupByProps[innerIdx].count++;
                    break;
                } else {
                    if (innerIdx === groupByProps.length - 1) {
                        groupByProps.push({el: filtered[idx], count: 1});
                        break;
                    }
                }
            }
            if (idx === filtered.length - 1) {
                return groupByProps;
            }
        }
    }
    else {
        return [{el: filtered[0], count: 1}];
    }
}

function populateOrderStrings(userId, tableId) {
    let orderStrings = '';
    let currentOrder = getCurrentOrder();
    if (currentOrder) {
        currentOrder.forEach((item, index) => {
            if (index > 0) {
                orderStrings += '*'; // разделитель строк
            }
            orderStrings += item.el.modsPosition + '|'; // модификатор товара
            orderStrings += (item.el.modsCommon).trim() + '|'; // общий модификатор
            orderStrings += (item.el.course > 0 ? item.el.course : '') + '|'; // курс
            orderStrings += '' + '|'; // вид скидки
            orderStrings += '' + '|'; // процент скидки
            orderStrings += ((item.el.isHeader) ? item.el.item.code : item.el.item.code2) + '|'; // код товара
            orderStrings += item.count + '|'; // количество товара
            orderStrings += '' + '|'; // планшет гостя

            orderStrings += 'k'; // тип строки
            if (item.el.isHeader) {
                orderStrings += '|+|'; // головная строка
            } else {
                orderStrings += '|-|';
            }

            orderStrings += '' + '|'; // номер комплекта внутри заказа
            orderStrings += '' + '|'; // цена
            orderStrings += '' + '|'; // Recno строки
            orderStrings += '' + '|'; // Номер гостя в заказе

        });
        return orderStrings;
    } else {
        return [];
    }
}

function deleteOrder(optionsCan, ctx) {
    ctx.$f7.confirm('Заказ будет удален', 'Вы уверены?', async() => {
            ctx.$f7.showPreloader('Удаление текущего заказа');
            try {
                const del = await ajax.getData(optionsCan);
                ctx.$f7.hidePreloader();
                ctx.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                ctx.$store.commit('SET_EDIT_ORDER_PAGE', {'editorder': false});
                setTimeout(() => {
                    ctx.$router.load({'url': '/tables/', 'reload': true});
                }, 0);
            }
            catch (err) {
                ctx.$f7.hidePreloader();
                ctx.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                ctx.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                ctx.$store.commit('SET_EDIT_ORDER_PAGE', {'editorder': false});
                store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                setTimeout(() => {
                    ctx.$router.load({'url': '/tables/', 'reload': true});
                }, 0);
            }
        }
    );
}