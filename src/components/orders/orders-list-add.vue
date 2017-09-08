<template>
    <div>

        <template v-if="printed.length > 0">
            <div class="btn-show-printed" @click="setView('printed')" v-if="!this.$store.state.openedPanel.printed">i
            </div>

            <div class="printed-order printed-panel passiv-printed-panel" @click="setView('printed')">
                <div>
                    Отправленный на печать заказ
                    <hr/>
                </div>
                <!--Отправленный на печать заказ

                <hr/>-->
                <!--<f7-grid>
                    <f7-col  width="60">
                        Наименование
                    </f7-col>
                    <f7-col width="7">Количество</f7-col>
                </f7-grid>
                <hr />-->
                <f7-grid v-for="order in printed">
                    <f7-col width="75" class="order-string" :data-id="num_str">
                        <!--{{order.tovar}} / -->{{order.name}}
                        <span v-if="order.kurs > 0"> </span>
                    </f7-col>
                    <f7-col class="order-string" width="25">{{order.count}} x
                        {{order.price}}&#8381;

                    </f7-col>
                </f7-grid>
            </div>
        </template>
        <div class="list-of-orders current-panel passiv-current-panel" @click="setView('current')">
            Текущий заказ

            <hr/>
            <!--<div class="select-view-type">
                <f7-buttons color="gray" class="btns-type-list">
                    <f7-button @click="setViewType('all')">Все</f7-button>
                    <f7-button @click="setViewType('byGuests')">По гостям</f7-button>
                </f7-buttons>
            </div>-->
            <div v-if="showType === 'all'">

                <f7-accordion v-model="testDiv">
                    <template v-for="items in currentOrderByPosition">

                        <f7-accordion-item :key="items.el.code" class="order-string-item">
                            <div @click="setCurrentPayload(items.el)">
                                <v-touch @swipeleft="onSwipeLeft(items)" @swiperight="onSwipeRight(items)">
                                    <f7-accordion-toggle :data-id="items.el.item.code">
                                        <f7-grid>
                                            <f7-col width="75" class="order-string" :data-id="items.el.item.code">
                                        <span>
                                           {{getShortName(items.el.item.name)}}
                                            <template
                                                    v-if="items.el.modsPosition !== '' && items.el.modsPosition !== ' '">
                                                       / <!--{{getModsPositionName(items.el.modsPosition)}}-->M1
                                            </template>
                                            <template v-if="items.el.modsCommon !== '' && items.el.modsCommon !== ' '">
                                                       / <!--{{getModsCommonName(items.el.modsCommon)}}-->MO
                                            </template>
                                             <template
                                                     v-if="items.el.course !== 0 && items.el.course !== ' ' && items.el.course !== ''">
                                                       /
                                                 <!--{{getModsCommonName(items.el.modsCommon)}}-->К.{{items.el.course}}
                                            </template>
                                        </span>
                                            </f7-col>
                                            <!--<f7-col class="order-string" width="3">{{items.count}}</f7-col>
                                            <f7-col class="order-string" width="3">X</f7-col>
                                            <f7-col class="order-string" width="14">{{items.el.item.price}}&#8381;</f7-col>-->
                                            <f7-col class="order-string nowrap" width="25">{{items.count}} x
                                                {{items.el.item.price}}&#8381;

                                            </f7-col>
                                        </f7-grid>
                                    </f7-accordion-toggle>
                                </v-touch>
                            </div>
                            <f7-accordion-content>
                                <buttons-panel :items="items.el" :count="items.count" :it="items"/>
                            </f7-accordion-content>
                        </f7-accordion-item>
                    </template>
                </f7-accordion>
            </div>
            <div v-else-if="showType === 'byGuests'">
                <!-- В разрезе гостей-->
                <f7-accordion>
                    <f7-accordion-item :key="n" v-for="n in getGuestsCount" :data-main-id="n" class="guest-item">
                        <f7-accordion-toggle class="guest-number-string" :data-id="n">
                            <div @click="selectGuest(n)" class="guest-string">Гость {{n}}</div>
                        </f7-accordion-toggle>
                        <f7-accordion-content class="guest-order-string">
                            <br/>
                            <f7-accordion>
                                <template v-for="items in currentOrderForCurrentGuest">
                                    <div @click="setCurrentPayload(items.el)">
                                        <f7-accordion-item :key="items.el.code" class="order-string-item">
                                            <f7-accordion-toggle>
                                                <f7-grid>
                                                    <f7-col width="60" class="order-string"
                                                            :data-id="items.el.item.code">
                                                    <span>{{items.el.item.name}}
                                                     {{items.el.item.modsPosition}}
                                                       <template
                                                               v-if="items.el.modsPosition !== '' && items.el.modsPosition !== ' '">
                                                                   / {{getModsPositionName(items.el.modsPosition)}}
                                                        </template>
                                                        <template
                                                                v-if="items.el.modsCommon !== '' && items.el.modsCommon !== ' '">
                                                                   / {{getModsCommonName(items.el.modsCommon)}}
                                                        </template>
                                                    </span>
                                                    </f7-col>
                                                    <f7-col class="order-string" width="7">{{items.count}}</f7-col>
                                                    <f7-col class="order-string" width="4">X</f7-col>
                                                    <f7-col class="order-string" width="12">{{items.el.item.price}} руб.

                                                    </f7-col>
                                                </f7-grid>
                                            </f7-accordion-toggle>
                                            <f7-accordion-content>
                                                <buttons-panel :items="items.el" :count="items.count" :it="items"/>
                                            </f7-accordion-content>
                                        </f7-accordion-item>
                                    </div>
                                </template>
                            </f7-accordion>

                        </f7-accordion-content>
                    </f7-accordion-item>
                </f7-accordion>
            </div>
        </div>
        <f7-block class="summary">
            Сумма: <span class="sum">{{getSumAmount}} руб.</span>

        </f7-block>
        <!--<f7-block class="summary">
            <p class="buttons-row bottom-buttons">
                <a href="#" class="button  button-raised ">Отменить</a>
                <a href="#" class="button button-raised" @click="print()">Отправить на печать</a>
            </p>
        </f7-block>
        <p>
            <f7-link href="#" class="print-order-btn">Отправить на печать</f7-link>
        </p>-->

        <f7-block>
            <category/>
        </f7-block>


    </div>
    <print-order/>

