<template>
    <div>
        <f7-page :cached="false">
            <f7-block>
            </f7-block>
            <f7-block class="come-back">
                <f7-navbar :title="pageTitle" back-link="Отмена" sliding @click="back"></f7-navbar>
            </f7-block>


            <f7-block-title>Стол №{{tableNumber}}</f7-block-title>
            <f7-block class="simple-input">
                <input type="text" class="simple input-sub" :value="currentGuestCount" readonly/>
            </f7-block>
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

</style>
<script>
    export default{
        data(){
            return{
                name:'this component',
                currentGuestCount: '',
                keyPicker: {}
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
                    this.currentGuestCount += num;
                },

                bindKeyPress(){
                     //window.addEventListener('keyup', this.pressNumberFromKeyboard);
                },
                unbindKeyPress(){
                    //window.removeEventListener('keyup', this.pressNumberFromKeyboard);
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
                        console.log('переходим к оформлению заказа');
                    }
                },
                back(){
                    console.log('Очищаем гостей');
                    this.$store.commit('SET_CURRENT_GUESTS', {'guestsCount': 0});
                }
           },
        mounted(){
        const self = this;
            //this.bindKeyPress();
            this.keyPicker = this.$f7.keypad({
                    toolbarCloseText: 'Готово',
                    convertToPopover: false,
                    closeByOutsideClick: false,
                    scrollToInput:true,
                    input: '.input-sub',
                    dotButton: false,
                    valueMaxLength: 3,
                    inputReadOnly: true,
                    onChange: function(p, value){
                            self.currentGuestCount = +value;
                        },
                    onClose: function(e){
                    if (self.$store.state.currentTable !== 0){
                        console.log('Фиксируем количество гостей ' + e.value + ' и ');
                        self.beginFormOrder();
                        }
                    }
                });
        },
        destroyed(){
            this.$store.commit('SET_CURRENT_TABLE', {'tableId': 0});
            this.$store.commit('SET_CURRENT_GUESTS', {'guestsCount': 0});
            this.keyPicker.setValue('');
            this.unbindKeyPress();
            this.keyPicker.close();
        }
    }






</script>