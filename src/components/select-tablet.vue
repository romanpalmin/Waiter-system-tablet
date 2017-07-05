<template>
    <div class="popup-select-tablet">
        <f7-list>
            <f7-list-item v-for="n in 40" :key="n">
                <f7-link href="#" class="load-order" @click="selectTablet(n)">Планшет №{{n}}</f7-link>
            </f7-list-item>
        </f7-list>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    export default{
        data(){
            return{
                name:'this component',
                selectedTablet: 0
            }
        },
        mounted(){
            const self = this;
            this.$$('.load-order').on('click', function () {
                self.$f7.showPreloader('Загрузка данных с планшета №' + self.selectedTablet);
                setTimeout(function () {
                    self.$f7.hidePreloader();
                    self.$f7.closeModal('.select-tablet');
                }, 2000);
            });
        },
        methods:{
            selectTablet(tabletId){
                console.log(tabletId);
                this.selectedTablet = tabletId;
            }
        }
    }

</script>