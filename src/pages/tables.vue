<template>
    <div>

        <f7-views>
            <f7-view>
                <f7-pages>
                    <f7-page cached=false>
                        <navbar/>
                        столы
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-views>
    </div>
</template>
<style scoped lang="less">

</style>
<script>
    import navbar from '../components/navbar-main.vue';
    import waitersTables from '../components/table-in-work';
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        mounted(){
        },
        components: {
            navbar,
            'waiters-tables': waitersTables
        }
    }



</script>