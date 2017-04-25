<template>
    <div>
        <f7-block>
            <div class="list-of-tables">
                <div class="table" v-for="table in list">

                        <div class="table-image" @click="selectTable(table)">
                            <f7-badge>{{table.status}}</f7-badge>
                        </div>
                        <div class="table-title">Стол №{{table.id}}</div>

                </div>
            </div>
        </f7-block>
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
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                name:'Список столов',
                currentList: []
            }
        },
        mounted(){
           this.currentList = this.list;
        },
        props: ['list'],
        methods:{
            selectTable(table){
            console.log(table);
            if (table.status && table.status === 1){
                    this.$store.commit('SET_CURRENT_TABLE', {'tableId': table.id});
                    this.$router.load({'url':'/guest-count/', 'reload':true});
                }
            }
        }

    }

</script>