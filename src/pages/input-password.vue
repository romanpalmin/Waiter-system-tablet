<template>
        <f7-page :cached="false"  class="current-padding">
            <f7-navbar title="Ввод пароля" back-link="Back" sliding></f7-navbar>
            <f7-block inner class="component">
                <password/>
            </f7-block>
        </f7-page>
</template>

<style scoped lang="less">
    input[type=password] {
        text-align: center;
    }
    .current-padding{
        padding-top: 70px;
    }
</style>
<script>
    import password from '../components/password.vue';
    export default{
        data(){
            return {

            }
        },
        components:{
            password
        }
    }


</script>