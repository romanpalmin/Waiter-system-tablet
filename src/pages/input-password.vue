<template>
    <f7-page>
        <f7-navbar title="Ввод пароля" back-link="Back" sliding></f7-navbar>
        <f7-block inner class="component">
           <!-- <password/>-->
            <phones/>
        </f7-block>
    </f7-page>
</template>

<style scoped lang="less">
        input[type=password] {
            text-align: center;
        }
</style>
<script>
    import password from '../components/password.vue';
    import phones from '../components/phones.vue';
    export default{
        data(){
            return {

            }
        },
        components:{
            password,
            phones
        }
    }

</script>