<template>
    <div>
        <f7-block>
            <div class="list-of-tables">
                <div class="table" v-for="table in list">
                    <!--<f7-link :href="nextLink">-->
                    <f7-link>
                        <div class="table-image" :style="getStyle(table.status)" @click="selectTable(table)">
                            <f7-badge>{{table.status}}</f7-badge>
                        </div>
                    </f7-link>
                    <div class="table-title">Стол №{{table.table}}</div>

                </div>
            </div>
        </f7-block>
    </div>
</template>
<style scoped lang="less">
    .list-of-tables {
        max-height: 600px;
        overflow: scroll;
        .table {
            /*width: 70px;*/
            height: 69px;
            float: left;
            margin: 15px;
            .table-image {
                border: 1px solid gray;
                width: 60px;
                height: 60px;
                background-size: cover;
                background: url(http://10.10.182.11/ept/waiter-tablet/images/table.png);
                border-radius: 20px;
            }
            .title {
                border: 2px solid gray;
                width: 100%;
                height: 100%;
                font-size: smaller;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                name:'Список столов',
                currentList: [],
                nextLink: '',
                usrID: this.$store.state.waiter.id,
                url: this.$store.getters.apiUrl
            }
        },
        mounted(){
        },
        props: ['list'],
        methods:{
            selectTable(table){
                if (this.$store.state.pages.addorder){
                    console.log('Создаем новый стол');
                    this.$f7.showPreloader('Открытие стола №' + table.table);
                    this.addNewOrder(table);
                } else {
                    console.log('Переходим в редактирование');
                    this.editOrder(table);
                }

            },

            getStyle(status){
                let res = ';background-color: ';
                let color = '';
                switch (status){
                    case 0:
                        color = 'green';
                        break;
                    case 1:
                        color = 'blue';
                        break;
                    case 2:
                        color = 'black';
                        break;
                    case 5:
                        color = 'yellow';
                        break;
                    default:
                        break;
                }
                res += color + ';';
                return res;
            },

            editOrder(table){
                this.$store.commit('SET_CURRENT_TABLE', {'tableId': table.table});
                this.$store.commit('SET_CURRENT_ORDER_ID', {'orderId': table.zakNo});
                this.$router.load({'url':'/add-order/', 'reload':true});
            },

            addNewOrder(table){
                let url = this.url;
                let options = {
                    'cmd_garson' : 'NEW',
                    'table' : table.table,
                    'numTablet' : this.$store.state.tabletNumber,
                    'usrID' : this.usrID,
                    'guests' : 1,
                    'uuid' : '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7',
                    'zakNo' : ''
                };
                this.axios.get(url, {params: options})
                    .then((resp) => {
                        /** генерация тестовой ошибки
                         throw new Error('Ошибка добавления заказа');
                         */
                        console.log('Добавлены строки:');
                        console.log(resp.data);

                        this.checkForAnswerCode(resp.data, table);
                    })
                    .catch((err) => {
                        this.$f7.hidePreloader();
                        console.log('Ошибка создания заказа: ' + err);
                        if (this.$store.state.settings.isDebug){
                            if (table.status && table.status === 1) {
                                let debugOrderId = 111;
                                this.nextPage(table.table, debugOrderId);
                            }
                        } else { // что то пошло не так, проверяем наличие заказа на столе
                            this.checkOrderInTables(table.id);
                        }
                    });
            },

            /**
                Проверяем код ответа, в зависимости от кода ответа выбираем действие
            */
            checkForAnswerCode(data, table){
                console.log(data);
                const resp = data[0].str1[0];
                console.log(resp);
                if (data[0] && resp && resp.answCode){
                    switch (resp.answCode){
                        case '0': // Все ок
                            this.nextPage(table.table, resp.zakaz);
                            break;
                        case '13': // На данном столе уже открыт заказ
                            this.$f7.hidePreloader();
                            this.$f7.alert(`Код ошибки: ${resp.answCode} : ${resp.answText}`, 'Ошибка!');
                            break;
                        default:  // что то пошло не так, проверяем наличие заказа на столе
                            this.checkOrderInTables(table.table);
                            break;
                    }
                } else { // что то пошло не так, проверяем наличие заказа на столе
                    this.checkOrderInTables(table.table);
                }
            },

            /**
                В случае успеха сохраняем номер заказа, номер  стола, скрываем прелоадер переходим на следующую страницу
            */
            nextPage(tableId, orderId){
                console.log('Новый заказ: ' + orderId);
                console.log('Стол: ' + tableId);
                this.$f7.hidePreloader();
                this.$store.commit('SET_CURRENT_TABLE', {'tableId': tableId});
                this.$store.commit('SET_CURRENT_ORDER_ID', {'orderId': orderId});
                this.$router.load({'url':'/guest-count/', 'reload':true});
            },

            /**
                Проверяем, не создался ли заказ для данного стола
            */
            checkOrderInTables(table){
                let url = this.url;
                let options = {
                    'cmd_garson' : 'getTableSt',
                    'numTablet' : this.$store.state.tabletNumber,
                    'usrID' : this.usrID,
                    'table' : table,
                    'guests' : 1,
                    'uuid' : '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7'
                };

                this.axios.get(url, {params: options})
                    .then((resp)=>{
                        this.$f7.hidePreloader();
                        if (resp.data.length > 0){
                            let res = _.find(resp.data, (item)=>{
                                return (item.table === +table && item.garson === +this.usrID)
                            });
                            console.log(res);
                            // если найден заказ по заданным столу и официанту, считаем, что все ок, переходим на следующую страницу
                            if (res && res.zakNo && res.zakNo > 0){
                                this.nextPage(table, res.zakNo);
                            } else { // в противном случае выводим ошибку
                                this.$f7.hidePreloader();
                                this.$f7.alert(`Не удалось открыть стол №:${table}`, 'Ошибка!');
                            }
                        }
                    })
                    .catch((err) => {
                        this.$f7.hidePreloader();
                        this.$f7.alert(`Текст ошибки: ${err}`, 'Ошибка!');
                    });
            }
        }

    }
</script>