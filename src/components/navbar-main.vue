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
                <template v-if="this.$store.state.currentTable !== 0">
                    <div class="table-number">{{this.$store.state.currentTable}}</div>
                </template>
            </f7-nav-center>
            <f7-nav-center v-if="this.$store.state.pages.password"> {{this.$store.state.waiter.shortFullName}}
            </f7-nav-center>
            <f7-nav-right>
                <span class="back-to-tables" @click="backToTables()"
                      v-if="this.$store.state.pages.editorder">
                    <div class="avatar images "
                         :style="getStyle('undo')">
                    </div>
                </span>
                <span @click="printOrder()" class="print-order-or-table"
                      v-if="this.$store.state.pages.editorder">
                    <div class="avatar images print-order-or-table"
                         :style="getStyle('printer')">
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
            position: absolute;
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
                    case 'undo':
                        str = `background-image: url("http://10.10.182.11/ept/waiter-tablet/images/undo.png");background-size: cover; background-color: transparent;`;
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
            /*print() {
                this.$f7.showPreloader('Печать счета');
                //this.openLeft = false;
                //console.log(this.$store.state);
                let uuid = this.$store.state.settings.uuid;
                let usrID = this.$store.state.waiter.id;
                let table = this.$store.state.currentTable;
                let zakNo = this.$store.state.orders.currentOrderId;
                this.$store.commit('SET_SHOW_PRINTER_BTN', false);
                this.$store.commit('SET_SHOW_TABLE_ACTIONS_PANEL', false);
                let options = {'cmd_garson': 'CHT', zakNo, usrID, table, uuid};
                console.log(options);
                this.axios.get(this.$store.getters.apiUrl, {params: options})
                    .then(result => {
                        console.log(result);
                        setTimeout(() => {
                            this.$f7.hidePreloader();
                            this.$router.refreshPage();
                        }, 2000);

                    })
                    .catch(err => {
                        this.$f7.hidePreloader();
                        this.$f7.alert(`Ошибка: ${err}`, 'Ошибка!');
                    })
            },*/
            printOrder(){
                console.log('Print 1');
                (_.once(()=>{printer.addStringsToOrder(this)}))();
            },
            backToTables(){
                console.log('Back');
            }
        },
        components: {
            'left-panel': leftPanel
        }
    }
</script>