<template>
    <div>
        <div class="show-type-block" :style="getShowViewStyle()">
            <button class="btn btn-by-list" @click="setShowType('byList')"></button>
            <button class="btn btn-by-icons" @click="setShowType('byIcons')"></button>
        </div>
        <div>
            <div v-if="!showList"> <!-- иконками -->
                <f7-block v-for="item in currentList" class="position-item" @click="addPositionToOrder(item)"
                          :key="item.code">
                    <div @click="addPositionToOrder(item)" class="no-fastclick">
                        <f7-card class="card">
                            <f7-card-content class="img-wrapper" :inner="false" :style="getStyle(item)">
                                <!--<span class="price-wrapper">{{item.price}} руб.</span>-->
                                <f7-badge color="black">{{item.price}} руб.</f7-badge>
                            </f7-card-content>
                            <f7-card-footer><span>{{getName(item)}}</span></f7-card-footer>
                        </f7-card>
                    </div>
                </f7-block>
            </div>
            <div v-else-if="showList">  <!-- списком -->
                <f7-list>
                    <f7-list-item v-for="item in currentList"
                                  :key="item.code"
                                  :title="item.name"
                                  :data-id="item.code"
                                  @click="addPositionToOrder(item)"
                                  class="no-fastclick">
                        {{item.price}} руб.

                    </f7-list-item>
                </f7-list>
            </div>
        </div>

        <div class="popup popup-complect">
            <div class="content-block">
                <f7-block-title>Формирование комплексного заказа</f7-block-title>

                <div class="list-of-positions">
                    <f7-list>
                        <template v-for="(item, index) in complected">
                            <template v-if="item.items.length===1">
                                <f7-list-item :title="item.name">{{item.selected.name_RU}}</f7-list-item>
                            </template>
                            <template v-if="item.length > 1">
                                <f7-list-item :title="item.name" @click="openSubmenu(item.name)">
                                    <f7-link v-if="!item.selected">Выбрать</f7-link>
                                    <f7-link v-if="item.selected">{{item.selected.name_RU}}</f7-link>
                                </f7-list-item>
                            </template>
                        </template>
                    </f7-list>
                </div>
                <p class="buttons-row bottom-buttons">
                    <a href="#" class="button  button-big  button-raised close-popup">Отменить</a>
                    <a href="#" class="button button-big  button-raised  close-popup"
                       :disabled="!isEnabledComplectAcceptButton" @click="submitComplectPosition">Подтвердить</a>
                </p>
            </div>

        </div>
    </div>

