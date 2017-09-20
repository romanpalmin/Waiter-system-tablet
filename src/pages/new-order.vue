<template>
    <div class="main-content">
        <f7-page :cached="false" class="current-padding">
            <template>
                <f7-navbar sliding></f7-navbar>
                <div class="add-order-page">
                    <!--<f7-block-title class="title-table">
                        Стол № {{$store.state.currentTable}}
                    </f7-block-title>-->
                    <f7-block>
                        <div class="list-of-orders">
                            <orders-list/>
                        </div>
                    </f7-block>
                </div>
            </template>
        </f7-page>
    </div>

</template>
<style scoped lang="less">
    .content-block-title.title-table {
        /*padding-top: 40px;*/
        overflow: hidden;
    }

    .current-padding {
        padding-top: 70px;
        overflow: hidden;
    }

    .add-order-page {
        overflow: hidden;
    }

</style>
<script>
    import navbar from '../components/navbar-main.vue';
    import orderlist from '../components/orders/orders-list-add.vue';
    import ajax from '../components/helpers/ajax';

    export default {
        data() {
            return {
                name: 'this component',
                showComponents: false
            }
        },
        mounted() {
            /*console.log('Начинаем оформление заказа, загружаем товары');
            if (!this.$store.state.pages.addorder){
                this.$f7.showPreloader('Загружаем заказ стола №' + this.$store.state.currentTable);
                console.log('Загружаем весь заказ');
                this.getPrinted();
            }*/
            /* setTimeout(()=>{
                 //alert('now closing... ' + this.showStartForm);
                 //this.showMsgForm = false;
                 //this.showStartForm = false;
                 //alert('close');

             }, 3000);*/
            /*setTimeout(() => {
                this.showComponents = true;
            }, 5000);*/
        },
        components: {
            navbar,
            'orders-list': orderlist
        },
        methods: {

            /*async getPrinted() {
                let uuid = this.$store.state.settings.uuid;
                let usrID = this.$store.state.waiter.id;
                let table = this.$store.state.currentTable;
                let zakNo = this.$store.state.orders.currentOrderId;
                let guests = this.$store.state.guestsCount;
                let numTablet = this.$store.state.tabletNumber;

                let optionsRec = {
                    'cmd_garson': 'REC', numTablet, zakNo, usrID, table, guests, uuid
                };
                try {
                    const res = await ajax.getData(optionsRec);
                    //this.showStartForm = true;
                    let currentPrinted = res.str2 ? res.str2 : [];
                    this.$store.commit('SET_PRINTED_ORDER', {'printedOrders': currentPrinted});
                    this.$f7.hidePreloader();
                }
                catch (err) {
                    this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                    this.$f7.hidePreloader();
                }

            },*/
            closeStartForm() {
                console.log('@@@');
            }
        }
    }

</script>