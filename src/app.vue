<template>
    <!-- App -->
    <div id="app" class="app">
        <f7-views>
            <div class="center">
                <f7-button big round fill center link="/about/" title="Войти" color="darkgray"></f7-button>
            </div>
        </f7-views>
    </div>
</template>
<style scoped lang="less">
    .app {
        background-color: darkgray;
        width:100%;
        text-align: center;
        .center{
            height: 100px;
            margin: 0 auto;
            padding-top: 250px;
            width: 50%;
            color: white;
        }
    }
</style>
<script>
export default {}



</script>