</template>
<style scoped lang="less">
    .btn-show-printed {
        width: 50px;
        height: 50px;
        background-color: lightgrey;
        position: absolute;
        right: 0;
        border-radius: 50%;
        line-height: 50px;
        font-size: 20pt;
        font-weight: 900;
        border: 2px solid;
        cursor: pointer;
    }

    .list-of-orders {
        background-color: #fafafa;
        width: 100%;
        min-height: 180px;
        /*max-height: 500px;*/
        overflow-y: scroll;
        font-size: 14pt;
        .select-view-type {
            width: 100%;
            text-align: right;
            padding: 10px 10px 10px 0px;
            .btns-type-list {
                width: 40%;
                display: inline-flex;
            }
        }
        .printed-order {
            overflow: scroll;
            /*max-height: 180px;*/
            color: black;
            font-size: 12pt;
        }

        .order-string {
            text-align: left;
            padding: 15px;
            color: black;
        }
        .nowrap {
            white-space: nowrap;
        }
        .guest-number-string {
            border-top: 1px solid gray;
        }
        .guest-order-string {
            width: 100%;
            background-color: #ffffff;
            overflow: scroll;

        }
        .guest-string {
            background-color: lightgrey;
            height: 40px;
            display: block;
            line-height: 40px;
        }

        .active-printed-panel {
            background-color: #DCDFEB;
            height: 450px;
        }

        .passiv-printed-panel {
            background-color: #DCDFEB;
            font-size: 12pt;
            /* height: 80px;*/
            height: 0;
        }

        .active-current-panel {
            background-color: #fafafa;
            height: 650px;

        }

        .passiv-current-panel {
            background-color: #fafafa;
            height: 180px;

        }
    }

    .summary {
        width: 100%;
        text-align: left;
        margin: 10px 0;
        font-size: 17pt;
        font-weight: 900;
        .sum {
            color: red;
        }
    }


