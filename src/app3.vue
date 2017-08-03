<template>
    <!-- App -->
    <div id="app">

        <!-- Statusbar -->
        <f7-statusbar/>
        <rightpanel/>
        <login :show="showLogin"/>


        <!-- Main Views -->
        <f7-views>
            <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
                <!-- Navbar -->
                <f7-navbar v-if="$theme.ios">
                    <f7-nav-left>
                        <!--<f7-button open-login-screen="#login-screen">Выход</f7-button>-->
                        <f7-button open-login-screen="#login-screen" @click="logIn">Выход</f7-button>
                    </f7-nav-left>
                    <f7-nav-center sliding>
                        Меню
                    </f7-nav-center>
                    <f7-nav-right>
                        <f7-link icon="icon-bars" open-panel="right"></f7-link>
                    </f7-nav-right>
                </f7-navbar>
                <!-- Pages -->
                <f7-pages>
                    <f7-page>
                        <!-- Page Content -->
                        <f7-block-title>Welcome to my App</f7-block-title>
                        <f7-block inner>
                            <p>Duis sed erat ac eros ultrices pharetra id ut tellus. Praesent rhoncus enim ornare ipsum
                                aliquet ultricies. Pellentesque sodales erat quis elementum sagittis.</p>
                        </f7-block>
                        <f7-block-title>Категории</f7-block-title>
                        <category/>
                    </f7-page>
                </f7-pages>
            </f7-view>

        </f7-views>


    </div>
</template>
<style scoped lang="less">
    .center1 {
        margin: 0 auto;
        background-color: #7fcfff;
        height: 30px;
        width: 70%;
        text-align: center;
    }

    .title {
        background-color: #3cff5f;
    }

</style>

<script>
    import rightpanel from './components/right-panel.vue';
    import login from './components/login.vue';
    import navbar from './components/navbar.vue';
    import category from './components/category.vue';

    export default {
        data() {
            return {
                showLogin: false
            }
        },
        mounted() {
            console.log('Start app...');
        },
        methods: {
            pressButton() {
            },
            logIn() {
                console.log('Выход');
                this.showLogin = false;
            }
        },
        components: {
            rightpanel,
            login,
            navbar,
            category
        }
    }


</script>