<template>
    <div>
        <f7-page :cached="false">
            <f7-block>
            </f7-block>
            <f7-block class="come-back">
                <f7-navbar :title="getHallNumber" back-link="Отмена" sliding ></f7-navbar>
            </f7-block>
            <f7-block>
                <hall-tables  :list='getT()' />
            </f7-block>
        </f7-page>
    </div>
</template>
<style scoped lang="less">
    .come-back{
        padding-top:25px;
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
            getTablesOfCurrentHall(){

            },
            getHallNumber: function(){
                return 'Зал №' + this.$store.state.selectedHallId;
            }
        },

        mounted(){
            console.log(this.name);
            /*this.$store.commit('SET_CURRENT_TABLE', {'tableId': 0});
            this.$store.commit('SET_SELECTED_HALL', {'hallId': 0});*/
        },
        components: {
            navbar,
            'hall-tables': hallTables
        },
        methods:{
            getT(){
                let list = (_.filter(this.$store.state.halls, {id: ''+this.$store.state.selectedHallId}))[0].tables;
                list = _.map(list, function(item){
                    return {'id':item, 'status': +1};
                });
                return list;
            },

            getTablesByHallId(){
                console.log('Получаем список столов с их статусами для конкретного зала');
            }
        },
            destroyed(){
                this.$store.commit('SET_SELECTED_HALL', {'hallId': 0});
            }

    }




</script>