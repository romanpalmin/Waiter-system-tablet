<template>
    <div>
        <f7-page :cached="false">
            <f7-block>
            </f7-block>
            <f7-block class="come-back">
                <f7-navbar :title="pageTitle" back-link="Отмена" sliding></f7-navbar>
            </f7-block>


            <f7-block-title>Стол №{{tableNumber}}</f7-block-title>
            <f7-block class="simple-input">
                <input type="text" class="simple" :value="currentGuestCount" readonly/>
            </f7-block>
            <div class="component-table">
                <f7-block inner>
                    <table class="phone-table">
                        <tr>
                            <td v-for="n in 3">
                                <f7-button big raised round @click="pressNumber(n)">{{n}}</f7-button>
                            </td>
                        </tr>
                        <tr>
                            <td v-for="n in 3">
                                <f7-button big raised round @click="pressNumber(n+3)">{{n+3}}</f7-button>
                            </td>
                        </tr>
                        <tr>
                            <td v-for="n in 3">
                                <f7-button big raised round @click="pressNumber(n+6)">{{n+6}}</f7-button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <f7-button big raised round class="clear" @click="clearGuestNumber()">*</f7-button>
                            </td>
                            <td>
                                <f7-button big raised round @click="pressNumber(0)">0</f7-button>
                            </td>
                            <td>
                                <f7-button big raised round class="minus-symbol" @click="minusSymbolInGuestNumber()">#
                                </f7-button>
                            </td>
                        </tr>
                    </table>
                </f7-block>
                <f7-block>
                    <f7-button big raised round class="minus-symbol" @click="beginFormOrder()">Оформить заказ</f7-button>
                </f7-block>
            </div>
        </f7-page>
    </div>
</template>
<style scoped lang="less">
    .come-back {
        padding-top: 25px;
    }
    .simple-input{
        width:100%;
        text-align: center;
        .simple{
            height: 40pt;
            text-align: center;
            border: 2px lightgray;
            font-size: xx-large;
        }
    }

    .component-table {
        text-align: center;
        .phone-table {
            width: 80%;
            margin: 0 auto;
            td {
                text-align: center;
                padding: 10px;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                name:'this component',
                currentGuestCount: ''
            }
        },
        computed:{
            pageTitle: function(){
                return 'Количество гостей';
            },
            tableNumber: function(){
                return this.$store.state.currentTable;
            }
        },
        methods: {
                pressNumber(num){
                    console.log(num);
                    this.currentGuestCount += num;
                },

                bindKeyPress(){
                     window.addEventListener('keyup', this.pressNumberFromKeyboard);
                },
                unbindKeyPress(){
                    window.removeEventListener('keyup', this.pressNumberFromKeyboard);
                },

                pressNumberFromKeyboard(evt){
                   if (evt.key >= 0 && evt.key <9){
                        this.pressNumber(evt.key);
                   }
                },
                clearGuestNumber(){
                    this.currentGuestCount = '';
                },
                minusSymbolInGuestNumber(){
                    if (this.currentGuestCount.length > 0){
                        this.currentGuestCount = this.currentGuestCount.substring(0, this.currentGuestCount.length - 1)
                    }
                },
                beginFormOrder(){
                    if (this.currentGuestCount){
                        this.$store.commit('SET_CURRENT_GUESTS', {'guestsCount': this.currentGuestCount});
                        console.log('Переходим к оформлению заказа');
                    }
                }
           },
        mounted(){
            this.bindKeyPress();
        },
        destroyed(){
            this.$store.commit('SET_CURRENT_TABLE', {'tableId': 0});
            console.log('Отбиндиваем кнопки');
            this.unbindKeyPress();
        }
    }






</script>