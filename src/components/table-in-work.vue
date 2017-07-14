<template>
    <div class="table-list">

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
        &-list{
            overflow-y: scroll;
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
                currentTables: []//_.filter(tables, {waitress:this.$store.state.waiter.id})
            }
        },
        mounted(){
            this.getTablesCurrentWaitress();
            this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
        },
        methods:{
            getTablesCurrentWaitress(){
                this.$f7.showPreloader('Загрузка столов пользователя');
                let numTablet = '05';
                let result = [];
                let options = {
                    'cmd_garson': 'getTableSt',
                    numTablet,
                    'usrID': this.$store.state.waiter.id,
                    'uuid': '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7'
                }
                console.log();
                this.axios.get(this.$store.getters.apiUrl, {params: options})
                    .then(resp=>{
                        if (resp && resp.data){
                            result = _.filter(resp.data, item => {
                                return item.garson === this.$store.state.waiter.id && (item.status === 1 || item.status === 5);
                            })
                        };
                        this.currentTables = _.map(result, item => {return item});
                        this.$f7.hidePreloader();
                    })
                    .catch((err=>{
                        this.$f7.hidePreloader();
                        this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                    }))
                this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
            }
        },
        components:{
            'add-table-button': btnAdd,
            'table-list' : listTables
        }
    }

</script>