export default {
    methods:{
        logout(){
            this.$store.commit('SET_WAITER', {'waiter': {}});
            this.$store.commit('SET_USER_LOG_IN_OUT', {'login': false});
            location.reload();
            //this.$router.reloadPage('/main/');
            //this.$router.back('/main/', {force:true})
        }
    }
}