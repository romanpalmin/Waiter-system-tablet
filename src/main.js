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
                'uuid': this.$store.state.settings.uuid,
                'nTab': 1
            };
            let url = this.$store.getters.apiUrl;
            let usersOptions = {
                'garson_list': 1,
                'uuid': this.$store.state.settings.uuid
            };

            this.axios.get(url, {params: options})
                .then(resp => {
                    if (resp && resp.data && resp.data.login && resp.data.pass && resp.data.nTab)
                        this.$store.commit('SET_LOGIN', resp.data.login);
                    this.$store.commit('SET_PASS', resp.data.pass);
                    this.$store.commit('SET_TABLET_NUM', resp.data.nTab);

                    console.log('API: ' + this.$store.getters.apiUrl);
                    return this.axios.get(url, {params: usersOptions});
                })
                .then(users => {
                    let usersList = [];
                    console.log('Список пользователей');
                    console.log(users);
                    if (users && users.data) {
                        usersList = _.map(users.data, item => {
                            item.id = +item.id_adm;
                            item.surname = '';
                            item.firstName = '';
                            item.lastName = '';
                            item.shortFullName = item.name;
                            item.password = item.pass;
                            item.avatar = "http://10.10.182.11/ept/waiter-tablet/images/default-user.png";
                            switch (item.codeChar) {
                                case '3':
                                    item.status = 3;
                                    break;
                                case '2':
                                    item.status = 2;
                                    break;
                                case '1':
                                    item.status = 1;
                                    break;
                                case '0':
                                    item.status = 3;
                                    break;
                                default:
                                    item.status = 3;
                                    break;
                            }
                            item.statusName = item.character;
                            return item;
                        });
                        return usersList;
                    }
                })
                .then(usersList => {
                    console.log('Список пользователей2');
                    console.log(usersList);
                    this.$store.commit('SET_USERS', usersList);
                    this.$f7.hidePreloader();
                })
                .catch(err => {
                    this.$f7.hidePreloader();
                    this.$f7.alert(`Ошибка: ${err}`, 'Ошибка');
                })
        }
    },
    mounted(){
        this.getNewJsonFullTree();
        console.log('Start app');
        console.log(this);
        this.getTablet();
    }
});
