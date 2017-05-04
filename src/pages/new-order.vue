<template>
    <div class="main-content">
        <f7-page :cached="false">
            <f7-navbar sliding></f7-navbar>
            <f7-block-title class="title-table">
                Стол № {{$store.state.currentTable}}
            </f7-block-title>
            <f7-block>
                <div class="list-of-orders">
                    <orders-list />
                </div>
            </f7-block>
        </f7-page>
    </div>
</template>
<style scoped lang="less">
    .content-block-title.title-table {
        padding-top: 40px;
    }


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