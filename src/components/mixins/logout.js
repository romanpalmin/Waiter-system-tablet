import blocker from '../helpers/table-blocker';
export default {
    methods: {
        logout() {

            let uuid = this.$store.state.settings.uuid;
            let table = this.$store.state.currentTable;
            let zakNo = this.$store.state.orders.currentOrderId;
            blocker.unblockTable({
                tableId: table,
                zakNo,
                uuid,
                callback: ()=>{
                    console.log('Exit');
                    this.$store.commit('SET_WAITER', {'waiter': {}});
                    this.$store.commit('SET_USER_LOG_IN_OUT', {'login': false});
                    location.reload();
                }
            });
        }
    }
}