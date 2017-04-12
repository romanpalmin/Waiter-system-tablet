<template>
    <div>
        <table-list :list="currentTables" />
        <add-table-button />
    </div>
</template>
<style scoped lang="less">
.list-of-tables{
    .table{
        width: 70px;
        height: 69px;
        float: left;
        margin: 15px;
        .table-image{
            border: 1px solid gray;
            width: 100%;
            height: 100%;
            background-size: cover;
            background: url(http://10.10.182.11/ept/waiter-tablet/images/table.png);
            border-radius: 20px;

        }
        .title{
            border: 2px solid gray;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
<script>
    import tables from '../data/tables';
    import _ from 'lodash';
    import btnAdd from './add-table-to-waitress';
    import listTables from './list-of-tables';
    export default{
        data(){
            return{
                name:'this component',
                currentTables: _.filter(tables, {waitress:this.$store.state.waiter.id})
            }
        },
        mounted(){
            this.getTablesCurrentWaitress();
        },
        methods:{
            getTablesCurrentWaitress(){
            }
        },
        components:{
            'add-table-button': btnAdd,
            'table-list' : listTables
        }
    }

</script>