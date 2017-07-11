<template>
    <div>
        <div>PRINT</div>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    import ls from '../helpers/local-storage.js';
    export default{
        data(){
            return {
                name: 'this component',
                errCount: 0,
                maxErrCount: 2,
                timeouts: {
                    repeatTry: 2000
                },
                usrID: '241182',
                apiUrl: {
                    'testNewOrder': 'https://yesno.wtf/api/',
                    'testAddOrder': 'https://httpbin.org/get',
                    'newOrder': '',
                    'addOrder': this.$store.state.settings.apiUrl
                }
            }
        },
        mounted(){
            this.handlers();
        },

        computed:{
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
                                filtered[idx].modsPosition === groupByProps[innerIdx].el.modsPosition&&
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
            },

            printOrder(){
                this.addNewOrder({'order': 'test'});
                this.$f7.showPreloader('Печать стола №' + this.$store.state.currentTable);
            },

            addNewOrder(params){
                let options = {
                    'cmd_garson': 'ADD',
                    'numTablet': '05',
                    'usrID': this.usrID,
                    'table': this.$store.state.currentTable,
                    'zakNo': this.$store.state.orders.currentOrderId,
                    'guest': this.$store.state.guestsCount,
                    'rows': this.populateOrderStrings(this.usrID, this.$store.state.currentTable),
                    'uuid': '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7'
                }
                console.log(options);
                this.$f7.hidePreloader();
                this.axios.get(this.apiUrl.addOrder, {params: options})
                    .then((resp) => {
                        console.log(resp.data);
                        this.$f7.hidePreloader();
                    })
                    .catch((err=>{
                        console.log(err);
                        this.$f7.hidePreloader();
                        this.$f7.alert(`Ошибка добавления товаров в заказ: ${err}`, 'Ошибка!');
                    }))
            },

            populateOrderStrings(userId, tableId){
                let orderStrings = '';
                let currentOrder =this.currentOrderByPosition
                console.log(currentOrder);
                currentOrder.forEach((item, index)=>{
                    if (index > 0){
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
            },

            addNewOrderOld(params){
                let testApi1 = this.apiUrl.testNewOrder;
                this.axios.get(testApi1)
                    .then((response) => {
                        /** генерация тестовой ошибки
                         throw new Error('Ошибка создания заказа');
                         */
                        console.log('Создан заказ');
                        this.errCount = 0;
                        return response;
                    })
                    .then((data) => {
                        this.addOrder(data);
                    })
                    .catch((err) => {
                        console.log(err);
                        if (this.errCount < this.maxErrCount) {
                            this.errCount++;
                            setTimeout(() => {
                                this.addNewOrder(params);
                            }, this.timeouts.repeatTry);
                        } else {
                            console.log('Попытки создания заказа исчерпаны');
                            this.errCount = 0;
                            this.$f7.hidePreloader();
                            return;
                        }
                    });
            },

            addOrder(orderNum) {
                let testApi2 = this.apiUrl.testAddOrder;
                console.log('Текущий номер заказа:');
                console.log(orderNum);
                this.axios.get(testApi2)
                    .then((resp) => {
                        /** генерация тестовой ошибки
                         throw new Error('Ошибка добавления заказа');
                         */
                        console.log('Добавлены строки:');
                        console.log(resp.data);
                        this.$f7.hidePreloader();
                        this.errCount = 0;
                    })
                    .catch((err) => {
                        console.log(err);
                        if (this.errCount < this.maxErrCount) {
                            this.errCount++;
                            setTimeout(() => {
                                this.addOrder(orderNum);
                            }, this.timeouts.repeatTry);
                        } else {
                            console.log('Попытки добавления заказа исчерпаны');
                            this.errCount = 0;
                            this.$f7.hidePreloader();
                            return;
                        }
                    });
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
                }
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