</template>
<style scoped lang="less">
    .bottom-buttons {
        position: absolute;
        bottom: 50px;
        width: 95%;
    }

    .show-type-block {
        .btn {
            width: 30px;
            height: 30px;
            background-repeat: no-repeat;
            background-size: cover;
            margin: 2px 0 0 0;
            &-by-list {
                background-image: url(http://10.10.182.11/ept/waiter-tablet/images/byList.png);
            }
            &-by-icons {
                background-image: url(http://10.10.182.11/ept/waiter-tablet/images/byIcons.png);
            }
        }

        background-color: #00d449;
        float: right;
        position: relative;
        width: 100%;
        text-align: right;
        height: 0;
        padding-right: 15px;
    }

    .position-item {
        background-color: #CFD5DA;
        width: 130px;
        float: left;
        height: 150px;
        .img-wrapper {
            width: 105px;
            height: 105px;
            border: 3px solid #636357;
            border-radius: 20%;
            background-size: cover;
            text-align: right;
            .price-wrapper {
                font-weight: bolder;
                color: #000;
                background-color: #fff;
                border-radius: 20%;
                padding: 3px;
            }
        }
        .card {
            background-color: #fafafa
        }

        .card-footer {
            text-align: center;
            display: block;
            color: #000;
        }

    }

    .modal.modal-in {
        width: 370px;
        margin-left: -185px;
    }

    .row-consist {
        width: 100%;
        padding: 5px;
        font-weight: bolder;
        border-bottom: 1px solid;
    }

    .button-consist {
        width: 100%;
    }

</style>
<script>
    export default {
        data() {
            return {
                currentList: [],
                name: 'this component',
                showList: true,
                complect: [],
                currentSelect: [],
                sourceComplect: []
            }
        },
        props: ['CurrentPositionsList'],
        watch: {
        },
        computed: {
            complected: function () {
                return this.complect;
            },
            isEnabledComplectAcceptButton: function () {
                let res = true;
                for (let i = 0; i < this.complect.length; i++) {
                    if (this.complect[i].selected === false) {
                        res = false;
                        return res;
                    }
                    if (i === this.complect.length - 1) {
                        return res;
                    }
                }
            }
        },
        methods: {
            getShowViewStyle() {
                let style = 'margin-top: ';
                style += this.showList ? '-35px' : '0px';
                return style;
            },
            setShowType(type) {
                switch (type) {
                    case 'byList':
                        this.showList = true;
                        console.log(this.showList);
                        break;
                    case 'byIcons':
                        this.showList = false;
                        console.log(this.showList);
                        break;
                    default:
                        this.showList = true;
                        console.log(this.showList);
                        break;
                }
            },
            getStyle(item) {
                let url = 'http://10.10.182.11/images/' + item.urlImage;
                let style = `;background-image: url(${url});`;
                return style;
            },
            getName(item) {
                return item.name_ru;
            },

            addOrderFromTablet(){
                if (!this.CurrentPositionsList) {
                    console.log('Закрытие окна загрузки, проверка и попытка добавить');
                    if (this.$store.state.orders.loadedFromTablet.length > 0){
                        let orderFromTablet = [];
                        orderFromTablet = this.$store.state.orders.loadedFromTablet;
                        console.log('Добавляем массив');
                        console.log(orderFromTablet);
                        console.log('и очищаем его по завершению');
                        _.forEach(orderFromTablet, item => {
                            if (item){
                                this.addPositionToOrder(item, false, false);
                            }
                        });
                        this.$store.commit('SET_LOADED_FROM_TABLET_ORDER', {'loaded':[]});
                    }
                }
            },

            addPositionToOrder(item, withMods = true, withComplects = true) {
                if (this.$store.state.currentGuest && this.$store.state.currentGuest > 0) {
                    let payload = {
                        item: item,
                        course: 0,
                        waiterId: this.$store.state.waiter.id,
                        tableId: this.$store.state.currentTable,
                        guestId: this.$store.state.currentGuest,
                        modsPosition: '',
                        modsCommon: ' ',
                        ts: Date.now(),
                        isHeader: true
                    };
                    if (item.mod !== null && withMods) {
                        this.alertMods(item.mod, (res) => {
                            payload.modsPosition = res;
                            this.$store.dispatch('ADD_POSITION_TO_ORDER', payload);
                        });
                    } else {
                        if (item.complect && item.complect[0] && item.complect[0].code2 !== null && withComplects) {
                            this.alertComplects(item);
                        } else {
                            this.$store.dispatch('ADD_POSITION_TO_ORDER', payload);
                        }
                    }
                }
            },
            alertMods(id, callback) {
                let buttons = [];
                let selectedMods = _.filter(this.$store.state.modsPosition, (item) => {
                    return +item.code.substring(0, 2) === +id;
                });
                buttons = _.map(selectedMods, (item) => {
                    var button = {};
                    button.text = item.name;
                    button.onClick = () => {
                        if (callback && typeof(callback) === "function") {
                            callback(item.code);
                        }
                        return item.code;
                    };
                    return button;
                });

                this.$f7.modal({
                    title: 'Выберите модификатор',
                    text: 'Выберите модификатор товара',
                    verticalButtons: true,
                    buttons
                })
            },

            alertComplectsSubmenu(index, callback) {
                let buttons = [];
                let res = _.find(this.complect, (item) => {
                    return item.name === index;
                });
                buttons = _.map(res.items, item => {
                    var button = {};
                    button.text = item.name_RU;
                    button.onClick = () => {
                        if (callback && typeof(callback) === "function") {
                            callback(item);
                        }
                        return item;
                    };
                    return button;
                });

                this.$f7.modal({
                    title: 'Выберите товар',
                    text: 'Выберите товар',
                    verticalButtons: true,
                    buttons
                })
            },

            alertComplects(item) {
                console.log(item);
                console.log(item.complect);
                this.sourceComplect = item;
                let groupped = _.groupBy(item.complect, 'groupName');
                console.log(groupped);

                this.complect = _.map(groupped, (item, index, arr) => {
                    if (item.length === 1) {
                        item.selected = item[0];
                    } else {
                        item.selected = false;
                    }
                    item.name = index;
                    item.items = arr[index];
                    return item;
                });
                console.log(this.complect);
                this.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': 'current'});
                this.$f7.popup('.popup-complect');

            },
            openSubmenu(index) {
                let res = _.find(this.complect, (item) => {
                    return item.name === index;
                });
                this.alertComplectsSubmenu(index, (result) => {
                    this.complect = _.map(this.complect, item => {
                        if (item.name === index) {
                            item.selected = result;
                        }
                        return item;
                    });
                });
                console.log(this.complect);
                console.log(this.isEnabledComplectAcceptButton);

            },

            submitComplectPosition() {
                if (this.isEnabledComplectAcceptButton) {
                    var payload = {
                        item: this.sourceComplect,
                        course: 0,
                        waiterId: this.$store.state.waiter.id,
                        tableId: this.$store.state.currentTable,
                        guestId: this.$store.state.currentGuest,
                        modsPosition: '',
                        modsCommon: ' ',
                        ts: Date.now(),
                        isHeader: true
                    };
                    this.$store.dispatch('ADD_POSITION_TO_ORDER', payload);

                    _.forEach(this.complect, (item, index, arr) => {
                        const payload = {
                            item: item.selected,
                            course: 0,
                            waiterId: this.$store.state.waiter.id,
                            tableId: this.$store.state.currentTable,
                            guestId: this.$store.state.currentGuest,
                            modsPosition: '',
                            modsCommon: ' ',
                            ts: Date.now(),
                            isHeader: false
                        };
                        /*payload.isHeader = false;
                        payload.item = item.selected;*/
                        console.log(payload.item);
                        this.$store.dispatch('ADD_POSITION_TO_ORDER', payload);
                    });
                    console.log(this.$store.state.orders.current);
                }
            }
        },
        mounted() {
            this.currentList = this.CurrentPositionsList;
            this.$$('.select-tablet').on('popup:closed', () => {
                this.addOrderFromTablet();
            });
        }
    }


</script>