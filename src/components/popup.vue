<template>
    <div>
        <!-- Popup -->
        <f7-popup id="popup">
            <f7-view navbar-fixed>
                <f7-pages>
                    <f7-page>
                        <f7-navbar title="Popup">
                            <f7-nav-right>
                                <f7-link close-popup>Close</f7-link>
                            </f7-nav-right>
                        </f7-navbar>
                        <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto.
                            Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque
                            ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.
                        </f7-block>
                    </f7-page>
                </f7-pages>
            </f7-view>
        </f7-popup>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data() {
            return {
                msg: 'hello vue'
            }
        },
        mounted() {
            console.log('popup');
        }
    }
</script>