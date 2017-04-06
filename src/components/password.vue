<template>
    <div class="password-form">
        <f7-list>
            <f7-input type="password" placeholder="Password" center v-model="password" style="text-align: center;"/>
        </f7-list>
    </div>
</template>
<style scoped lang="less">

    input[type=password], .list-block {
        text-align: center;
    }

</style>
<script>
    export default{
        data(){
            return{
                componentName:'Ввод пароля',
                password: ''
            }
        },
        mounted(){
            console.log(this.componentName);
        },
        methods:{
            checkUserPassword(){

            }
        }
    }


</script>