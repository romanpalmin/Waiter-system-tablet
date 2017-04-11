<template>
    <div class="halls-list">
        <f7-list v-for="item in list" :key="item.id">
            <f7-list-item  :title="'Зал №' + item.id" link="/#/"></f7-list-item>
        </f7-list>
    </div>
</template>
<style scoped lang="less">
    .halls-list {
        .list-block {
            margin: 0 0;

        }
    }
    .item-title{
        padding-left:50px;
    }

</style>
<script>
    import halls from '../data/halls.js';
    export default{
        data(){
            return{
                list: [],
                componentName: 'Список залов'
            }
        },
        mounted(){
            console.log(this.componentName);
            if (this.$store.state.halls.length === 0){
                console.log('Заполняем залы');
                this.list = this.getHalls(halls);
                console.log(this.$store.state.halls);
                console.log(this.list);
            }
        },
        methods: {
            getHalls(halls){
                this.$store.commit('SET_HALLS', {'halls': halls});
                return halls;
            }
        }

    }

</script>