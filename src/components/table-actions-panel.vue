<template>
    <div class="table-actions-panel">
        <f7-block-title>Управление столом <span v-if="table !==''">№{{table}}</span></f7-block-title>
        <f7-block>
            <f7-buttons>
                <f7-button @click="closePanel()">Закрыть</f7-button>
            </f7-buttons>
        </f7-block>
        <f7-block-title>Текущий заказ</f7-block-title>
        <f7-block class="preloaded">
            <div class="spinner" v-if="$store.state.showOrderPreloaderSpinner">
                <img :src="getImages('spinner')">
            </div>
            <div v-else>
                <f7-grid v-for="order in preloaded">
                    <f7-col width="75" class="order-string" :data-id="num_str"> {{order.name}}</f7-col>
                    <f7-col class="order-string" width="25">{{order.count}} x {{order.price}}&#8381;</f7-col>
                </f7-grid>
            </div>
        </f7-block>
    </div>
</template>
<style scoped lang="less">
    .table-actions-panel {
        position: absolute;
        bottom: 60px;
        left: 10px;
        width: 400px;
        /*height: 100px;*/
        border-radius: 7px;
        background-color: #b8b9b8;
        .preloaded {
            background-color: #ffff;
            max-height: 90px;
            overflow: scroll;
            text-align: left;
            .spinner {
                width: 100%;
                height: 100%;
                display: block;
                //background-color: #4cd964;
                text-align: center;
                img {
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }

</style>
<script>
    import blocker from './helpers/table-blocker.js';
    import getImg from './mixins/getImg';
    export default {
        data() {
            return {
                name: 'this component',
                table: '',
                orderId: ''
            }
        },
        mixins: [getImg],
        computed: {
            preloaded: function () {
                //return this.$store.state.orders.preloaded;
                let curOrderItem = {};
                this.table = this.$store.state.currentTable;
                this.orderId = this.$store.state.orders.currentOrderId;
                let printedView = _.map(this.$store.state.orders.preloaded, item => {
                    curOrderItem = _.filter(this.$store.state.SourceMenu.items, {'code': item.tovar});
                    this.table = this.$store.state.currentTable;//item.table;
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
            }
        },
        mounted() {
        },
        methods: {
            closePanel() {
                blocker.unblockTable({
                    tableId: this.table,
                    zakNo: this.orderId,
                    uuid: this.$store.state.settings.uuid,
                    //usrId: self.store.state.waiter.waiterId,
                    callback: () => {
                        this.$store.commit('SET_SHOW_TABLE_ACTIONS_PANEL', false);
                        this.$store.commit('SET_SHOW_PRINTER_BTN', false);
                    }
                });
            }/*,
            getImages(imgName){
                let src = '';
                switch (imgName) {
                    case 'spinner':
                        src = 'http://10.10.182.11/ept/waiter-tablet/images/spinner.gif';
                        break;
                    default:
                        src = '';

                }
                return src;
            }*/
        }
    }


</script>