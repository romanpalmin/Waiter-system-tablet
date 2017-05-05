<template>
        <f7-page :cached="false" class="current-padding">
            <f7-navbar title="Выбор официанта" back-link="Back" sliding></f7-navbar>
            <f7-block inner>
                <users/>
            </f7-block>
        </f7-page>
</template>

<style scoped lang="less">
    .current-padding{
        padding-top: 70px;
    }
</style>
<script>
    import users from '../components/users.vue';
    export default{
        components:{
            users
        },
        mounted(){
            this.$store.commit('SET_MAIN_PAGE', {'main': false});
        }
    }


</script>