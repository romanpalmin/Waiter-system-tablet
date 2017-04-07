<template>
    <div class="main-nav-bar">
        <f7-navbar>
            <f7-nav-left>
                <f7-link open-panel="left"><div class="avatar images" :style="getStyle()"></div></f7-link>
            </f7-nav-left>
            <f7-nav-center> {{fio}}</f7-nav-center>

            <f7-nav-right >

                <span @click="exit()">Выход</span>
                <!--<f7-link title="Logout" @click="logout()"><span>Выход</span></f7-link>-->
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
    </div>
</template>
<style scoped lang="less">
    .main-nav-bar {
        .navbar .center {
            width: 100%;
            height: 100px
        }
        .images{
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: darkgrey;
        }
        .avatar{

        }
    }
</style>
<script>
    import logout from './mixins/logout.js'
    export default{
        data(){
            return{
                fio: this.$store.state.waiter.shortFullName,
                tabletNumber: this.$store.state.tabletNumber,
                openLeft: false
            }
        },
        mounted(){
        },
        watch(){
            openLeft: ()=> {console.log('Сменилась панель');}
        },
        mixins:
            [logout],
        methods:{
            getStyle(){
                //return `background-image: url("images/dart.png");background-size: cover;`;
                return `background-image: url("${this.$store.state.waiter.avatar}");background-size: cover;`;
            },
            exit(){
                this.openLeft = false;
                this.logout();
            }
        }
    }

</script>