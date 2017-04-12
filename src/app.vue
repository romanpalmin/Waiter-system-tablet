<template>
    <!-- App -->
    <div id="app" class="app">
        <f7-views>
            <f7-view>
                <f7-pages>
                    <navbar/>
                    <f7-page>
                        <div class="center">
                            <f7-button big round fill center href="/users/" title="Войти" color="darkgray">Войти</f7-button>
                        </div>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-views>
    </div>

</template>
<style scoped lang="less">
    .app {
        background-color: darkgray;
        width: 100%;
        text-align: center;
        .center {
            height: 100px;
            margin: 0 auto;
            padding-top: 250px;
            width: 50%;
            color: white;
        }
    }
</style>
<script>
import navbar from './components/navbar-main';
export default {

    components:{
        navbar
    },
    mounted(){
        console.log('Выставляем главную');
        this.$store.commit('SET_MAIN_PAGE', {'main': true});
    }
}






</script>