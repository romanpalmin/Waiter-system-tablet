<template>
    <div>

        <f7-picker-modal :opened="showBottomMenu" class="current-picker" :style="getPickerStyle()">
            <f7-navbar>
                <f7-nav-left v-if="showBack">
                  <i class="icon icon-back" @click="returnToPrevList()"></i> <a href="#" class="title-left_padding" @click="returnToPrevList()">{{title}}</a>
                </f7-nav-left>
                <f7-nav-center v-if="!showBack">
                   Разделы
                </f7-nav-center>
            </f7-navbar>
            <f7-list v-for="item in currentList" :key="item.code">
                <f7-list-item :title="item.name" :data-id="item.code" link="#" @click="selectCat(item.code, item.name)"></f7-list-item>
            </f7-list>
        </f7-picker-modal>
    </div>
</template>
<style scoped lang="less">
    .picker-modal {
        /*height:550px;*/
        overflow: hidden;
        .list-block {
            margin: 0 0;
        }
    }
    .left_padding, .title-left_padding{
        padding-left: 10px;
    }
</style>
<script>

    import cat332020 from '../data/332020.js';
    import cat342020 from '../data/342020.js';
    import cat352020 from '../data/352020.js';
    import cat392020 from '../data/392020.js';
    import cat412020 from '../data/412020.js';
    import cat422020 from '../data/422020.js';
    import cat432020 from '../data/432020.js';
    import cat462020 from '../data/462020.js';
    import cat472020 from '../data/472020.js';
    import cat482020 from '../data/482020.js';
    import cat492020 from '../data/492020.js';
    export default{
        data(){
            return{
                name:'this component',
                showBottomMenu: true,
                startLevel: [],
                stringHeight: 44,
                catArr: [],
                showBack : false,
                currentList : [],
                firstLevel: [],
                secondLevel: [],
                currentLevel: 0,
                selectedCategory: '',
                selectedIndexLevelOne: 0,
                selectedIndexLevelTwo: 0,
                title: ''
            }
        },
        mounted(){
            this.populateList();
            this.populateArrayOfCtgs();
        },
        methods:{
            populateArrayOfCtgs(){
            this.catArr=[
                    {'id': 332020, 'ctg': cat332020},
                    {'id': 342020, 'ctg': cat342020},
                    {'id': 352020, 'ctg': cat352020},
                    {'id': 392020, 'ctg': cat392020},
                    {'id': 412020, 'ctg': cat412020},
                    {'id': 422020, 'ctg': cat422020},
                    {'id': 432020, 'ctg': cat432020},
                    {'id': 462020, 'ctg': cat462020},
                    {'id': 472020, 'ctg': cat472020},
                    {'id': 482020, 'ctg': cat482020},
                    {'id': 492020, 'ctg': cat492020}
                ]
            },
            populateList(){
                //this.$store.commit('SET_CATEGORY', {'category':ctgs});
                this.startLevel = _.map(this.$store.state.category, function(item){
                    return item;
                });
                this.currentList = this.startLevel;
            },
            getPickerStyle(){
                let countOfStrings = this.startLevel.length + 1; // количество строк + навигационная панель
                let height = countOfStrings * this.stringHeight;
                return `height: ${height}px`;
            },
            selectCat( id , name){
                const self = this;
                let item;
                let newItem;
                let newList = [];

                switch (this.currentLevel){
                    case 0:
                        {
                            this.title = name;
                            this.selectedCategory = id;
                            item = _.find(this.catArr, {'id':+id});
                            if (item && item.ctg){
                                this.firstLevel = _.map(item.ctg, (item)=>{return item;})
                                this.updateList(item.ctg, 1);
                            };
                        };
                        break;
                    case 1:
                        console.log('Проверяем, есть ли второй уровень вложенности категории '+ this.selectedCategory);
                        item = _.find(this.catArr, {'id':+this.selectedCategory});

                        if (item && item.ctg){
                            this.selectedIndexLevelOne = id;
                            newItem = item.ctg[id].groups1;
                            newList = [];
                            newItem.forEach(function(item, index){
                                if (newItem.length === 1){
                                        console.log('Ничего не делаем, передаем управление компоненту показа товаров');
                                        return;
                                    }
                                else {
                                    console.log('второй уровень');
                                    self.title = name;
                                    newList.push(item);
                                    if (newItem.length-1 === index){
                                            self.secondLevel = _.map(newList, (item)=>{return item});
                                            console.log(self.secondLevel);
                                            self.updateList(self.secondLevel, 2);
                                        }
                                    }
                                });
                            }
                        break;
                    case 2:
                         console.log('Проверяем, есть ли третий уровень вложенности категории '+ this.selectedCategory);
                         item = _.find(this.catArr, {'id':+this.selectedCategory});
                         this.selectedIndexLevelTwo = id;
                         newItem = item.ctg[id].groups1;
                         console.log(newItem);
                         newItem = newItem.groups2;
                         console.log(newItem);
                        break;
                    default: break;   
                }
            },

            updateList(items, level){
                let subList = [];
                let newItem = {};
                const self = this;
                if (items.length === 1){
                    console.log('Ничего не делаем, передаем управление компоненту показа товаров');
                    return;
                }
                items.forEach(function(item, index){
                    newItem = {'name': item.name, 'code': index};
                    subList.push(newItem);
                    if (index === items.length-1){
                        self.reBindList(subList, level);
                    }
                });
            },

            reBindList(list, level){
                this.showBack = true;
                this.currentList = _.map(list, function(item){
                    return item;
                });
                if (level === 1){
                    this.firstLevel = _.cloneDeep(this.currentList);
                    }
                if (level === 2) {
                    this.secondLevel = _.cloneDeep(this.currentList);
                }
                this.currentLevel = level;
            },
            returnToPrevList(){
                console.log(this.currentLevel);

                switch (this.currentLevel){
                    case 1: {
                        this.currentLevel = 0;
                        this.showBack = false;
                        this.currentList = _.map(this.startLevel, (item)=>{return item;});
                        break;
                        }
                    case 2: {
                        this.currentLevel = 1;
                        this.showBack = true;
                        console.log(this.firstLevel);
                        this.currentList = _.map(this.firstLevel, (item)=>{return item;});
                        break;
                        }
                    default: {
                        break;
                    }

                }
            }

        }
    }
</script>