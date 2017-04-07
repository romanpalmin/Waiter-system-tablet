export default {
    methods:{
        logout(){
            this.$store.commit('SET_WAITER', {'waiter': {}});
            this.$router.loadPage('/main/');
        }
    }
}