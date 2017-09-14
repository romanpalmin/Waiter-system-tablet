<template>
    <div class="message-form-content">
        <f7-block-title>Отправка сообщения</f7-block-title>
        <f7-block>
            <div class="item-input">
                <textarea class="input-field" v-model="msg"></textarea>
            </div>
            <f7-list form>
                <f7-list-item checkbox name="my-checkbox" title="Отправить на бар" v-model="isToBar"></f7-list-item>
                <f7-list-item checkbox name="my-checkbox" title="Отправить на кухню" v-model="isToRest"></f7-list-item>
            </f7-list>
            <f7-buttons>
                <f7-button @click="cancelMsg()" big raised round center>Отменить</f7-button>
                <f7-button @click="eraseMsg()" big raised round center>Очистить</f7-button>
                <f7-button :disabled="disabledBtn" @click="configureMsg()" big raised round center>Отправить</f7-button>
            </f7-buttons>
        </f7-block>
    </div>
</template>
<style scoped lang="less">
    .message-form-content {
        .input-field {
            padding: 10px;
            border-radius: 5px;
            border: 1px solid gray;
            width: 97%;
            height: 150px;
            font-size: 14pt;
            background-color: #efefef;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                name: 'Send message',
                msg: '',
                isToBar: false,
                isToRest: false
            }
        },
        computed: {
            disabledBtn: function () {
                return !(this.msg !== '' && (this.isToBar || this.isToRest));
            }
        },
        props: ['options'],
        methods: {
            cancelMsg() {
                this.eraseMsg();
                this.$f7.closeModal('.message-form-popup');
            },
            eraseMsg() {
                this.msg = '';
                this.isToBar = false;
                this.isToRest = false;
            },
            sendMsg(arrPromises) {
                this.axios.all(arrPromises)
                    .then((resp) => {
                        console.log(resp);
                        this.cancelMsg();
                    })
                    .catch(err => {
                        console.log(err);
                        this.cancelMsg();
                    })
            },
            configureMsg() {
                const url = this.$store.getters.apiUrl + '';
                const options = {
                    'cmd_garson': 'MSG',
                    'table': this.$store.state.currentTable,
                    'usrID': this.$store.state.waiter.id ? this.$store.state.waiter.id : 0,
                    'uuid': this.$store.state.settings.uuid,
                    'numTablet': this.$store.state.tabletNumber
                };
                const optionsBar = Object.assign({}, options, {msgBar: this.msg});
                const optionsRest = Object.assign({}, options, {msgRest: this.msg});
                console.log(options);
                if (this.msg !== '') {
                    if (this.isToBar && this.isToRest) {
                        console.log('Отправляем и на кухню, и на бар');
                        this.sendMsg([
                            this.axios.get(url, {params: optionsBar}),
                            this.axios.get(url, {params: optionsRest})
                        ]);
                    } else if (this.isToBar && !this.isToRest) {
                        console.log('Отправляем только на бар');
                        this.sendMsg([this.axios.get(url, {params: optionsBar})]);
                    } else if (!this.isToBar && this.isToRest) {
                        console.log('Отправляем только на кухню');
                        this.sendMsg([this.axios.get(url, {params: optionsRest})]);
                    } else if (!this.isToBar && !this.isToRest) {
                        console.log('Никуда не отправляем');
                    }
                }
            },
        }
    }
</script>