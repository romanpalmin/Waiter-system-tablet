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
                usrID: this.$store.state.usrID,
                apiUrl: {
                    'url': this.$store.state.settings.apiUrl
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
                this.$f7.showPreloader('Печать стола №' + this.$store.state.currentTable);
                this.addNewOrder();
            },

            addNewOrder(){
                let uuid = '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7';
                let usrID = this.usrID;
                let table = this.$store.state.currentTable;
                let zakNo = this.$store.state.orders.currentOrderId;
                let guests = this.$store.state.guestsCount;
                let numTablet = '05';

                let optionsAdd = {
                    'cmd_garson': 'ADD', numTablet, usrID, table, zakNo, guests,
                    'rows': this.populateOrderStrings(this.usrID, this.$store.state.currentTable), uuid
                };

                let optionsRec = {
                    'cmd_garson': 'REC', numTablet, zakNo, usrID, table, guests, uuid
                }
                //this.$f7.hidePreloader();
                this.axios.get(this.apiUrl.url, {params: optionsAdd})
                    .then((resp) => {
                        let response = {};
                        if (resp && resp.data && resp.data[0] && resp.data[0].str1 && resp.data[0].str1[0]){
                            response = resp.data[0].str1[0];
                            console.log('Первый THEN');
                            console.log(response);
                            return response;
                        } else {
                            console.log(resp.data);
                            throw new Error(resp.data);

                        }
                    })
                    .then (response=>{
                        console.log('Второй THEN');
                        console.log(response);
                        console.log('Тип ответа: ' + typeof response);
                        console.log(this.$store.state.orders.current);
                        console.log(this.$store.state.orders.current);
                        this.$f7.hidePreloader();
                        if (typeof response === 'object') {
                            this.$router.load({'url':'/tables/', 'reload':true});
                            this.$store.commit('REMOVE_FULL_CURRENT_ORDER');
                            this.$store.commit('SET_PRINTED_ORDER', {printedOrders: []});
                        }
                        //return this.axios.get(this.apiUrl.url, {params: optionsRec});
                    })
                    /*.then (rec=>{
                        console.log('Третий THEN');
                        console.log(rec.data);
                        if (rec && rec.data && rec.data[0] && rec.data[0].str1 && rec.data[0].str1[0] && rec.data[0].str1[0] && rec.data[0].str1[0].answCode === '0'){
                            let currentPrinted = rec.data[0].str2;
                            console.log(currentPrinted);
                            this.$f7.hidePreloader();
                            return currentPrinted;
                        }
                        else {
                            console.log(rec.data);
                            throw new Error(rec.data);
                        }
                    })
                    .then(currentPrinted=>{
                        console.log('Четвертый THEN');
                        console.log(currentPrinted);
                        this.$router.load({'url':'/tables/', 'reload':true});
                        this.$store.commit('REMOVE_FULL_CURRENT_ORDER');
                    })*/
                    .catch((err=>{
                        console.log(err);
                        this.$f7.hidePreloader();
                        this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                    }))
            },

            populateOrderStrings(userId, tableId){
                let orderStrings = '';
                let currentOrder =this.currentOrderByPosition
                console.log(currentOrder);
                if (currentOrder){
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