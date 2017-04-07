<template>
    <f7-pages>
        <f7-page cached=false>
            <f7-navbar title="Ввод пароля" back-link="Back" sliding></f7-navbar>
            <f7-block inner class="component">
                <password/>
            </f7-block>
        </f7-page>
    </f7-pages>
</template>

<style scoped lang="less">
    input[type=password] {
        text-align: center;
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