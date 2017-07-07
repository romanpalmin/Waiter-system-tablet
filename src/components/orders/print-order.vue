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
            return{
                name:'this component',
                errCount: 0,
                maxErrCount: 2,
                timeouts:{
                    repeatTry: 2000
                },
                apiUrl: {
                    'testNewOrder': 'https://yesno.wtf/api/',
                    'testAddOrder': 'https://httpbin.org/get'
                }
            }
        },
        mounted(){
            this.handlers();
        },
        methods:{
            handlers(){
                this.$$('.print-order').on('click', ()=>{this.printOrder()});
                this.$$('.load-to-ls').on('click', ()=>{this.loadToLs()});
                this.$$('.load-from-ls').on('click', ()=>{this.loadFromLs()});
                this.$$('.remove-from-ls').on('click', ()=>{this.removeFromLs()});
                this.$$('.clear-ls').on('click', ()=>{this.clearLs()});
            },

            printOrder(){
                this.addNewOrder({'order': 'test'});
                this.$f7.showPreloader('Печать стола №' + this.$store.state.currentTable);
            },

            addNewOrder(params){
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
                    .then((data)=>{
                        this.addOrder(data);
                    })
                    .catch((err)=>{
                        console.log(err);
                        if (this.errCount < this.maxErrCount){
                            this.errCount++;
                            setTimeout(()=>{
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
                    .then((resp)=>{
                        /** генерация тестовой ошибки
                        throw new Error('Ошибка добавления заказа');
                        */
                        console.log('Добавлены строки:');
                        console.log(resp.data);
                        this.$f7.hidePreloader();
                        this.errCount = 0;
                        })
                    .catch((err)=>{
                        console.log(err);
                        if (this.errCount < this.maxErrCount){
                            this.errCount++;
                            setTimeout(()=>{
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