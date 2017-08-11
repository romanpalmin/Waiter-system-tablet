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

    export default {
        data() {
            return {
                list: [],
                componentName: 'Список пользователей'
            }
        },
        mounted() {
            console.log('Выставляем выбор пользователя');
            this.loadUsers();
            this.$store.commit('SET_USERS_PAGE', {'users': true});
        },
        methods: {
            getWaiter(item) {
                console.log(item);
                this.$store.commit('SET_WAITER', {'waiter': item});
                this.$store.commit('SET_USERS_PAGE', {'users': false});
                this.$store.commit('SET_PASSWORD_PAGE', {'password': true});
                this.$router.load({'url': '/password/', 'reload': true});
            },

            loadUsers() {
                let url = this.$store.getters.apiUrl;
                let options = {
                    'garson_list': 1,
                    'uuid': this.$store.state.settings.uuid
                };
                this.axios.get(url, {params: options})
                    .then(resp => {
                        if (resp && resp.data) {
                            this.list = _.map(resp.data, item => {
                                item.id = +item.id_adm;
                                item.surname = '';
                                item.firstName = '';
                                item.lastName = '';
                                item.shortFullName = item.name;
                                item.password = item.pass;
                                item.avatar = "http://10.10.182.11/ept/waiter-tablet/images/default-user.png";
                                switch (item.codeChar) {
                                    case '3':
                                        item.status = 3;
                                        break;
                                    case '2':
                                        item.status = 2;
                                        break;
                                    case '1':
                                        item.status = 1;
                                        break;
                                    case '0':
                                        item.status = 3;
                                        break;
                                    default:
                                        item.status = 3;
                                        break;
                                }
                                ;
                                item.statusName = item.character;
                                return item;
                            });
                        }
                    })
                    .catch(err => {
                        this.$f7.hidePreloader();
                        this.$f7.alert(`Ошибка: ${err}`, 'Ошибка');
                    })
            }
        }
    }

</script>