<template>
    <div>
        <f7-block>
            <div class="list-of-tables" @click="selectTable(0)">
                <div class="table" v-for="table in list">
                    <!--<f7-link :href="nextLink">-->
                    <f7-link>
                        <div class="table-image" :style="getStyle(table)" @click="selectTable(table)"
                             :data-id="table.table">
                            <f7-badge>{{table.status}}</f7-badge>
                        </div>
                    </f7-link>
                    <div class="table-title">№{{table.table}}</div>
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
                width: 55px;
                height: 54px;
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
            .pressed {
                box-shadow: -5px -5px grey;
                margin-top: 5px;
                margin-left: 5px;
            }
        }

    }
</style>
<script>
    import blocker from './helpers/table-blocker.js';
    import ajax from './helpers/ajax';

    export default {
        data() {
            return {
                name: 'Список столов',
                currentList: [],
                nextLink: '',
                usrID: this.$store.state.waiter.id,
                url: this.$store.getters.apiUrl,
                pressed: {
                    isPressed: false,
                    tableId: null,
                    zakNo: null
                },
                currentInterval: 0
            }
        },
        watch: {
            showPanel: function () {
                if (this.showPanel === false) {
                    this.$$('.pressed').removeClass('pressed');
                    this.pressed.tableId = null;
                    this.pressed.zakNo = null;
                    this.pressed.isPressed = false;
                }
            }
        },
        computed: {
            showPanel: function () {
                return this.$store.state.showTableActions;
            }
        },
        mounted() {
        },
        props: ['list'],
        methods: {
            selectTable(table) {
                if ((this.pressed.isPressed && this.pressed.tableId === table.table) || table.status === 0) {
                    //console.log('Второе нажатие на стол');
                    this.$store.commit('SET_SHOW_PRINTER_BTN', false);
                    if (this.$store.state.pages.addorder) {
                        //console.log('Создаем новый стол');
                        this.$f7.showPreloader('Открытие стола №' + table.table);
                        this.addNewOrder(table);
                    } else {
                        //console.log('Переходим в редактирование, если статус 1');
                        if (table.status === 1) {
                            this.editOrder(table);
                        }
                        else {
                            this.$store.commit('SET_SHOW_TABLE_ACTIONS_PANEL', false);
                        }
                    }
                } else {
                    if (table.status === 1 && table.ocupate === 0/*|| table.status === 5*/) {
                        const self = this;

                        function lockTable() {
                            function callback() {
                                self.$store.commit('SET_SHOW_TABLE_ACTIONS_PANEL', true);
                                self.$store.commit('SET_CURRENT_TABLE', {'tableId': table.table});
                                self.$store.commit('SET_CURRENT_ORDER_ID', {'orderId': table.zakNo});
                                self.$$('[data-id="' + table.table + '"]').addClass('pressed');
                                if (table.status === 1) {
                                    self.$store.commit('SET_SHOW_PRINTER_BTN', true);
                                    self.preloadPrinted(table.table, table.zakNo);
                                }
                            }

                            self.pressed.tableId = table.table;
                            self.pressed.isPressed = true;
                            self.pressed.zakNo = table.zakNo;
                            blocker.blockTable({
                                tableId: self.pressed.tableId,
                                zakNo: self.pressed.zakNo,
                                uuid: self.$store.state.settings.uuid,
                                //usrId: self.store.state.waiter.waiterId,
                                callback: callback()
                            })
                        }

                        if (this.pressed.isPressed) {
                            function callback() {
                                self.$$('[data-id="' + self.pressed.tableId + '"]').removeClass('pressed');
                                self.$store.commit('SET_PRELOADED_ORDER', {'preloaded': []});
                                self.$store.commit('SET_SHOW_PRINTER_BTN', false);
                                lockTable();
                            }

                            blocker.unblockTable({
                                tableId: self.pressed.tableId,
                                zakNo: self.pressed.zakNo,
                                uuid: self.$store.state.settings.uuid,
                                //usrId: self.store.state.waiter.waiterId,
                                callback: callback()
                            });
                        } else {
                            lockTable();
                        }
                    } else {
                        if (table.status === 1 && table.ocupate !== 0 && table.garson === this.$store.state.waiter.id) {
                            this.$$('.pressed').removeClass('pressed');
                            this.$store.commit('SET_PRELOADED_ORDER', {'preloaded': []});
                            this.$store.commit('SET_SHOW_TABLE_ACTIONS_PANEL', false);
                            blocker.unblockTable({
                                    tableId: this.pressed.tableId,
                                    zakNo: this.pressed.zakNo,
                                    uuid: this.$store.state.settings.uuid,
                                    callback: () => {
                                        this.pressed.isPressed = false;
                                    }
                                }
                            );

                            this.$f7.confirm(`Разблокировать стол №${table.table}?`, 'Стол заблокирован',
                                () => {
                                    blocker.unblockTable({
                                            tableId: table.table,
                                            zakNo: table.zakNo,
                                            uuid: this.$store.state.settings.uuid,
                                            callback: () => {
                                                this.$router.load({'url': '/tables/', 'reload': true});
                                            }
                                        }
                                    );
                                });
                        }
                    }
                }
            },

            async preloadPrinted(tableId, zakNo) {
                this.$store.commit('SET_SHOW_PRELOADER_SPINNER', true);
                let uuid = this.$store.state.settings.uuid;
                let usrID = this.$store.state.waiter.id;
                let table = tableId;
                let guests = this.$store.state.guestsCount;
                let numTablet = this.$store.state.tabletNumber;
                let optionsRec = {
                    'cmd_garson': 'REC', numTablet, zakNo, usrID, table, guests, uuid
                };

                try {
                    const res = await ajax.getData(optionsRec);
                    let currentPrinted = res.str2 ? res.str2 : [];
                    this.$store.commit('SET_PRELOADED_ORDER', {'preloaded': currentPrinted});
                    this.$store.commit('SET_SHOW_PRELOADER_SPINNER', false);
                }
                catch (err) {
                    this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                    this.$store.commit('SET_SHOW_PRELOADER_SPINNER', false);
                }
            },

            getStyle(table) {
                let res = ';background-color: ';
                let color = '';
                switch (table.status) {
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
                if (table.ocupate !== 0) {
                    color = 'black';
                }
                res += color + ';';
                return res;
            },

            editOrder(table) {
                this.$store.commit('SET_CURRENT_TABLE', {'tableId': table.table});
                this.$store.commit('SET_EDIT_ORDER_PAGE', {'editorder': true});
                this.$store.commit('SET_CURRENT_ORDER_ID', {'orderId': table.zakNo});
                this.$store.commit('SET_SHOW_TABLE_ACTIONS_PANEL', false);
                this.$router.load({'url': '/add-order/', 'reload': true});
            },

            async addNewOrder(table) {
                let optionsNew = {
                    'cmd_garson': 'NEW',
                    'table': table.table,
                    'numTablet': this.$store.state.tabletNumber,
                    'usrID': this.usrID,
                    'guests': 1,
                    'uuid': this.$store.state.settings.uuid,
                    'zakNo': ''
                };
                const res = await ajax.getData(optionsNew);
                if (res) {
                    this.checkForAnswerCode(res, table)
                }
                this.$f7.hidePreloader();
            },

            /**
             Проверяем код ответа, в зависимости от кода ответа выбираем действие
             */
            checkForAnswerCode(data, table) {
                const resp = data.str1[0];
                if (resp.answCode) {
                    switch (resp.answCode) {
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
            nextPage(tableId, orderId) {
                this.$f7.hidePreloader();
                this.$store.commit('SET_CURRENT_TABLE', {'tableId': tableId});
                this.$store.commit('SET_CURRENT_ORDER_ID', {'orderId': orderId});
                this.$router.load({'url': '/guest-count/', 'reload': true});
            },

            /**
             Проверяем, не создался ли заказ для данного стола
             */
            checkOrderInTables(table) {
                let url = this.url;
                let options = {
                    'cmd_garson': 'getTableSt',
                    'numTablet': this.$store.state.tabletNumber,
                    'usrID': this.usrID,
                    'table': table,
                    'guests': 1,
                    'uuid': '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7'
                };

                this.axios.get(url, {params: options})
                    .then((resp) => {
                        this.$f7.hidePreloader();
                        if (resp.data.length > 0) {
                            let res = _.find(resp.data, (item) => {
                                return (item.table === +table && item.garson === +this.usrID)
                            });
                            // если найден заказ по заданным столу и официанту, считаем, что все ок, переходим на следующую страницу
                            if (res && res.zakNo && res.zakNo > 0) {
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