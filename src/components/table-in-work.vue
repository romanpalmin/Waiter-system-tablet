<template>
    <div class="table-list">

        <table-list :list="currentTables"/>
        <add-table-button/>
        <template v-if="showPanel">
            <table-actions-panel/>
        </template>
    </div>
</template>
<style scoped lang="less">
    .list-of-tables {
        .table {
            width: 70px;
            height: 69px;
            float: left;
            margin: 15px;
            .table-image {
                border: 1px solid gray;
                width: 100%;
                height: 100%;
                background-size: cover;
                background: url(http://10.10.182.11/ept/waiter-tablet/images/table.png);
                border-radius: 20px;

            }
            .title {
                border: 2px solid gray;
                width: 100%;
                height: 100%;
            }
            &-list {
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
    import tableActions from './table-actions-panel.vue';

    export default {
        data() {
            return {
                name: 'this component',
                currentInterval: 0,
                currentTables: []//_.filter(tables, {waitress:this.$store.state.waiter.id})
            }
        },
        destroyed(){
            /*console.log('Kill interval...', this.$store.state.intervals.updateUserTables);
             clearInterval(this.$store.state.intervals.updateUserTables);*/
        },
        beforeDestroy(){
            /*console.log('Kill interval before...', this.$store.state.intervals.updateUserTables);
            clearInterval(this.$store.state.intervals.updateUserTables);*/
        },
        mounted() {
            console.log('Текущая страница');
            console.log(this.$store.state.pages);
            this.getTablesCurrentWaitress(true);
            let state = setInterval(() => {
                if (this.$store.state.pages.main){
                    console.log('Обновляем столы');
                    this.getTablesCurrentWaitress(false);
                } else {
                    console.log('Не обновляем столы');
                }
            }, 10000);
            console.log('Очищаем интервал ', this.$store.state.intervals.updateUserTables);
            clearInterval(this.$store.state.intervals.updateUserTables);
            this.$store.commit('SET_UPDATE_USER_TABLES', {state});
            //this.currentInterval =
            //this.getTablesCurrentWaitress(true);

            this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
        },
        methods: {
            getTablesCurrentWaitress: function (isShowPreloader = false) {
                if (isShowPreloader) this.$f7.showPreloader('Загрузка столов пользователя');
                let numTablet = this.$store.state.tabletNumber;
                let result = [];
                let options = {
                    'cmd_garson': 'getTableSt',
                    numTablet,
                    'usrID': this.$store.state.waiter.id,
                    'uuid': this.$store.state.settings.uuid
                };
                setTimeout(() => {
                    this.axios.get(this.$store.getters.apiUrl, {params: options})
                        .then(resp => {
                            if (resp && resp.data) {
                                result = _.filter(resp.data, item => {
                                    return item.garson === this.$store.state.waiter.id && (item.status === 1 || item.status === 5);
                                })
                            }
                            this.currentTables = _.map(result, item => {
                                return item
                            });
                            if (isShowPreloader) this.$f7.hidePreloader();
                        })
                        .catch((err => {
                            if (isShowPreloader) this.$f7.hidePreloader();
                            this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                        }));
                    //this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
                    this.$store.commit('REMOVE_FULL_CURRENT_ORDER');

                }, 300);
            }
        },
        components: {
            'add-table-button': btnAdd,
            'table-list': listTables,
            'table-actions-panel': tableActions
        },
        computed: {
            showPanel: function () {
                return this.$store.state.showTableActions;
            }
        }
    }


</script>