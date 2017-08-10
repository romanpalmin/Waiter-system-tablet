<template>
    <div class="main-content">
        <f7-page :cached="false" class="current-padding">
            <f7-navbar sliding></f7-navbar>
            <div class="add-order-page">
                <f7-block-title class="title-table">
                    Стол № {{$store.state.currentTable}}
                </f7-block-title>
                <f7-block>
                    <div class="list-of-orders">
                        <orders-list />
                    </div>
                </f7-block>
            </div>
        </f7-page>
    </div>
</template>
<style scoped lang="less">
    .content-block-title.title-table {
        /*padding-top: 40px;*/
        overflow: hidden;
    }
    .current-padding{
        padding-top: 70px;
        overflow: hidden;
    }
    .add-order-page{
        overflow: hidden;
    }

</style>
<script>
    import navbar from '../components/navbar-main.vue';
    import orderlist from '../components/orders/orders-list-add.vue';
    import ajax from '../components/helpers/ajax';
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        mounted(){
            console.log('Начинаем оформление заказа, загружаем товары');
            if (!this.$store.state.pages.addorder){
                this.$f7.showPreloader('Загружаем заказ стола №' + this.$store.state.currentTable);
                console.log('Загружаем весь заказ');
                this.getPrinted();
            }
        },
        components: {
            navbar,
            'orders-list' : orderlist
        },
        methods:{
            async getPrinted(){
                let uuid = '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7';
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
                    let currentPrinted = res.str2 ? res.str2 : [];
                    this.$store.commit('SET_PRINTED_ORDER', {'printedOrders': currentPrinted});
                    this.$f7.hidePreloader();
                }
                catch (err) {
                    this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                    this.$f7.hidePreloader();
                }
               /*this.axios.get(this.$store.getters.apiUrl, {params: optionsRec})
                    .then(rec=>{
                        console.log(rec.data);
                        if (rec && rec.data && rec.data[0] && rec.data[0].str1 && rec.data[0].str1[0] && rec.data[0].str1[0] && rec.data[0].str1[0].answCode === '0'){
                            let currentPrinted = rec.data[0].str2;
                            console.log(currentPrinted);
                            this.$f7.hidePreloader();
                            return currentPrinted;
                        }
                        else {
                            console.log(rec.data);
                            throw new Error(rec.data);
                        }
                    })
                    .then(currentPrinted=>{
                        this.$store.commit('SET_PRINTED_ORDER', {'printedOrders': currentPrinted});
                        this.$f7.hidePreloader();
                    })
                    .catch(err=>{
                        console.log(err);
                        this.$f7.hidePreloader();
                    })*/
            }
        }
    }

</script>