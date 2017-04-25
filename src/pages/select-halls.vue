<template>
    <div>
        <f7-page :cached="false" @click="openPicker = false">
            <f7-block>
            </f7-block>
            <f7-block>
                <f7-list form class="test14">
                    <!-- Text Input -->
                    <f7-list-item class="test13">
                        <f7-input type="text" placeholder="Номер стола" readonly v-model="tableNumber" class="input-sub"
                                  @click="openPicker = !openPicker"
                                  @input="update"
                                  @keydown="update"
                                  @keyup.delete="update"/>
                        <f7-label><span class="hor-delimeter"><f7-link @click="back()">Отмена</f7-link></span>
                        </f7-label>
                    </f7-list-item>
                </f7-list>
                <div class="overlay-list">
                    <halls @click="closeSlider()"/>
                </div>
            </f7-block>
            <f7-picker-modal :opened="openPicker">
                <table class="phone-table">
                    <tr>
                        <td v-for="n in 3">
                            <f7-button raised @click="pressNumber(n)">{{n}}</f7-button>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="n in 3">
                            <f7-button raised @click="pressNumber(n+3)">{{n + 3}}</f7-button>
                        </td>
                    </tr>
                    <tr>


                        <td v-for="n in 3">
                            <f7-button raised @click="pressNumber(n+6)">{{n + 6}}</f7-button>
                        </td>
                    </tr>
                    <tr>
                        <td><f7-button raised class="btn ok">*</f7-button></td>
                        <td>
                            <f7-button raised @click="pressNumber(0)">0</f7-button>
                        </td>
                        <td> <f7-button raised class="btn back" @click="clearNumber(0)">#</f7-button></td>
                    </tr>
                </table>
            </f7-picker-modal>
        </f7-page>
    </div>
</template>
<style scoped lang="less">
    .ok{
        font-size: xx-large;
    }
    .back{
        font-size: large;
    }
    .btn{
        width:100%;
        .back{
            background-size: cover;
            background: url(http://10.10.182.11/ept/waiter-tablet/images/back2.png);
        }
    }
    .overlay-list {
        overflow: scroll;
    }

    .picker-modal {
        height: 200px;
    }

    .item-input.input-sub {
        background-color: #EFEFF4;
        margin: 1px;
        text-align: center;
        padding-left: 2px;
    }

    .hor-delimeter {
        text-align: center;
        width: 100%;
    }

    .item-title label {
        width: 100%;
        text-align: center;
    }

    .item-title.label {
    }

    .phone-table {
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
            this.bindKeyPress();
        },
        components: {
            halls,
            navbar
        },
        methods: {
            openSlider(){
                this.openPicker = true;
            },
            closeSlider(){
                this.openPicker = false;
            },
            back(){
                this.openPicker = false;
                this.$router.back();
            },
            checkForPicker(){
                if (this.notHidePicker) {
                    this.openPicker = true;
                }
            },
            pressNumber(n){
                this.notHidePicker = true;
                this.tableNumber += n;
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
            },

            clearNumber(){
                this.tableNumber = '';
            }
        }
    }


</script>