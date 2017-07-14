<template>
    <div class="table-actions-panel">
        <f7-block-title>Управление столом</f7-block-title>
        <f7-block>
            <f7-buttons>
                <f7-button>Печать</f7-button>
                <f7-button @click="closePanel()">Закрыть</f7-button>
            </f7-buttons>
        </f7-block>
    </div>
</template>
<style scoped lang="less">
    .table-actions-panel {
        position: absolute;
        bottom: 60px;
        left: 10px;
        width: 400px;
        height: 100px;
        border-radius: 7px;
        background-color: #b8b9b8;
    }

</style>
<script>
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        mounted(){
        },
        methods:{
            closePanel(){
                this.$store.commit('SET_SHOW_TABLE_ACTIONS_PANEL', false);
            }
        }
    }


</script>