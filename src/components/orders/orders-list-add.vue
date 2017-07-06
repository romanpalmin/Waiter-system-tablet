<template>
    <div>
        <div class="list-of-orders">
            <div class="select-view-type">
                <f7-buttons color="gray" class="btns-type-list">
                    <f7-button @click="setViewType('all')">Все</f7-button>
                    <f7-button @click="setViewType('byGuests')">По гостям</f7-button>
                </f7-buttons>
            </div>
            <div v-if="showType === 'all'">
                <f7-accordion>
                    <template v-for="items in currentOrderByPosition">
                        <f7-accordion-item :key="items.el.code">
                            <f7-accordion-toggle>
                                <f7-grid>
                                    <f7-col width="60" class="order-string" :data-id="items.el.item.code">
                                        <span>
                                            {{items.el.item.name}}
                                            <template v-if="items.el.modsPosition !== ''">
                                                      / {{items.el.modsPosition}}
                                            </template>
                                        </span>
                                    </f7-col>
                                    <f7-col class="order-string" width="7">{{items.count}}</f7-col>
                                    <f7-col class="order-string" width="4">X</f7-col>
                                    <f7-col class="order-string" width="12">{{items.el.item.price}} руб.</f7-col>
                                </f7-grid>
                            </f7-accordion-toggle>
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
                                    <f7-accordion-item :key="items.el.code">
                                        <f7-accordion-toggle>
                                            <f7-grid>
                                                <f7-col width="60" class="order-string" :data-id="items.el.item.code">
                                                    <span>{{items.el.item.name}}
                                                     {{items.el.item.modsPosition}}
                                                        <template v-if="items.el.modsPosition !== ''">
                                                             / {{items.el.modsPosition}}
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
                                </template>
                            </f7-accordion>

                        </f7-accordion-content>
                    </f7-accordion-item>
                </f7-accordion>
            </div>
        </div>


        <f7-block class="summary">
            Сумма: {{getSumAmount}} руб.
        </f7-block>
        <f7-block>
            <category/>
        </f7-block>
    </div>


</template>
<style scoped lang="less">
    .list-of-orders {
        background-color: #fafafa;
        width: 100%;
        min-height: 200px;
        max-height: 500px;
        overflow-y: scroll;
        .select-view-type {
            width: 100%;
            text-align: right;
            padding: 10px 10px 10px 0px;
            .btns-type-list {
                width: 40%;
                display: inline-flex;
            }
        }

        .order-string {
            text-align: left;
            padding-top: 15px;
            padding-bottom: 15px;
            padding-left: 15px;
            padding-right: 15px;
        }
        .guest-number-string {
            //background-color: #5ac8fa;
            border-top: 1px solid gray;
        }
        .guest-order-string {
            width: 100%;
            //min-height:20px;
            background-color: #ffffff;
            overflow: scroll;

        }
        .guest-string {
            background-color: lightgrey;
            height: 40px;
            display: block;
            line-height: 40px;
        }

    }

    .summary {
        width: 100%;
        text-align: left;
    }


</style>
<script>
    import category from './list-of-ctgs.vue';
    import panel from './buttons-panel.vue';
    export default{
        data(){
            return {
                name: 'this component',
                showBottomMenu: true,
                //showType: 'all',
                showType: 'byGuests',
                firstTime: false
            }
        },
        computed: {
            getSumAmount: function () {
                return this.$store.state.orders.summary;
            },
            getGuestsCount: function () {
                return this.$store.state.guestsCount;
            },
            currentOrdersAll: function () {
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
                                filtered[idx].guestId === groupByProps[innerIdx].el.guestId &&
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
            },
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
        mounted(){
            this.openGuest(1);
            this.setHandlers();
        },
        methods: {
            setViewType(type){
                this.showType = type;
                const self = this;
                if (type === 'byGuests') {
                    setTimeout(() => {
                        self.openGuest(1);
                        self.setHandlers();
                    }, 0);
                }
                if (type === 'all') {
                    this.$store.commit('SET_CURRENT_GUEST', {'currentGuest': 1, 'callback':()=>{console.log('openView')}});
                }
            },
            setHandlers(){
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
            openGuest(guestId){
                let el = this.$$('.accordion-item[data-main-id="' + guestId + '"]');
                if (!this.$store.state.currentGuest || this.$store.state.currentGuest === 0){
                    this.$store.commit('SET_CURRENT_GUEST', {'currentGuest': guestId, 'callback':()=>{console.log('openGuest')}});
                }
                this.$f7.accordionOpen(el);
            },
            closePicker(){
                this.showBottomMenu = false;
            },
            selectGuest(num){
                console.log('Выбирается гость №' + num);
                const self = this;
                this.$store.commit('SET_CURRENT_GUEST', {
                    'currentGuest': num, 'callback': function () {
                        console.log('Установлен текущий гость №' + num);
                    }
                });
            }
        },
        components: {
            category,
            'buttons-panel': panel
        }
    }



</script>