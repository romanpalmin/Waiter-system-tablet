<template>
    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
        <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
            <f7-navbar v-if="$theme.ios" title="Left Panel" sliding></f7-navbar>
            <f7-pages>
                <f7-page class="f7-page">
                    <f7-block inner class="f7-block">
                        <p class="test">Left panel content goes here</p>
                    </f7-block>
                    <f7-block-title>Load page in panel</f7-block-title>
                    <f7-list>
                        <f7-list-item link="/about/" title="About"></f7-list-item>
                        <f7-list-item link="/form/" title="Form"></f7-list-item>
                    </f7-list>
                    <f7-block-title class="test">Load page in main view</f7-block-title>
                    <f7-list>
                        <f7-list-item link="/about/" title="About" link-view="#main-view"
                                      link-close-panel></f7-list-item>
                        <f7-list-item link="/form/" title="Form" link-view="#main-view"
                                      link-close-panel></f7-list-item>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-panel>
</template>
<style scoped lang="less">
    .f7-block, .f7-page {
        .test {
            color: #fffe3f;
        }
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        mounted(){
            console.log('left-panel');
        }
    }
</script>
