<template>
    <div>
        <div></div>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    import ls from '../helpers/local-storage.js';
    export default{
        data(){
            return {
                usrID: this.$store.state.waiter.id,
                apiUrl: {
                    'url': this.$store.getters.apiUrl
                },
                url: this.$store.getters.apiUrl
            }
        },
        mounted(){
            this.handlers();
        },

        computed: {
            currentOrderByPosition(){
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
            handlers(){
                this.$$('.print-order').on('click', () => {
                    this.printOrder()
                });
                this.$$('.load-to-ls').on('click', () => {
                    this.loadToLs()
                });
                this.$$('.load-from-ls').on('click', () => {
                    this.loadFromLs()
                });
                this.$$('.remove-from-ls').on('click', () => {
                    this.removeFromLs()
                });
                this.$$('.clear-ls').on('click', () => {
                    this.clearLs()
                });
                this.$$('.back-to-tables').on('click', () => {
                    this.backToTables();
                });
                console.log(this.$$('.print-order-or-table'));
                this.$$('.print-order-or-table').on('click', () => {
                    console.log(12345);
                    this.printOrderOrTable();
                });
            },

            printOrderOrTable(){
                console.log('PRINT SMTH...');
                console.log(this.$store.state.pages);
            },

            backToTables(){
                const self = this;
                this.$f7.showPreloader('Проверка текущего заказа');
                if (this.$store.state.orders.printed && this.$store.state.orders.printed.length === 0) {
                    let uuid = '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7';
                    let usrID = this.$store.state.waiter.id;
                    let table = this.$store.state.currentTable;
                    let zakNo = this.$store.state.orders.currentOrderId;
                    let guests = this.$store.state.guestsCount;
                    let numTablet = this.$store.state.tabletNumber;
                    let optionsRec = {
                        'cmd_garson': 'REC', numTablet, zakNo, usrID, table, guests, uuid
                    };
                    this.axios.get(this.$store.getters.apiUrl, {params: optionsRec})
                        .then(rec => {
                            if (rec && rec.data && rec.data[0] && rec.data[0].str1 && rec.data[0].str1[0] && rec.data[0].str1[0] && rec.data[0].str1[0].answCode === '0') {
                                let currentPrinted = rec.data[0].str2;
                                this.$f7.hidePreloader();
                                return currentPrinted;
                            }
                            else {
                                throw new Error(rec.data);
                            }
                        })
                        .then(currentPrinted => {
                            console.log(currentPrinted);
                            if (currentPrinted && currentPrinted.length > 0) {
                                console.log('Оставляем все как есть');
                                /*this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                                 this.$router.load({'url':'/tables/', 'reload':true});*/
                                success();
                            } else {
                                console.log('Обнуляем заказ');
                                this.$f7.hidePreloader();

                                this.$f7.confirm('Заказ будет удален', 'Вы уверены?', () => {
                                        optionsRec.cmd_garson = 'CAN';
                                        this.$f7.showPreloader('Удаление текущего заказа');
                                        this.axios.get(this.$store.getters.apiUrl, {params: optionsRec})
                                            .then(resp => {
                                                console.log(resp);
                                                this.$f7.hidePreloader();
                                                this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                                                this.$router.load({'url': '/tables/', 'reload': true});
                                            })
                                            .catch(err => {
                                                this.$f7.hidePreloader();
                                                this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                                                success();
                                                /*this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                                                 this.$router.load({'url':'/tables/', 'reload':true});
                                                 this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                                                 this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                                                 this.$router.load({'url':'/tables/', 'reload':true});*/
                                            })

                                    }
                                );
                            }
                        })
                        .catch((err => {
                            this.$f7.hidePreloader();
                            this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                        }))
                } else {
                    this.$f7.hidePreloader();
                    console.log('Оставляем');
                    success();
                    //console.log(this.$store.state.orders.printed);
                    /*this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                     this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                     this.$router.load({'url':'/tables/', 'reload':true});*/
                }
                function success() {
                    self.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                    self.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                    self.$store.commit('SET_EDIT_ORDER_PAGE', {'editorder': false});
                    self.$router.load({'url': '/tables/', 'reload': true});
                    /*this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                     this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                     this.$router.load({'url':'/tables/', 'reload':true});*/
                }
            },

            printOrder(){
                this.$f7.showPreloader('Печать стола №' + this.$store.state.currentTable);
                this.addNewOrder();
            },

            deleteOrder(optionsCan){
                this.$f7.confirm('Заказ будет удален', 'Вы уверены?', () => {
                        this.$f7.showPreloader('Удаление текущего заказа');
                        this.axios.get(this.$store.getters.apiUrl, {params: optionsCan})
                            .then(resp => {
                                console.log(resp);
                                this.$f7.hidePreloader();
                                this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                                setTimeout(() => {
                                    console.log('Выждем какое-то время');
                                    this.$router.load({'url': '/tables/', 'reload': true});
                                }, 0);
                            })
                            .catch(err => {
                                this.$f7.hidePreloader();
                                this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                                this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                                this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                                setTimeout(() => {
                                    console.log('Выждем какое-то время');
                                    this.$router.load({'url': '/tables/', 'reload': true});
                                }, 0);
                            })

                    }
                );
            },

            addNewOrder(){
                let uuid = '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7';
                let usrID = this.$store.state.waiter.id;
                let table = this.$store.state.currentTable;
                let zakNo = this.$store.state.orders.currentOrderId;
                let guests = this.$store.state.guestsCount;
                let numTablet = this.$store.state.tabletNumber;
                let rows = this.populateOrderStrings(this.usrID, this.$store.state.currentTable);
                console.log('Текущая строка');
                console.log(rows);
                if (rows && rows.length === 0) {
                    console.log('Check for empty');
                    console.log('Отправленный на печать заказ');
                    console.log(this.$store.state.orders.printed);
                    console.log('Размер: ' + this.$store.state.orders.printed.length);
                    let optionsCan = {
                        'cmd_garson': 'CAN', numTablet, zakNo, usrID, table, guests, uuid
                    };
                    this.$f7.hidePreloader();
                    if (this.$store.state.orders.printed && this.$store.state.orders.printed.length === 0) {
                        this.deleteOrder(optionsCan);
                    } else {
                        this.$router.load({'url': '/tables/', 'reload': true});
                        this.$store.commit('REMOVE_FULL_CURRENT_ORDER');
                        this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                    }
                    return;
                }

                let optionsAdd = {
                    'cmd_garson': 'ADD', numTablet, usrID, table, zakNo, guests,
                    'rows': rows, uuid
                };

                let optionsRec = {
                    'cmd_garson': 'REC', numTablet, zakNo, usrID, table, guests, uuid
                };
                //this.$f7.hidePreloader();
                this.axios.get(this.$store.getters.apiUrl, {params: optionsAdd})
                    .then((resp) => {
                        let response = {};
                        if (resp && resp.data && resp.data[0] && resp.data[0].str1 && resp.data[0].str1[0]) {
                            response = resp.data[0].str1[0];
                            console.log(response);
                            return response;
                        } else {
                            console.log(resp.data);
                            throw new Error(resp.data);

                        }
                    })
                    .then(response => {
                        this.$f7.hidePreloader();
                        if (typeof response === 'object') {
                            this.$router.load({'url': '/tables/', 'reload': true});
                            this.$store.commit('REMOVE_FULL_CURRENT_ORDER');
                            this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                        }
                    })

                    .catch((err => {
                        console.log(err);
                        this.$f7.hidePreloader();
                        this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                    }))
            },

            populateOrderStrings(userId, tableId){
                let orderStrings = '';
                let currentOrder = this.currentOrderByPosition;
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
                        orderStrings += item.el.item.code + '|'; // код товара
                        orderStrings += item.count + '|'; // количество товара
                        orderStrings += '' + '|'; // планшет гостя

                    });
                    return orderStrings;
                } else {
                    return [];
                }
            },

            loadFromLs(){
                let res = '';
                res = ls.lsGet('test');
                console.log(res);
            },

            loadToLs(){
                let data = {
                    'key': 'test',
                    'value': 'testValue'
                };
                ls.lsPut(data);
            },
            removeFromLs(){
                ls.lsRemove('test');
            },
            clearLs(){
                ls.lsClear();
            }
        }
    }
</script>