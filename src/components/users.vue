<template>
    <div class="category-list">
        <f7-list v-for="item in list" :key="item.id">
            <f7-list-item link="/password/" :title="item.shortFullName" @click="getWaiter(item)"></f7-list-item>
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
    export default{
        data(){
            return{
                list: users,
                componentName: 'Список пользователей'
            }
        },
        mounted(){
            console.log(this.componentName);
        },
        methods: {
            getWaiter(item){
                console.log(item);
                this.$store.commit('SET_WAITER', {'waiter': item});
                console.log(this.$store);
            }
        }

    }

</script>