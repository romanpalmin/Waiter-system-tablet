<template>
    <f7-pages>
        <f7-page cached=false>
            <f7-navbar title="Выбор официанта" back-link="Back" sliding></f7-navbar>
            <f7-block inner>
                <users/>
            </f7-block>
        </f7-page>
    </f7-pages>
</template>

<style scoped lang="less">

</style>
<script>
    import users from '../components/users.vue';
    export default{
        components:{
            users
        }
    }


</script>