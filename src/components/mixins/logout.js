export default {
    methods:{
        logout(){
            this.$store.commit('SET_WAITER', {'waiter': {}});
            location.reload();
            //this.$router.reloadPage('/main/');
            //this.$router.back('/main/', {force:true})
        }
    }
}