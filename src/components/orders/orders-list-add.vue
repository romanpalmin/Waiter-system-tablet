<template>
    <div>
        <div class="list-of-orders">
            <f7-accordion>
                <template v-for="items in currentOrdersAll" >
                    <f7-accordion-item :key="items.ts">
                        <f7-accordion-toggle>
                            <f7-grid>
                                <f7-col width="60" class="order-string" :data-id="items.item.code" >
                                    <span>{{items.item.name}}</span>
                                </f7-col>
                                <f7-col class="order-string" width="7">{{items.count}}</f7-col>
                                <f7-col class="order-string" width="4">X</f7-col>
                                <f7-col class="order-string" width="12">{{items.item.price}} руб.</f7-col>
                            </f7-grid>
                        </f7-accordion-toggle>
                        <f7-accordion-content>
                            <buttons-panel :items="items" />
                        </f7-accordion-content>
                    </f7-accordion-item>
                </template>
            </f7-accordion>
        </div>

        <f7-block class="summary">
            Сумма: {{getSumAmount}} руб.
        </f7-block>
        <f7-block>
            <category/>
        </f7-block>
    </div>


</template>
<style scoped lang="less">
    .list-of-orders {
        background-color: #fafafa;
        width: 100%;
        min-height: 200px;
        max-height: 600px;
        overflow-y: scroll;
        .order-string {
            text-align: left;
            padding-top: 15px;
            padding-bottom: 15px;
        }

    }

    .summary {
        width: 100%;
        text-align: left;
    }


</style>
<script>
    import category from './list-of-ctgs.vue';
    import panel from './buttons-panel.vue';
    export default{
        data(){
            return{
                name:'this component',
                showBottomMenu: true
            }
        },
        computed:{
            getSumAmount: function(){
                return this.$store.state.orders.summary;
            },
            currentOrdersAll: function(){
                return _.filter(this.$store.state.orders.current, (item)=>{return item.tableId === this.$store.state.currentTable});
            }
        },
        mounted(){
        },
        methods:{
            closePicker(){
                this.showBottomMenu = false;
            }
        },
        components:{
            category,
            'buttons-panel': panel
        }
    }








</script>