<template>
    <div>
        <f7-page :cached="false" @click="openPicker = false">
            <f7-block>
                {{tableNumber}}



            </f7-block>
            <f7-block>
                <f7-list form class="test14">
                    <!-- Text Input -->
                    <f7-list-item class="test13">
                        <f7-input type="text" placeholder="Номер стола" readonly v-model="tableNumber" class="input-sub"
                                  @click="openPicker = true"
                                  @blur="checkForPicker"
                                  @input="update"
                                  @keydown="update"
                                  @keyup.delete="update"/>
                        <f7-label><span class="hor-delimeter"><f7-link @click="back()">Отмена</f7-link></span>
                        </f7-label>
                    </f7-list-item>
                </f7-list>
                <div class="overlay-list">
                    <halls/>
                </div>
            </f7-block>
            <f7-picker-modal :opened="openPicker">
                <f7-button @click="openPicker = false;">test</f7-button>
                <table class="phone-table">
                    <tr>
                        <td v-for="n in 3">
                            <f7-button  raised  @click="pressNumber(n)">{{n}}</f7-button>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="n in 3">
                            <f7-button  raised  @click="pressNumber(n+3)">{{n + 3}}</f7-button>
                        </td>
                    </tr>
                    <tr>


                        <td v-for="n in 3">
                            <f7-button  raised  @click="pressNumber(n+6)">{{n + 6}}</f7-button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <f7-button  raised  @click="pressNumber(0)">0</f7-button>
                        </td>
                        <td></td>
                    </tr>
                </table>
            </f7-picker-modal>
        </f7-page>
    </div>
</template>
<style scoped lang="less">
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
    .phone-table{
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
                tableNumber: '12',
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
            }
        }
    }


</script>