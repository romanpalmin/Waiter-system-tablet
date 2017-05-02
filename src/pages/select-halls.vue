<template>
    <div>
        <f7-page :cached="false">
            <f7-block>
            </f7-block>
            <f7-block>
                <f7-list form class="test14">
                    <!-- Text Input -->
                    <f7-list-item>
                        <input placeholder="Введите номер стола" type="text" v-model="tableNumber" class="input-sub"/>
                        <f7-label><span class="hor-delimeter"><f7-link @click="back()">Отмена</f7-link></span>
                        </f7-label>
                    </f7-list-item>
                </f7-list>
                <div class="overlay-list">
                    <halls/>
                </div>
            </f7-block>

        </f7-page>
    </div>
</template>
<style scoped lang="less">
    .ok {
        font-size: xx-large;
    }

    .back {
        font-size: large;
    }

    .overlay-list {
        overflow: scroll;
    }

    .item-input.input-sub {
        margin: 1px;
        text-align: center;
        background-color: #bcc0c5;
        padding-left: 10px;
    }

    .hor-delimeter {
        text-align: center;
        width: 100%;
    }

    form.list-block {
        margin: 3px 0;
        font-size: 17px;
        padding-top: 14px;
    }

</style>
<script>
    import halls from '../components/halls.vue';
    import navbar from '../components/navbar-main.vue';
    export default{
        data(){
            return {

                name: 'this component',
                openPicker: false,
                tableNumber: '',
                notHidePicker: false
            }
        },
        mounted(){
            const self = this;
            this.bindKeyPress();
            this.$f7.keypad({
                    toolbarCloseText: 'Готово',
                    convertToPopover: false,
                    closeByOutsideClick: false,
                    scrollToInput:true,
                    input: '.input-sub',
                    dotButton: false,
                    valueMaxLength: 3,
                    inputReadOnly: true,
                    onChange: function(p, value){
                            this.tableNumber += +value;
                        },
                     onClose: function(e){
                        console.log('Проверяем наличие стола с заданным значением ' + e.value);
                     }
                });
        },
        components: {
            halls,
            navbar
        },
        methods: {
           back(){
                this.openPicker = false;
                this.$router.back();
            },
            pressNumber(n){
                console.log(n);
                //this.tableNumber += n;
            },
            bindKeyPress(){
                window.addEventListener('keyup', this.pressNumberFromKeyboard);
            },
            unbindKeyPress(){
                window.removeEventListener('keyup', this.pressNumberFromKeyboard);
            },

            pressNumberFromKeyboard(evt){
                if (evt.key > 0 && evt.key < 9) {
                    this.pressNumber(evt.key);
                }
            },
            update(evt){
                this.number = evt;
            },
            delete(evt){
                this.number = evt;
            }
        }
    }




</script>