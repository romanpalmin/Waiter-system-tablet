<template>
    <div>
        <f7-link href="/halls/"><div class="add-table-button"></div></f7-link>
    </div>
</template>
<style scoped lang="less">
.add-table-button{
    position: absolute;
    bottom: 60px;
    right: 10px;
    width: 60px;
    height: 60px;
    background-color: #6d6d72;
    border-radius: 50%;
    background: url("http://10.10.182.11/ept/waiter-tablet/images/add.png");
}

</style>
<script>
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        props: ["waitressId", "tableId", "position"],
        mounted(){
        }
    }
</script>