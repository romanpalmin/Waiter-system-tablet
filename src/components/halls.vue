<template>
    <div class="halls-list">
        <f7-list v-for="item in list" :key="item.id">
            <f7-list-item  :title="'Зал №' + item.id" link="/hall-tables/" reload @click="selectHall(item.id)"></f7-list-item>
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
                this.list = this.getHalls(halls);
            }
            else {
                this.list = this.$store.state.halls;
            }
        },
        methods: {
            getHalls(halls){
                this.$store.commit('SET_HALLS', {'halls': halls});
                return halls;
            },
            selectHall(id){
                this.$store.commit('SET_SELECTED_HALL', {'hallId': +id});
                console.log(this.$parent.openPicker);
                this.$parent.openPicker = false;
            }
        },


    }

</script>