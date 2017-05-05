<template>
    <div>
        <div class="list-of-orders">
            <!-- <div class="order-string" v-for="n in 100">Строка заказа №{{n*2}}</div>-->
            <f7-grid>
                <template v-for="n in 40">
                    <f7-col width="80" class="order-string" :data-id="n">
                        <span @click="console(n)">Строка заказа №{{n*2}}</span>
                    </f7-col>
                    <f7-col width="3">{{n%3}}</f7-col>
                    <f7-col width="3">X</f7-col>
                    <f7-col width="14">{{n}} руб.</f7-col>
                </template>
            </f7-grid>
        </div>
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
        max-height: 200px;
        overflow-y: scroll;
        .order-string {
            text-align: left;
        }
    }


</style>
<script>
    import category from './list-of-ctgs.vue';
    export default{
        data(){
            return{
                name:'this component',
                showBottomMenu: true
            }
        },
        mounted(){
        },
        methods:{
            console(n){
                console.log(n);
            },
            closePicker(){
                this.showBottomMenu = false;
            }
        },
        components:{
            category
        }
    }







</script>