<template>
    <div>
        <f7-page :cached="false">
            <navbar/>
            столы
            <f7-button @click="reload">test</f7-button>
        </f7-page>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    import navbar from '../components/navbar-main.vue';
    import waitersTables from '../components/table-in-work';
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        mounted(){
        },
        components: {
            navbar,
            'waiters-tables': waitersTables
        },
        methods:{
            reload(){
                console.log('reload');
                //this.$router.reloadPage('/main/');
                this.$router.load({url: '/main/', force:true})
            }
        }
    }




</script>