</style>
<script>
    import category from './list-of-ctgs.vue';
    import panel from './buttons-panel.vue';

    export default {
        data() {
            return {
                name: 'this component',
                showBottomMenu: true,
                showType: 'all',
                //showType: 'byGuests',
                firstTime: false,
                testDiv: ''
            }
        },
        watch: {
            testDiv: function(){
                console.log('DIV change');
            },
            activePanel: function (val) {
                this.setActivePanelSize(val);
            },
            currentOrdersAll: function (val) {
                console.log('Прокручиваем скролл вниз');
                this.scrollToBottom();
            }
        },
        computed: {
            activePanel: function () {
                return this.$store.state.openedPanel.status;
            },
            getSumAmount: function () {
                return this.$store.state.orders.summary;
            },
            getGuestsCount: function () {
                return this.$store.state.guestsCount;
            },
            printed: function () {
                let curOrderItem = {};
                let printedView = _.map(this.$store.state.orders.printed, item => {
                    curOrderItem = _.filter(this.$store.state.SourceMenu.items, {'code': item.tovar});
                    if (curOrderItem.length > 0) {
                        if (curOrderItem && curOrderItem[0] && curOrderItem[0].name) {
                            item.name = curOrderItem[0].name;
                            return item;
                        }
                    }
                });
                printedView = _.filter(printedView, item => {
                    return (typeof item === 'object')
                });
                return printedView;
            },

            currentOrdersAll: function () {
                let filtered = _.filter(this.$store.state.orders.current, (item) => {
                    return item.tableId === this.$store.state.currentTable && item.isHeader === true;
                });
                if (filtered.length === 0) return;
                if (filtered.length > 1) {
                    let groupByProps = [];
                    groupByProps.push({el: filtered[0], count: filtered[0].currentCount});
                    for (let idx = 1; idx < filtered.length; idx++) {
                        for (let innerIdx = 0; innerIdx < groupByProps.length; innerIdx++) {
                            if (
                                filtered[idx].item.code === groupByProps[innerIdx].el.item.code &&
                                filtered[idx].course === groupByProps[innerIdx].el.course &&
                                filtered[idx].guestId === groupByProps[innerIdx].el.guestId &&
                                filtered[idx].tableId === groupByProps[innerIdx].el.tableId &&
                                filtered[idx].waiterId === groupByProps[innerIdx].el.waiterId &&
                                filtered[idx].modsPosition === groupByProps[innerIdx].el.modsPosition &&
                                filtered[idx].currentCount === groupByProps[innerIdx].el.currentCount &&
                                filtered[idx].isHeader === true &&
                                filtered[idx].modsCommon === groupByProps[innerIdx].el.modsCommon
                            ) {
                                groupByProps[innerIdx].count += groupByProps[innerIdx].el.currentCount;
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
                    console.log(filtered[0]);
                    return [{el: filtered[0], count: filtered[0].currentCount}];
                }
            },
            currentOrderByPosition() {
                let filtered = _.filter(this.$store.state.orders.current, (item) => {
                    return item.tableId === this.$store.state.currentTable && item.isHeader === true;
                });
                if (filtered.length === 0) return;
                if (filtered.length > 1) {
                    let groupByProps = [];
                    groupByProps.push({el: filtered[0], count: filtered[0].currentCount});
                    for (let idx = 1; idx < filtered.length; idx++) {
                        for (let innerIdx = 0; innerIdx < groupByProps.length; innerIdx++) {
                            if (
                                filtered[idx].item.code === groupByProps[innerIdx].el.item.code &&
                                filtered[idx].course === groupByProps[innerIdx].el.course &&
                                //filtered[idx].guestId === groupByProps[innerIdx].el.guestId &&
                                filtered[idx].tableId === groupByProps[innerIdx].el.tableId &&
                                filtered[idx].waiterId === groupByProps[innerIdx].el.waiterId &&
                                filtered[idx].modsPosition === groupByProps[innerIdx].el.modsPosition &&
                                filtered[idx].currentCount === groupByProps[innerIdx].el.currentCount &&
                                filtered[idx].isHeader === true &&
                                filtered[idx].modsCommon === groupByProps[innerIdx].el.modsCommon
                            ) {
                                groupByProps[innerIdx].count += groupByProps[innerIdx].el.currentCount;
                                break;
                            } else {
                                if (innerIdx === groupByProps.length - 1) {
                                    groupByProps.push({el: filtered[idx], count: filtered[idx].currentCount});
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
                    return [{el: filtered[0], count: filtered[0].currentCount}];
                }
            },
            currentOrderForCurrentGuest: function () {
                const self = this;
                if (1 === 1) { // поставим проверки на существование
                    let filtered = _.filter(this.currentOrdersAll, (item) => {
                        return item.el.guestId === this.$store.state.currentGuest
                    });
                    if (filtered.length === 0) {
                        this.firstTime = true;
                    } else {
                        if (this.firstTime) {
                            setTimeout(() => {
                                self.openGuest(self.$store.state.currentGuest);
                            }, 0);
                            return filtered;
                        }
                    }
                    return filtered;
                }
            }
        },
        mounted() {
            console.log('Текущая страница!!');
            console.log(this.$store.state.pages);
            console.log('Очищаем интервал ', this.$store.state.intervals.updateUserTables);
            clearInterval(this.$store.state.intervals.updateUserTables);
            this.openGuest(1);
            this.setHandlers();
            this.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': 'menu'});

        },
        methods: {
            onSwipeLeft(item) {
                this.$store.dispatch('REMOVE_POSITION_FROM_ORDER', item.el);
            },
            onSwipeRight(item) {
                this.$store.dispatch('ADD_POSITION_TO_ORDER', item.el);
            },
            onSwipeUp() {
                this.setView('menu');
                console.log('up');
            },
            onSwipeDown() {
                this.setView('current');
                console.log('up');
            },
            scrollToBottom() {
                let currentPanel = this.$$('.current-panel')[0];
                setTimeout(()=>{
                    currentPanel.scrollTop = currentPanel.scrollHeight + 40;
                }, 100);
            },

            setView(currentType) {
                this.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': currentType});
                console.log(currentType);
            },

            setViewType(type) {
                this.showType = type;
                const self = this;
                if (type === 'byGuests') {
                    setTimeout(() => {
                        self.openGuest(1);
                        self.setHandlers();
                    }, 0);
                }
                if (type === 'all') {
                    this.$store.commit('SET_CURRENT_GUEST', {
                        'currentGuest': 1, 'callback': () => {
                            console.log('openView')
                        }
                    });
                }
            },
            setHandlers() {
                const self = this;
                this.$$('.accordion-item.guest-item').on('accordion:open', function (el) {
                    let currentGuest = el.target.firstChild.dataset.id;
                    if (!isNaN(currentGuest)) {
                        //self.$store.commit('SET_CURRENT_GUEST', {'currentGuest': currentGuest, 'callback':()=>{console.log('openTab')}});
                    }
                });
                this.$$('.accordion-item.guest-item').on('accordion:closed', function (el) {

                    let selected = self.$$('.accordion-item.guest-item.accordion-item-expanded');
                    if (selected.length === 0) {
                        self.openGuest(1);
                    }
                });
            },
            openGuest(guestId) {
                let el = this.$$('.accordion-item[data-main-id="' + guestId + '"]');
                if (!this.$store.state.currentGuest || this.$store.state.currentGuest === 0) {
                    this.$store.commit('SET_CURRENT_GUEST', {
                        'currentGuest': guestId, 'callback': () => {
                            console.log('openGuest')
                        }
                    });
                }
                if (el.length > 0) {
                    this.$f7.accordionOpen(el);
                }
            },
            closePicker() {
                this.showBottomMenu = false;
            },
            selectGuest(num) {
                const self = this;
                this.$store.commit('SET_CURRENT_GUEST', {
                    'currentGuest': num, 'callback': function () {
                        console.log('Установлен текущий гость №' + num);
                    }
                });
            },
            getModsPositionName(code) {
                let res = _.find(this.$store.state.modsPosition, (mod) => {
                    return mod.code === code;
                });

                return res ? res.name : '';
            },
            getModsCommonName(code) {
                let res = _.find(this.$store.state.modsCommon, (mod) => {
                    return mod.code === code;
                });

                return res ? res.name : '';
            },

            getShortName(name) {
                let res = '';
                if (name.length > 30) {
                    res = name.substring(0, 30) + '...';
                } else {
                    res = name;
                }
                return res;
            },
            setCurrentPayload(item) {
                this.$store.commit('SET_CURRENT_PAYLOAD', item);
            },

            setActivePanelSize(type) {
                let currentPanel = this.$$('.current-panel');
                let printedPanel = this.$$('.printed-panel');


                // Выбрана текущая панель
                if (this.$store.state.openedPanel.current) {
                    currentPanel.removeClass('passiv-current-panel').addClass('active-current-panel');
                    printedPanel.removeClass('active-printed-panel').addClass('passiv-printed-panel');
                    //console.log('Выбрана текущая панель');
                }
                //Выбрана панель напечатанного заказа
                else if (this.$store.state.openedPanel.printed) {
                    currentPanel.removeClass('active-current-panel').addClass('passiv-current-panel');
                    printedPanel.removeClass('passiv-printed-panel').addClass('active-printed-panel');
                    //console.log('Выбрана панель напечатанного заказа');
                    this.scrollToBottom();
                }
                // Выбрана панель меню
                else if (this.$store.state.openedPanel.menu) {
                    currentPanel.removeClass('active-current-panel').addClass('passiv-current-panel');
                    printedPanel.removeClass('active-printed-panel').addClass('passiv-printed-panel');
                    this.scrollToBottom();
                }

            }
        },
        components: {
            category,
            'buttons-panel': panel
        }
    }




</script>