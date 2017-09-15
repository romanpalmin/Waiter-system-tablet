<template>
    <div class="main-nav-bar">
        <f7-navbar class="navbar-style">
            <f7-nav-left>
                <f7-link open-panel="left" v-if="this.$store.state.login " @click="closeMenu()">
                    <div class="avatar images" :style="getStyle('avatar')"></div>
                </f7-link>
                <f7-link v-if="!this.$store.state.login && this.$store.state.pages.main" @click="showPopup=true">
                    <div class="avatar images" :style="getStyle('settings')"></div>
                </f7-link>
            </f7-nav-left>
            <f7-nav-center v-if="this.$store.state.pages.users">
                <div class="page-title">Список официантов</div>
            </f7-nav-center>
            <f7-nav-center v-if="this.$store.state.login">
                <span>{{this.$store.state.waiter.shortFullName}}</span>
               <!-- <template v-if="this.$store.state.currentTable !== 0">
                    <div class="table-number">{{this.$store.state.currentTable}}</div>
                </template>-->
            </f7-nav-center>
            <f7-nav-center v-if="this.$store.state.pages.password"> {{this.$store.state.waiter.shortFullName}}
            </f7-nav-center>
            <f7-nav-right>
                <template v-if="this.$store.state.currentTable !== 0">
                    <div class="table-number">{{this.$store.state.currentTable}}</div>
                </template>
                <span class="download-from-tablet"
                      v-if="this.$store.state.pages.editorder">
                    <f7-link href="#" open-popup data-popup=".select-tablet" close-panel>
                    <div class="avatar images "
                         :style="getStyle('download')">
                    </div>
                        </f7-link>
                </span>
                <span class="back-to-tables" @click="backToTables()"
                      v-if="this.$store.state.pages.editorder">
                    <div class="avatar images "
                         :style="getStyle('undo')">
                    </div>
                </span>
                <span @click="printOrder()" class="print-order-or-table"
                      v-if="this.$store.state.pages.editorder">
                    <div class="avatar images print-order-or-table"
                         :style="getStyle('printer2')">
                    </div>
                </span>
            </f7-nav-right>
        </f7-navbar>

        <f7-panel left layout="dark" :opened="openLeft">
            <left-panel/>
        </f7-panel>

        <f7-popup :opened=showPopup>
            <f7-navbar>
                <f7-nav-left><span @click="showPopup=false"><div class="close-settings images"
                                                                 :style="getStyle('exit')"></div></span></f7-nav-left>
            </f7-navbar>
        </f7-popup>
        <f7-popup class="select-tablet">
            <!-- Popup content goes here -->
            <p>
                <f7-link href="#" close-popup data-popup=".select-tablet">Закрыть</f7-link>
            </p>
            <hr/>
            <select-tablet/>
        </f7-popup>
    </div>
</template>
<style scoped lang="less">
    .main-nav-bar {
        height: 120px;
        .navbar-style {
            height: 100px;
        }
        .navbar .center {
            width: 100%;
            height: 100px
        }
        .images {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            background-color: darkgrey;

        }
        .avatar {

        }
        .page-title {
            width: 100%;
        }
        .table-number {
            width: 40px;
            height: 40px;
            line-height: 40px;
            background-color: #d3d3d3;
            color: #000;
            margin-left: 20px;
            border: 1px solid gray;
            border-radius: 20px;
            font-size: 20pt;
            font-weight: 900;
            /*position: absolute;*/
            top: 50px;
            left: 130px;
            /*background-size: cover;
            background: url(http://10.10.182.11/ept/waiter-tablet/images/table.png);*/
        }

    }

    .close-settings {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
</style>
<script>
    import logout from './mixins/logout.js';
    import leftPanel from './left-panel.vue';
    import printer from './helpers/print-orders';
    import selectTablet from './select-tablet.vue';

    export default {
        data() {
            return {
                openLeft: false,
                showPopup: false
            }
        },
        mixins: [logout],
        computed: {
            tabletNumber() {
                return this.$store.state.tabletNumber;
            }
        },
        methods: {
            getStyle(type) {
                let str = '';
                switch (type) {
                    case 'avatar':
                        str = `background-image: url("${this.$store.state.waiter.avatar}");background-size: cover;`;
                        break;
                    case 'settings':
                        str = `background-image: url("http://10.10.182.11/ept/waiter-tablet/images/settings.png");background-size: cover; background-color: transparent;`;
                        break;
                    case 'exit':
                        str = `background-image: url("http://10.10.182.11/ept/waiter-tablet/images/exit.png");background-size: cover; background-color: transparent;`;
                        break;
                    case 'printer':
                        str = `background-image: url("http://10.10.182.11/ept/waiter-tablet/images/printer-new.png");background-size: cover; background-color: transparent;`;
                        break;
                    case 'printer2':
                        str = `background-image: url("http://10.10.182.11/ept/waiter-tablet/images/printer-new2.png");background-size: cover; background-color: transparent;`;
                        break;
                    case 'undo':
                        str = `background-image: url("http://10.10.182.11/ept/waiter-tablet/images/undo.png");background-size: cover; background-color: transparent;`;
                        break;
                    case 'download':
                        str = `background-image: url("http://10.10.182.11/ept/waiter-tablet/images/download.png");background-size: cover; background-color: transparent;`;
                        break;
                    default :
                        str = '';
                        break;
                }
                return str;
            },
            closeMenu() {
                this.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': 'current'});
            },
            exit() {
                this.openLeft = false;
                this.logout();
            },

            printOrder(){
                console.log('Print 1');
                this.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': 'current'});
                this.$store.commit('SET_CURRENT_ORDER_ID', {'orderId': 0});
                (_.once(()=>{printer.addStringsToOrder(this)}))();
            },
            backToTables(){
                console.log('Back');
                this.$store.commit('SET_ACTIVE_ORDER_PANEL', {'status': 'current'});
                this.$store.commit('SET_CURRENT_ORDER_ID', {'orderId': 0});
                printer.backToTables(this);
            }
        },
        components: {
            'left-panel': leftPanel,
            'select-tablet': selectTablet
        }
    }
</script>