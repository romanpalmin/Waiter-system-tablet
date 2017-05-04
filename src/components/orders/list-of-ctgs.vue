<template>
    <div>
        <f7-picker-modal :opened="showBottomMenu" class="">
            <f7-list v-for="n in 20" :key="n">
                <f7-list-item :title="'Группа ' + n" link="#"></f7-list-item>
            </f7-list>
        </f7-picker-modal>
    </div>
</template>
<style scoped lang="less">
    .picker-modal {
        height:550px;
        overflow: scroll;
        .list-block {
            margin: 0 0;
        }
    }
</style>
<script>
    import ctgs from '../data/ctgs.js'
    export default{
        data(){
            return{
                name:'this component',
                showBottomMenu: true,
                catList: []
            }
        },
        mounted(){
            console.log(ctgs);
        },
        methods:{
            populateList(){

            }

        }
    }
</script>