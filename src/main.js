import Vue from 'vue';
import Framework7 from 'framework7';
import Framework7Vue from 'framework7-vue';
import keypad from '../bower_components/Framework7 Keypad/dist/framework7.keypad.min';
import keypadCss from '../bower_components/Framework7 Keypad/dist/framework7.keypad.min.css';
import Vuex from 'vuex';

// Import Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css';
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css';
import AppStyles from './css/app.css';

// Init Vue Plugin
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Vuex);
Vue.use(Framework7Vue);
Vue.use(VueAxios, axios);


import Routes from './routes.js';
import App from './app';
import store from './store';


// Init App
new Vue({
    el: '#app',
    template: '<app/>',
    store,
    framework7: {
        root: '#app',
        routes: Routes,
        uniqueHistory: true,
        uniqueHistoryIgnoreGetParameters: true,
        cache: false
    },
    // Register App Component
    components: {
        app: App
    },
    methods: {
        getNewJsonFullTree(){
            this.$store.dispatch('GET_MENU');
            this.$store.dispatch('LOAD_POSITIONS_MODS', {
                'callback': function () {
                    console.log('Модификаторы товаров загружены');
                }
            });
            this.$store.dispatch('LOAD_COMMON_MODS', {
                'callback': function () {
                    console.log('Общие модификаторы загружены');
                }
            });
        },
        getTablet(){
            this.$f7.showPreloader('Авторизация планшета');
            let options = {
                'uuid' : '64$fe$f2$72$6a$0e$34$f1$51$7c$2a$54$b2$b0$d7$e7',
                'nTab' : 1
            };
            let url = this.$store.state.settings.getUrl();
            this.axios.get(url, {params: options})
                .then(resp => {
                    if (resp && resp.data && resp.data.login && resp.data.pass && resp.data.nTab)
                    this.$store.commit('SET_LOGIN', resp.data.login);
                    this.$store.commit('SET_PASS', resp.data.pass);
                    this.$store.commit('SET_TABLET_NUM', resp.data.nTab);
                    this.$f7.hidePreloader();
                    console.log('API: ' + this.$store.state.settings.getUrl());
                })
                .catch(err => {
                    this.$f7.alert(`Ошибка: ${err}`, 'Ошибка');
                    this.$f7.hidePreloader();
                })
        }
    },
    mounted(){
        this.getNewJsonFullTree();
        console.log('Start app');
        this.getTablet();
    }
});
