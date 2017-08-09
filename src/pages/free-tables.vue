<template>
    <div>
        <f7-page :cached="false" class="current-padding">
            <f7-block>
            </f7-block>
            <f7-block class="come-back">
                <span @click="back()"><f7-navbar :title="getHallNumber" back-link="Отмена" sliding
                                                 @click="back()"></f7-navbar></span>
            </f7-block>
            <f7-block>
                <free-tables :list='getList'/>
            </f7-block>
        </f7-page>
    </div>
</template>
<style scoped lang="less">
    .come-back {
        padding-top: 25px;
    }

    .current-padding {
        padding-top: 70px;
    }
</style>
<script>
    import navbar from '../components/navbar-main.vue';
    import hallTables from '../components/list-of-tables';

    export default {
        data() {
            return {
                name: 'Tables in hall',
                url: this.$store.getters.apiUrl,
                currentList: []
            }
        },
        computed: {
            getHallNumber: function () {
                //return 'Зал №' + this.$store.state.selectedHallId;
                return 'Список столов';
            },
            getList: function () {
                return this.currentList;
            }
        },

        mounted() {
            if (this.$store.state.currentTable === 0) {
                this.$store.commit('SET_CURRENT_GUESTS', {'guestsCount': 0});
            }
            this.getTablesFromApi();

        },
        components: {
            navbar,
            'free-tables': hallTables,
            currentList: []
        },
        methods: {
            back() {
                this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': false});
            },
            getTablesFromApi() {
                let list = [];
                this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': true});
                this.$f7.showPreloader('Загрузка столов');
                let cmd_garson = 'getTableSt';
                let numTablet = this.$store.state.tabletNumber;
                let usrID = this.$store.state.waiter.id;
                let uuid = this.$store.state.settings.uuid;
                let options = {
                    cmd_garson,
                    numTablet,
                    usrID,
                    uuid
                };
                this.axios.get(this.url, {params: options})
                    .then(resp => {
                        return resp.data;
                    })
                    .then(response => {
                        if (response && response.length > 0) {
                            let filteredTables = _.filter(response, item => {
                                return (item.status === 0 && +item.table > 0 && +item.table < 100 && item.ocupate === 0);// || item.status === 2 || item.status === 5);
                            });
                            this.$f7.hidePreloader();
                            list = _.map(filteredTables, item => {
                                return item
                            });
                            this.currentList = _.map(filteredTables, item => {
                                return item
                            });
                            return this.currentList;
                        }
                    })
                    .catch(err => {
                        this.$f7.hidePreloader();
                        this.$f7.alert(`Код ошибки: ${err}`, 'Ошибка!');
                    });

            }
        },
        destroyed() {
            if (this.$store.state.currentTable === 0) {
                this.$store.commit('SET_SELECTED_HALL', {'hallId': 0});
            }
        }

    }


</script>