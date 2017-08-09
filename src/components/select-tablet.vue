<template>
    <div class="popup-select-tablet">
        <f7-list>
            <f7-list-item v-if="currentTablet && currentTablet.code">
                <f7-link href="#" class="load-order selected-table" @click="selectTablet(currentTablet.planshet)">
                    Планшет № {{currentTablet.planshet}}
                </f7-link>
            </f7-list-item>
            <f7-list-item v-for="item in currentTabletsList" :key="item.planshet">
                <f7-link href="#" class="load-order" @click="selectTablet(item.planshet)">Планшет №{{item.planshet}}
                </f7-link>
            </f7-list-item>
        </f7-list>
    </div>
</template>
<style scoped lang="less">
    .selected-table {
        font-weight: 900;
    }

    .load-order {
        width: 100%;
    }
</style>
<script>
    import _ from 'lodash';

    export default {
        data() {
            return {
                name: 'this component',
                selectedTablet: 0,
                tabletsList: []
            }
        },
        computed: {
            currentTabletsList: function () {
                let arr = _.filter(this.tabletsList, (item) => {
                    return item.table !== this.$store.state.currentTable;
                });
                arr = _.uniqBy(arr, 'planshet');
                return arr;
            },
            currentTablet: function () {
                let currentTable = this.$store.state.currentTable;
                let res = _.find(this.tabletsList, {'table': +currentTable});
                console.log('Верхняя строка: ');
                console.log(res);
                return res;
            }
        },
        mounted() {
            const self = this;
            this.$$('.load-order').on('click', () => {
                self.$f7.showPreloader('Загрузка данных с планшета №' + self.selectedTablet);
                setTimeout(() => {
                    self.$f7.hidePreloader();
                    self.$f7.closeModal('.select-tablet');
                }, 2000);
            });
            this.$$('.select-tablet').on('popup:opened', () => {
                this.getTabletsOrders();
            });
        },
        methods: {
            selectTablet(tabletId) {
                this.selectedTablet = tabletId;
                this.getOrderFromTablet(tabletId);
            },
            async getTabletsOrders() {
                this.$f7.showPreloader('Загрузка данных планшетов');
                try {
                    const options = {'cartsMenus': 1};
                    const response = await this.axios.get(this.$store.getters.apiUrl, {params: options});
                    this.tabletsList = response.data;
                    this.$f7.hidePreloader();
                }
                catch (err) {
                    this.$f7.hidePreloader();
                }
            },
            getOrderFromTablet(tabletId) {
                let orders =
                    _.map(
                        _.filter(this.tabletsList, {'planshet': tabletId}),
                        item => {
                            return item.code; // todo когда появтся дополнительные признаки, добавить
                        });
                this.formNewOrderList(orders);
            },
            formNewOrderList(ordersList) {
                if (ordersList.length === 0) return;
                let arrRes = [];
                _.forEach(ordersList, (code) => {
                    console.log(code);
                    arrRes.push(
                        _.find(this.$store.state.SourceMenu.items, {'code': code}));
                });
                console.log(this.$store.state.FullTree);
                console.log(this.$store.state.SourceMenu);
                console.log(arrRes);
                //this.$f7.closeModal('.select-tablet');
            }
        }
    }

</script>