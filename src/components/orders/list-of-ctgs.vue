<template>
    <div>
        <f7-picker-modal :opened="showBottomMenu" class="myClass" :style="getPickerStyle()">
            <f7-list v-for="item in catList" :key="item.code">
                <f7-list-item :title="item.name" :data-id="item.code" link="#" @click="selectCat(item.code)"></f7-list-item>
            </f7-list>
        </f7-picker-modal>
    </div>
</template>
<style scoped lang="less">
    .picker-modal {
        /*height:550px;*/
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
                catList: [],
                stringHeight: 44
            }
        },
        mounted(){
            this.populateList();
        },
        methods:{
            populateList(){
                this.$store.commit('SET_CATEGORY', {'category':ctgs});
                this.catList = _.map(this.$store.state.category, function(item){
                    return item;
                });
            },
            getPickerStyle(){
                let countOfStrings = this.catList.length;
                let height = countOfStrings * this.stringHeight;
                return `height: ${height}px`;
            },
            selectCat(id){
                console.log(id);
            }

        }
    }
</script>