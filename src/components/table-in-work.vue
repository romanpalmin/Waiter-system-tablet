<template>
    <div>
        <f7-block-title>Список столов</f7-block-title>
        <f7-block>
            <div class="list-of-tables">
                <div class="table" v-for="table in currentTables">
                    <div class="table-image"><f7-badge>{{table.id}}</f7-badge></div>
                    <div class="table-title">Стол №{{table.id}}</div>
                </div>
            </div>
        </f7-block>
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
    export default{
        data(){
            return{
                name:'this component',
                currentTables: []
            }
        },
        mounted(){
            this.getTablesCurrentWaitress();
        },
        methods:{
            getTablesCurrentWaitress(){
                this.currentTables = _.filter(tables, {waitress:this.$store.state.waiter.id});
            }
        },
        components:{
            'add-table-button': btnAdd
        }
    }

</script>