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
                    <div @click="addPositionToOrder(item)"  class="no-fastclick">
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
    </div>
</template>
<style scoped lang="less">
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

</style>
<script>
    export default{
        data(){
            return {
                currentList: [],
                name: 'this component',
                showList: true
            }
        },
        props: ['CurrentPositionsList'],
        watch:{

        },
        methods: {
            getShowViewStyle(){
                console.log('changeStyle');
                let style = 'margin-top: ';
                style += this.showList ? '-35px' : '0px';
                return style;
            },
            setShowType(type){
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
            getStyle(item){
                let url = 'http://10.10.182.11/images/' + item.urlImage;
                let style = `;background-image: url(${url});`;
                return style;
            },
            getName(item){
                return item.name_ru;
            },
            addPositionToOrder(item){
                if (this.$store.state.currentGuest && this.$store.state.currentGuest > 0) {
                    let payload = {
                        item: item,
                        course: 0,
                        waiterId: this.$store.state.waiter.id,
                        tableId: this.$store.state.currentTable,
                        guestId: this.$store.state.currentGuest,
                        modsPosition: '',
                        modsCommon: ' ',
                        ts: Date.now()
                    };
                    if (item.mod !== null) {
                        this.alertMods(item.mod, (res) => {
                            payload.modsPosition = res;
                            this.$store.dispatch('ADD_POSITION_TO_ORDER', payload);
                        });
                    } else {
                        this.$store.dispatch('ADD_POSITION_TO_ORDER', payload);
                    }
                }
            },
            alertMods(id, callback){
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
            alertComplects(id){
                console.log('test');
            }
        },
        mounted(){
            this.currentList = this.CurrentPositionsList;
        }
    }

</script>