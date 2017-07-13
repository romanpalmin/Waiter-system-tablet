<template>
    <div>
        <f7-block inner>
            <p>Планшет №{{tabletNumber}}</p>
        </f7-block>
        <f7-block-title>Действия</f7-block-title>
        <f7-block inner>
            <p><f7-link href="#" open-popup  data-popup=".select-tablet" close-panel>Загрузить данные</f7-link></p>
            <p><f7-link href="#"  class="print-order" close-panel>Отправить на печать</f7-link></p>
        </f7-block>
        <f7-block-title>Навигация</f7-block-title>
        <f7-block inner>
            <p><f7-link href="/tables/" close-panel data-ignore-cache="true">Список текущих столов</f7-link></p>
            <!--<p><f7-link @click="$router.load({url: '/tables/'})" close-panel data-ignore-cache="true" >Выбор стола</f7-link></p>
            <p>Действие 2.2</p>
            <p>Действие 3.3</p>
            <p>Действие 4.4</p>-->
        </f7-block>
        <!--<f7-block-title>Тестовые данные</f7-block-title>
        <f7-block inner>
            <p><f7-link href="#" close-panel class="load-to-ls">Загрузить в LS</f7-link></p>
            <p><f7-link href="#" close-panel class="load-from-ls">Загрузить из LS</f7-link></p>
            <p><f7-link href="#" close-panel class="remove-from-ls">Очистить LS по ключу</f7-link></p>
            <p><f7-link href="#" close-panel class="clear-ls">Очистить LS</f7-link></p>
        </f7-block>-->
        <f7-popup class="select-tablet">
            <!-- Popup content goes here -->
            <p><f7-link href="#" close-popup  data-popup=".select-tablet">Закрыть</f7-link></p>
            <hr />
            <select-tablet />
        </f7-popup>
        <print-order />
    </div>

</template>
<style scoped lang="less">

</style>
<script>
    import selectTablet from './select-tablet.vue';
    import printOrder from './orders/print-order.vue';
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        mounted(){
        },
        computed:{
            tabletNumber(){
                return this.$store.state.tabletNumber;
            }
        },
        components:{
            'select-tablet': selectTablet,
            'print-order': printOrder
        }
    }
</script>