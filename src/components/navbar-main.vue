<template>
    <div class="main-nav-bar">
        <f7-navbar class="navbar-style">
            <f7-nav-left>
                <f7-link open-panel="left" v-if="this.$store.state.login ">
                    <div class="avatar images" :style="getStyle('avatar')"></div>
                </f7-link>
                <f7-link v-if="!this.$store.state.login && this.$store.state.pages.main" @click="showPopup=true">
                    <div class="avatar images" :style="getStyle('settings')"></div>
                </f7-link>
            </f7-nav-left>
            <f7-nav-center v-if="this.$store.state.pages.users">
                <div class="page-title">Список официантов</div>
            </f7-nav-center>
            <f7-nav-center v-if="this.$store.state.login"> {{this.$store.state.waiter.shortFullName}}</f7-nav-center>
            <f7-nav-center v-if="this.$store.state.pages.password"> {{this.$store.state.waiter.shortFullName}}
            </f7-nav-center>
            <f7-nav-right>
                <span @click="print()" class="print-order-or-table"
                      v-if="!this.$store.state.pages.main && !this.$store.state.pages.password && !this.$store.state.pages.users"><div
                        class="avatar images print-order-or-table"
                        :style="getStyle('printer')"></div></span>
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
            <!-- <f7-block-title>Настройки</f7-block-title>
             <f7-block>
                 Настройки 1
             </f7-block>
             <f7-block>
                 Настройки 2
             </f7-block>
             <f7-block>
                 Настройки 3
             </f7-block>-->
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

    }

    .close-settings {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
</style>
<script>
    import logout from './mixins/logout.js'
    import leftPanel from './left-panel.vue'
    export default{
        data(){
            return {
                openLeft: false,
                showPopup: false
            }
        },
        mixins: [logout],
        computed: {
            tabletNumber(){
                return this.$store.state.tabletNumber;
            }
        },
        methods: {
            getStyle(type){
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
                    default :
                        str = '';
                        break;
                }
                return str;
            },
            exit(){
                this.openLeft = false;
                this.logout();
            },
            print(){
                this.openLeft = false;
                console.log(this.$store.state);
            }
        },
        components: {
            'left-panel': leftPanel
        }
    }


</script>