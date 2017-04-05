<template>
    <div class="category-list">
        <f7-list v-for="item in list" :key="item.code">
            <f7-list-item link="/about/" :title="item.name" link-animate-pages="false"></f7-list-item>
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
    import ajax from './helpers/ajax';
    import ctgs from '../data/ctgs.js';
    export default{
        data(){
            return{
                msg:'hello vue',
                list: ctgs
            }
        },
        mounted(){
            console.log('Список категорий');
            //this.getData();
        },
        methods: {
            getData(){
                const operation = {};
                operation.name = 'categories';
                ajax.exec(operation, function (resp) {
                    console.log(resp.data);
                });
            }
        }

    }

</script>