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
        padding-top: 40px;
        overflow: hidden;
    }
    .current-padding{
        padding-top: 70px;
        overflow: hidden;
    }
    .add-order-page{
        overflow: hidden;
    }

   /* .page-content{
        overflow: hidden;
    }
*/
</style>
<script>
    import navbar from '../components/navbar-main.vue';
    import orderlist from '../components/orders/orders-list-add.vue';
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        mounted(){
            console.log('Начинаем оформление заказа, загружаем товары');
        },
        components: {
            navbar,
            'orders-list' : orderlist
        },
    }

</script>