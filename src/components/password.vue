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
                        <f7-button big raised round @click="pressNumber(n)">{{n}}</f7-button>
                    </td>
                </tr>
                <tr>
                    <td v-for="n in 3">
                        <f7-button big raised round @click="pressNumber(n+3)">{{n+3}}</f7-button>
                    </td>
                </tr>
                <tr>
                    <td v-for="n in 3">
                        <f7-button big raised round @click="pressNumber(n+6)">{{n+6}}</f7-button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <f7-button big raised round @click="pressNumber(0)">0</f7-button>
                    </td>
                    <td></td>
                </tr>
            </table>
        </f7-block>
    </div>
</template>
<style scoped lang="less">
    .component-table {
        text-align: center;
        .password-stars {
            width: 40%;
            margin: 0 auto;
            font-size: xx-large;

        }
        .star-active{
            opacity: 1;
        }
        .star-not-active{
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
    export default{
        data(){
            return{
                name:'Набор пароля',
                pass:[],
                currentClick: 0,
                currentPassword: '',
                stars:[]
            }
        },
        mounted(){
            this.initArray();
        },
        watch:{
        },
        methods: {
            pressNumber(num){

                if (this.currentClick < 4 ){
                    this.pass[this.currentClick] = true;
                    this.stars[this.currentClick] = 'star-active';
                    this.stars = this.stars.map(function(item){return item});
                    this.currentClick++;
                    this.currentPassword += num;
                    if (this.currentPassword.length === 4){
                        this.checkUserPassword();
                    }
                }
                else {
                    console.log(this.currentPassword);
                }
            },
           checkUserPassword(){
                console.log(this.currentPassword);
                console.log(this.$store.state.waiter.password);
                if (this.currentPassword === this.$store.state.waiter.password){
                    console.log("Пароли совпадают, идем дальше");
                } else {
                    console.log("Пароли не совпадают");
                    this.initArray();
                    this.currentClick = 0;
                    this.currentPassword = '';
                }
           },
           initArray(){
                this.pass = [1,2,3,4].map(function(item){
                    return false;
                })
                this.stars = [1,2,3,4].map(function(item){
                    return 'star-not-active';
                })
           }
        }
    }
</script>