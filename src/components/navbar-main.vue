<template>
    <div class="main-nav-bar">
        <f7-navbar>
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
                <span @click="exit()" v-if="!this.$store.state.pages.main"><div class="avatar images"
                                                                                :style="getStyle('exit')"></div></span>
            </f7-nav-right>
        </f7-navbar>

        <f7-panel left layout="dark" :opened="openLeft">

            <f7-block inner>
                <p>Планшет №{{tabletNumber}}</p>
            </f7-block>
            <f7-block-title>Блок действий 1</f7-block-title>
            <f7-block inner>
                <p>Действие 1.1</p>
                <p>Действие 2.1</p>
                <p>Действие 3.1</p>
                <p>Действие 4.1</p>
            </f7-block>
            <f7-block-title>Блок действий 2</f7-block-title>
            <f7-block inner>
                <p>Действие 1.2</p>
                <p>Действие 2.2</p>
                <p>Действие 3.3</p>
                <p>Действие 4.4</p>
            </f7-block>
        </f7-panel>

        <f7-popup :opened=showPopup>
            <f7-navbar>
                <f7-nav-left><span @click="showPopup=false"><div class="close-settings images"
                                                                 :style="getStyle('exit')"></div></span></f7-nav-left>
            </f7-navbar>
            <f7-block-title>Настройки</f7-block-title>
            <f7-block>
                Настройки 1
            </f7-block>
            <f7-block>
                Настройки 2
            </f7-block>
            <f7-block>
                Настройки 3
            </f7-block>
        </f7-popup>
    </div>
</template>
<style scoped lang="less">
    .main-nav-bar {
        .navbar .center {
            width: 100%;
            height: 100px
        }
        .images {
            width: 30px;
            height: 30px;
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
    export default{
        data(){
            return{
                openLeft: false,
                showPopup: false
            }
        },
        mixins:
            [logout],
        computed:{
            tabletNumber(){
                return this.$store.state.tabletNumber;
            }
        },
        methods:{
            getStyle(type){
                let str = '';
                switch (type){
                    case 'avatar':
                         str = `background-image: url("${this.$store.state.waiter.avatar}");background-size: cover;`;
                         break;
                    case 'settings':
                         str = `background-image: url("http://10.10.182.11/ept/waiter-tablet/images/settings.png");background-size: cover; background-color: transparent;`;
                         break;
                    case 'exit':
                         str = `background-image: url("http://10.10.182.11/ept/waiter-tablet/images/exit.png");background-size: cover; background-color: transparent;`;
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
            }
        }
    }


</script>