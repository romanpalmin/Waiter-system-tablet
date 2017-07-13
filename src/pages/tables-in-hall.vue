<template>
    <div>
        <f7-page :cached="false" class="current-padding">
            <f7-block>
            </f7-block>
            <f7-block class="come-back">
                <f7-navbar :title="getHallNumber" back-link="Отмена1" sliding ></f7-navbar>
            </f7-block>
            <f7-block>
                <hall-tables  :list='getTables()' />
            </f7-block>
        </f7-page>
    </div>
</template>
<style scoped lang="less">
    .come-back{
        padding-top:25px;
    }
    .current-padding{
        padding-top: 70px;
    }
</style>
<script>
    import navbar from '../components/navbar-main.vue';
    import hallTables from '../components/list-of-tables';
    export default{
        data(){
            return{
                name:'Tables in hall'
            }
        },
        computed:{
            getHallNumber: function(){
                return 'Зал №' + this.$store.state.selectedHallId;
            }
        },

        mounted(){
            if ( this.$store.state.currentTable === 0){
                    this.$store.commit('SET_CURRENT_GUESTS', {'guestsCount': 0});
                }
        },
        components: {
            navbar,
            'hall-tables': hallTables
        },
        methods:{
            getTables(){
                this.$store.commit('SET_ADD_ORDER_PAGE', {'addorder': true});
                let list = (_.filter(this.$store.state.halls, {id: ''+this.$store.state.selectedHallId}))[0].tables;
                list = _.map(list, function(item){
                    return {'table':item, 'status': +1};
                });
                return list;
            }
        },
            destroyed(){
                if ( this.$store.state.currentTable === 0){
                    this.$store.commit('SET_SELECTED_HALL', {'hallId': 0});
                }
            }

    }




</script>