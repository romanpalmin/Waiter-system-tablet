<template>
    <f7-page :cached="false">
        <navbar/>
        <f7-block inner>
            <halls/>
        </f7-block>
    </f7-page>
</template>
<style scoped lang="less">

</style>
<script>
    import halls from '../components/halls.vue';
    import navbar from '../components/navbar-main.vue';
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        mounted(){
        },
        components:{
            halls,
            navbar
        }
    }
</script>