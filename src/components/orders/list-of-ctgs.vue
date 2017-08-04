<template>
    <div class="picker-component">
            <f7-picker-modal :opened="showBottomMenu" class="current-picker" :style="getPickerStyle()">
                <f7-navbar class="picker-navbar sub-navbar">
                    <f7-nav-left v-if="showBack">
                        <i class="icon icon-back" @click="selectPrevSubMenu()"></i> <a href="#"
                                                                                       class="title-left_padding"
                                                                                       @click="selectPrevSubMenu()">{{title}}</a>
                    </f7-nav-left>
                    <f7-nav-center v-if="!showBack">
                        Меню
                    </f7-nav-center>
                    <f7-nav-right>
                        <img :src="getImages('exit')" width="30px" @click="togglePicker()">
                    </f7-nav-right>
                </f7-navbar>
                <div class="menu-wrapper">
                    <template v-if="!showPositions">
                        <f7-list v-for="item in currentMenuList" :key="item.code">
                            <f7-list-item :title="item.name" :data-id="item.code" link="#" class="menu-list-item"
                                          @click="selectNextSubMenu(item)"/>
                        </f7-list>
                    </template>
                    <template v-else>
                        <positions-list :CurrentPositionsList="positionsList"/>
                    </template>
                </div>
            </f7-picker-modal>
            <div @click="togglePicker()">
                <f7-block class="bottom-menu-bar">
                    <f7-navbar @click="togglePicker()">
                        <f7-nav-left>
                            Menu
                        </f7-nav-left>
                        <f7-nav-right>
                            <span> top </span>
                        </f7-nav-right>
                    </f7-navbar>
                </f7-block>
            </div>
    </div>
</template>
<style scoped lang="less">
    .bottom-menu-bar {
        background-color: #fff;
        position: absolute;
        left: 0;
        bottom: -40px;
        height: 44px;
        width: 100%;

    }

    .sub-navbar {
        position: fixed;
    }

    .menu-wrapper {
        height: 90%;
        overflow: scroll;
        padding-top: 44px;
        .menu-list-item {
            font-size: 19pt;
            height: 70px;
            line-height: 60px;
            /*font-weight: 900;*/
            color: #007aff;
        }
    }

    .picker-modal {
        overflow: scroll;
        .list-block {
            margin: 0 0;
        }
    }

    .left_padding, .title-left_padding {
        padding-left: 10px;
    }
</style>
<script>
    import positionsList from './positions-list.vue';

    export default {
        data() {
            return {
                name: 'this component',
                showBottomMenu: true,
                showPositions: false,
                stringHeight: 44,
                showBack: false,
                title: '',
                currentMenuList: [],
                prevMenuList: [],
                positionsList: []
            }
        },
        mounted() {
            this.populateMenuList();
        },

        computed: {
            activePanel: function () {
                return this.$store.state.openedPanel.status;
            }
        },

        watch: {
            activePanel: function (val) {
                this.showBottomMenu = this.$store.state.openedPanel.menu;
            }
        },

        methods: {
            getImages(imgName) {
                let src = '';
                switch (imgName) {
                    case 'exit':
                        src = 'http://10.10.182.11/ept/waiter-tablet/images/exit.png';
                        break;
                    default:
                        src = '';

                }
                return src;
            },

            togglePicker() {
                if (this.$store.state.openedPanel.menu) {
                    this.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': 'current'});
                } else {
                    this.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': 'menu'});
                }
            },
            populateMenuList() {
                this.currentMenuList = _.map(this.$store.state.FullTree, (item) => {
                    item.name = item.name_RU;
                    return item;
                });
            },

            selectNextSubMenu(item) {
                if (item.groups.length === 1) {
                    /* Случай, когда только вложенная группа одна*/
                    let title = item.name;
                    if (item.groups[0].groups && item.groups[0].groups.length === 0) {
                        /* Случай, когда только вложенная группа одна и нет других вложенных групп*/
                        this.showBack = true;
                        item = item.groups[0];
                        this.positionsList = item.items;
                        this.prevMenuList.push({'menu': this.currentMenuList, 'title': item.name});
                        this.getBreadTitle();
                        this.openPositions();
                        return;
                    }
                    item = item.groups[0];
                    if (!item.name) {
                        item.name = title;
                    }
                }
                if (item.groups.length > 0) {
                    this.showBack = true;
                    this.prevMenuList.push({'menu': this.currentMenuList, 'title': item.name});
                    this.getBreadTitle();
                    this.currentMenuList = _.map(item.groups, (item) => {
                        item.name = item.name_RU;
                        return item;
                    });
                } else {
                    if (item.items.length > 0) {
                        this.positionsList = item.items;
                        this.prevMenuList.push({'menu': this.currentMenuList, 'title': item.name});
                        this.getBreadTitle();
                        this.openPositions();
                    }
                }
            },

            selectPrevSubMenu() {
                if (this.prevMenuList.length > 0) {
                    let prev = this.prevMenuList.pop();
                    this.currentMenuList = _.map(prev.menu, (item) => {
                        this.getBreadTitle();
                        return item;
                    });
                    if (this.prevMenuList.length === 0) {
                        this.showBack = false;
                    }
                    this.showPositions = this.showPositions ? !this.showPositions : this.showPositions;
                }
            },
            /**
             Заголовок предыдущего раздела для "хлебных крошек"
             */
            getBreadTitle() {
                if (this.prevMenuList.length > 1) {
                    this.title = this.prevMenuList[this.prevMenuList.length - 2].title;
                } else {
                    this.title = 'Меню';
                }
            },

            getPickerStyle() {
                /*let countOfStrings = this.startLevel.length + 1; // количество строк + навигационная панель
                 let height = countOfStrings * this.stringHeight;
                 return `height: ${height}px`;*/
                let height = 450;
                return `height: ${height}px`;
            },

            openPositions() {
                this.showPositions = true;
            }
        },
        components: {
            'positions-list': positionsList
        }
    }


</script>