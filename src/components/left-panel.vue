<template>
    <div>
        <f7-block inner>
            <p>Планшет №{{tabletNumber}}</p>
        </f7-block>
        <f7-block-title>Действия</f7-block-title>
        <f7-block inner>
            <p><f7-link href="#" open-popup  data-popup=".select-tablet" close-panel>Загрузить данные</f7-link></p>
            <p><f7-link href="#"  class="print-order" close-panel>Отправить на печать</f7-link></p>
            <p>Действие 3.1</p>
            <p>Действие 4.1</p>
        </f7-block>
        <f7-block-title>Блок действий 2</f7-block-title>
        <f7-block inner>
            <p>Действие 1.2</p>
            <p>Действие 2.2</p>
            <p>Действие 3.3</p>
            <p>Действие 4.4</p>
        </f7-block>
        <f7-popup class="select-tablet">
            <!-- Popup content goes here -->
            <p><f7-link href="#" close-popup  data-popup=".select-tablet">Закрыть</f7-link></p>
            <hr />
            <select-tablet />
        </f7-popup>
    </div>

</template>
<style scoped lang="less">

</style>
<script>
    import selectTablet from './select-tablet.vue';
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        mounted(){
            const self = this;
            this.$$('.print-order').on('click', function () {
                self.$f7.showPreloader('Печать стола №' + self.$store.state.currentTable);
                setTimeout(function () {
                    self.$f7.hidePreloader();
                }, 2000);
            });
        },
        computed:{
            tabletNumber(){
                return this.$store.state.tabletNumber;
            }
        },
        components:{
            'select-tablet': selectTablet
        }
    }
</script>