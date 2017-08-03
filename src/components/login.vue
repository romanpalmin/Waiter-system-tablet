<template>
    <div>
        <!-- Login Screen -->
        <f7-login-screen id="login-screen" :opened="showLogin">
            <f7-view>
                <f7-pages>
                    <f7-page login-screen>
                        <f7-login-screen-title>Login</f7-login-screen-title>
                        <f7-list form>
                            <f7-list-item>
                                <f7-label>Username</f7-label>
                                <f7-input name="username" placeholder="Username" type="text"
                                          v-model="userName"></f7-input>
                            </f7-list-item>
                            <f7-list-item>
                                <f7-label>Password</f7-label>
                                <f7-input name="password" type="password" placeholder="Password"
                                          v-model="password"></f7-input>
                            </f7-list-item>
                        </f7-list>
                        <f7-list><!--close-login-screen-->
                            <f7-list-button @click="logIn" title="Sign In"></f7-list-button>
                            <f7-list-label>
                                <p>Click Sign In to close Login Screen</p>
                            </f7-list-label>
                        </f7-list>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-login-screen>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data() {
            return {
                showLogin: false,
                userName: '',
                password: ''
            }
        },
        props: ['show'],
        watch: {
            showLogin: function () {
                console.log('change...1');
            },
            show: function () {
                console.log('!!!!!!');
            }
        },
        mounted() {
            console.log('showLogin: ' + this.showLogin);
        },
        updated() {

        },

        methods: {
            logIn() {
                this.showLogin = false;
                console.log('UserName: ' + this.userName);
                console.log('Password: ' + this.password);
                console.log('showLogin: ' + this.showLogin);
            }
        }
    }
</script>