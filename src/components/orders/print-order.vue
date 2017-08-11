<template>
    <div>
        <div></div>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    import ls from '../helpers/local-storage.js';
    import blocker from '../helpers/table-blocker.js';
    import ajax from '../helpers/ajax';
    export default {
        data() {
            return {
                usrID: this.$store.state.waiter.id,
                apiUrl: {
                    'url': this.$store.getters.apiUrl
                },
                url: this.$store.getters.apiUrl
            }
        },

        mounted() {
            this.handlers();
        },

        computed: {
            currentOrderByPosition() {
                console.log('Текущее состояние заказа');
                console.log(this.$store.state.orders.current);
                let filtered = _.filter(this.$store.state.orders.current, (item) => {
                    return item.tableId === this.$store.state.currentTable
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
        },
        methods: {
            handlers() {
                this.$$('.print-order').on('click', () => {
                    this.printOrder();
                });
                this.$$('.load-to-ls').on('click', () => {
                    this.loadToLs();
                });

                this.$$('.back-to-tables').on('click', () => {
                    this.backToTables();
                });
                this.$$('.print-order-or-table').on('click', () => {
                    this.printOrderOrTable();
                });

                this.$$('.print-order-button').on('click', () => {
                    console.log('PRINT FROM ORDER');
                })
            },

            printOrderOrTable() {
                console.log(this.$store.state.pages);
            },

            async backToTables() {
                const self = this;
                this.$f7.showPreloader('Проверка текущего заказа');
                let uuid = this.$store.state.settings.uuid;
                let table = this.$store.state.currentTable;
                let zakNo = this.$store.state.orders.currentOrderId;
                if (this.$store.state.orders.printed && this.$store.state.orders.printed.length === 0) {
                    let usrID = this.$store.state.waiter.id;
                    let guests = this.$store.state.guestsCount;
                    let numTablet = this.$store.state.tabletNumber;
                    let optionsRec = {
                        'cmd_garson': 'REC', numTablet, zakNo, usrID, table, guests, uuid
                    };
                    try {
                        const res = await ajax.getData(optionsRec);
                        let currentPrinted = res.str2 ? res.str2 : [];
                        if (currentPrinted && currentPrinted.length > 0) {
                            console.log('Оставляем все как есть');
                            success();
                            this.$f7.hidePreloader();
                        } else {
                            console.log('Обнуляем заказ');
                            this.$f7.hidePreloader();
                            const optionsDel = Object.assign({}, optionsRec, {'cmd_garson': 'CAN'});
                            blocker.unblockTable({
                                tableId: table,
                                zakNo,
                                uuid,
                                callback: () => {
                                    this.deleteOrder(optionsDel);
                                }
                            });
                        }
                    }
                    catch (err) {
                        this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                        this.$f7.hidePreloader();
                    }
                } else {
                    this.$f7.hidePreloader();
                    console.log('Оставляем');
                    success();
                }

                function success() {
                    setTimeout(() => {
                        blocker.unblockTable({
                            tableId: table,
                            zakNo,
                            uuid
                            //usrId: self.store.state.waiter.waiterId,

                        });
                        self.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                        self.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                        self.$store.commit('SET_EDIT_ORDER_PAGE', {'editorder': false});
                        self.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': 'current'});
                        self.$router.load({'url': '/tables/', 'reload': true});
                    }, 0)
                }
            },

            printOrder() {
                this.$f7.showPreloader('Печать стола №' + this.$store.state.currentTable);
                this.addNewOrder();
            },

            deleteOrder(optionsCan) {
                console.log(optionsCan);
                this.$f7.confirm('Заказ будет удален', 'Вы уверены?', async () => {
                        this.$f7.showPreloader('Удаление текущего заказа');
                        try {
                            const del = await ajax.getData(optionsCan);
                            this.$f7.hidePreloader();
                            this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                            setTimeout(() => {
                                this.$router.load({'url': '/tables/', 'reload': true});
                            }, 0);
                        }
                        catch (err) {
                            this.$f7.hidePreloader();
                            this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                            this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                            this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                            setTimeout(() => {
                                this.$router.load({'url': '/tables/', 'reload': true});
                            }, 0);
                        }
                    }
                );
            },

            async addNewOrder() {
                let uuid = this.$store.state.settings.uuid;
                let usrID = this.$store.state.waiter.id;
                let table = this.$store.state.currentTable;
                let zakNo = this.$store.state.orders.currentOrderId;
                let guests = this.$store.state.guestsCount === 0
                    ? 1 : this.$store.state.guestsCount;
                let numTablet = this.$store.state.tabletNumber.length === 1
                    ? '0' + this.$store.state.tabletNumber
                    : this.$store.state.tabletNumber;
                let rows = this.populateOrderStrings(this.usrID, this.$store.state.currentTable);
                if (rows && rows.length === 0) {
                    let optionsCan = {
                        'cmd_garson': 'CAN', numTablet, zakNo, usrID, table, guests, uuid
                    };
                    this.$f7.hidePreloader();
                    if (this.$store.state.orders.printed && this.$store.state.orders.printed.length === 0) {
                        this.deleteOrder(optionsCan);
                    } else {
                        blocker.unblockTable({
                            tableId: table,
                            zakNo,
                            uuid,
                            callback: () => {
                                this.$store.commit('REMOVE_FULL_CURRENT_ORDER');
                                this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                                this.$router.load({'url': '/tables/', 'reload': true});
                            }
                        });
                    }
                    return;
                }

                let optionsAdd = {
                    'cmd_garson': 'ADD', numTablet, usrID, table, zakNo, guests,
                    'rows': rows, uuid
                };
                try {
                    const add = await ajax.getData(optionsAdd);
                    console.log(add);
                    let str = add.str1[0] ? add.str1[0] : '';
                    if (str) {
                        this.$f7.hidePreloader();
                        if (typeof str === 'object') {
                            blocker.unblockTable({
                                tableId: table,
                                zakNo,
                                uuid,
                                callback: () => {
                                    this.$store.commit('REMOVE_FULL_CURRENT_ORDER');
                                    this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                                    this.$router.load({'url': '/tables/', 'reload': true});
                                }
                            });
                        } else {
                            this.$f7.hidePreloader();
                            throw new Error(str.answText);
                        }
                    }
                }
                catch (err) {
                    console.log(err);
                    this.$f7.hidePreloader();
                    if (err) {
                        this.$f7.alert(`Ошибка ${err}`, 'Ошибка!');
                    } else {
                        this.$f7.alert(`Неизвестная ошибка`, 'Ошибка!');
                    }
                }


            },

            populateOrderStrings(userId, tableId) {
                let orderStrings = '';
                let currentOrder = this.currentOrderByPosition;
                if (currentOrder) {
                    console.log(currentOrder);
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
        }
    }

</script>