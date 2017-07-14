<template>
    <div class="category-list">
        <f7-list v-for="item in list" :key="item.id">
            <f7-list-item :title="item.shortFullName" @click="getWaiter(item)" link="#"></f7-list-item>
        </f7-list>
    </div>
</template>
<style scoped lang="less">
    .category-list {
        .list-block {
            margin: 0 0;
        }
    }
</style>
<script>
    import users from '../data/waiters.js';
    import usersWs from '../data/waiters-ws.js';
    export default{
        data(){
            return{
                list: users,
                componentName: 'Список пользователей'
            }
        },
        mounted(){
            console.log('Выставляем выбор пользователя');
            this.$store.commit('SET_USERS_PAGE', {'users': true});
        },
        methods: {
            getWaiter(item){
                this.$store.commit('SET_WAITER', {'waiter': item});
                this.$store.commit('SET_USERS_PAGE', {'users': false});
                this.$store.commit('SET_PASSWORD_PAGE', {'password': true});
                this.$router.load({'url':'/password/', 'reload':true});
            },

            loadUsers(){
                let options = {
                    'cmd_garson' : 'NEW',
                    'table' : table.table,
                    'numTablet' : '05',
                    'usrID' : this.usrID,
                    'guests' : 1,
                    'uuid' : '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7',
                    'zakNo' : ''
                };
            }
        }
    }

</script>