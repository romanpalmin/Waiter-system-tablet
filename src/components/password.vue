<template>
    <div class="component-table">
        <f7-block inner no-hairlines>
            <f7-grid class="password-stars">
                <template v-for="n in 4">
                    <f7-col><span :class="stars[n-1]">*</span></f7-col>
                </template>
            </f7-grid>
        </f7-block>
        <f7-block inner>
            <table class="phone-table">
                <tr>
                    <td v-for="n in 3">
                        <f7-button big raised @click="pressNumber(n)">{{n}}</f7-button>
                    </td>
                </tr>
                <tr>
                    <td v-for="n in 3">
                        <f7-button big raised @click="pressNumber(n+3)">{{n + 3}}</f7-button>
                    </td>
                </tr>
                <tr>
                    <td v-for="n in 3">
                        <f7-button big raised @click="pressNumber(n+6)">{{n + 6}}</f7-button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <f7-button big raised @click="erasePassword()"><</f7-button>
                    </td>
                    <td>
                        <f7-button big raised @click="pressNumber(0)">0</f7-button>
                    </td>
                    <td>
                        <f7-button big raised @click="enterPassword()">OK</f7-button>
                    </td>
                </tr>
            </table>
            <f7-popup :opened=showPopup>
                <span @click="togglePopup"></span>
                <f7-block inner>
                    Пароль введен неверно. Повторить попытку?
                </f7-block>
                <f7-block inner no-hairlines>
                    <f7-grid>
                        <f7-col>
                            <f7-button round fill center @click="togglePopup">Да</f7-button>
                        </f7-col>
                        <f7-col>
                            <f7-button round fill center @click="goToStart=true" href="/main/">Нет</f7-button>
                        </f7-col>
                    </f7-grid>
                </f7-block>
            </f7-popup>
        </f7-block>
        <!--<f7-popup class="message-form-popup" :opened=showMsgForm @popup:closed="toggleMsgForm()">
            <f7-block inner no-hairlines>
                <f7-grid>
                    <f7-col>
                        <msg-form :options="{'tableId': 1}" />
                    </f7-col>
                </f7-grid>
            </f7-block>
        </f7-popup>-->
    </div>
</template>
<style scoped lang="less">
    .component-table {
        .button.button-big {
            font-size: 37px;
            height: 80px;
            line-height: 80px;
            width: 80px;
            border-radius: 50%;
        }

        text-align: center;
        .password-stars {
            width: 40%;
            margin: 0 auto;
            font-size: xx-large;

        }
        .star-active {
            opacity: 1;
        }
        .star-not-active {
            opacity: 0.2;
        }
        .phone-table {
            width: 80%;
            margin: 0 auto;
            td {
                text-align: center;
                padding: 10px;
            }
        }
    }
</style>
<script>
    import logout from './mixins/logout.js';
    /*import MForm from './message-form.vue';*/

    export default {
        data() {
            return {
                name: 'Набор пароля',
                pass: [],
                currentClick: 0,
                currentPassword: '',
                stars: [],
                showPopup: false,
                goToStart: false,
                /*showMsgForm: false*/
            }
        },
        components: {
            /*'msg-form': MForm*/
        },
        mixins: [logout],
        mounted() {
            this.initArray();
            this.bindKeyPress();
        },
        watch: {
            goToStart: function () {
                if (this.goToStart) {
                    this.showPopup = false;
                    this.goToStart = false;
                    this.logout();
                }
            }
        },
        methods: {
           /* toggleMsgForm(){
                this.showMsgForm = !this.showMsgForm;
            },*/
            pressNumber(num) {
                if (this.currentClick < 4) {
                    this.pass[this.currentClick] = true;
                    this.stars[this.currentClick] = 'star-active';
                    this.stars = this.stars.map((item) => item);
                    this.currentClick++;
                    this.currentPassword += num;
                    if (this.currentPassword.length === 4) {
                        this.checkUserPassword();
                    }
                }
            },

            /**
             * Проверка пароля по нажатию кнопки
             */
            enterPassword() {
                this.checkUserPassword();
            },

            /**
             * Очищает текущее поле ввода пароля
             */
            erasePassword() {
                this.currentPassword = '';
                this.currentClick = 0;
                this.initArray();
            },

            bindKeyPress() {
                window.addEventListener('keyup', this.pressNumberFromKeyboard);
            },
            unbindKeyPress() {
                window.removeEventListener('keyup', this.pressNumberFromKeyboard);
            },

            pressNumberFromKeyboard(evt) {
                if (evt.key === 'Enter') {
                    this.checkUserPassword();
                }
                if (evt.key >= 0 && evt.key < 9) {
                    this.pressNumber(evt.key);
                }
            },
            checkUserPassword() {
                let user = _.find(this.$store.state.waiters, (user) => {
                    return user.password === this.currentPassword;
                });

                if (user) {
                    this.unbindKeyPress();
                    this.$store.commit('SET_USER_LOG_IN_OUT', {'login': true});
                    this.$store.commit('SET_PASSWORD_PAGE', {'password': false});
                    this.$store.commit('SET_WAITER', {'waiter': user});
                    this.$f7.mainView.router.load({'url': '/tables/', 'reload': true});
                } else {
                    this.initArray();
                    this.currentClick = 0;
                    this.currentPassword = '';
                    this.$f7.alert(`Пользователя с указанным паролем не существует`, 'Ошибка');
                }
            },
            initArray() {
                const arr = [1, 2, 3, 4];
                this.pass = arr.map(item => false);
                this.stars = arr.map(item => 'star-not-active');
            },
            togglePopup() {
                this.showPopup = !this.showPopup;
            }
        }
    }
</script>