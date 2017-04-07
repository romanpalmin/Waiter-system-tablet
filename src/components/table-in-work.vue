<template>
    <div>
        <div>Список столов</div>
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
            console.log('Подгружен список столов текущего официанта');
        }
    }
</script>