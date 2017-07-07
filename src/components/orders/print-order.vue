<template>
    <div>
        <div>PRINT</div>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        mounted(){
            this.handlers();
        },
        methods:{
            handlers(){

                this.$$('.print-order').on('click', ()=>{this.printOrder()});
            },

            printOrder(){
                this.getData();
                this.$f7.showPreloader('Печать стола №' + this.$store.state.currentTable);
                setTimeout(()=>{
                     this.$f7.hidePreloader();
                }, 2000);
            },

            getData(){
                console.log('Текущий заказ');
                console.log(this.$store.state.orders.current);
            }
        }
    }
</script>