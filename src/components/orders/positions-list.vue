<template>
    <div>
        <f7-block v-for="item in currentList" class="position-item" @click="addPositionToOrder(item)" :key="item.code">
            <div @click="addPositionToOrder(item)">
                <f7-card class="card">

                    <f7-card-content class="img-wrapper" :inner="false" :style="getStyle(item)">
                        <!--<span class="price-wrapper">{{item.price}} руб.</span>-->
                        <f7-badge color="black">{{item.price}} руб.</f7-badge>
                    </f7-card-content>
                    <f7-card-footer><span>{{getName(item)}}</span></f7-card-footer>
                </f7-card>
            </div>
        </f7-block>
    </div>
</template>
<style scoped lang="less">
    .position-item {
        background-color: #CFD5DA;
        width: 130px;
        float: left;
        height: 150px;
        .img-wrapper {
            width: 105px;
            height: 105px;
            border: 3px solid #636357;
            border-radius: 20%;
            background-size: cover;
            text-align: right;
            .price-wrapper {
                font-weight: bolder;
                color: #000;
                background-color: #fff;
                border-radius: 20%;
                padding: 3px;
            }
        }
        .card {
            background-color: #fafafa
        }

        .card-footer {
            text-align: center;
            display: block;
            color: #000;
        }
    }

</style>
<script>
    export default{
        data(){
            return{
                currentList: [],
                name:'this component'
            }
        },
        props: ['CurrentPositionsList'],
        methods:{
            getStyle(item){
                let url = 'http://10.10.182.11/images/' + item.urlImage;
                let style = `;background-image: url(${url});`;
                return style;
            },
            getName(item){
                return item.name_ru;
            },
            addPositionToOrder(item){
                if (this.$store.state.currentGuest && this.$store.state.currentGuest > 0 ){
                    let payload = {
                        item: item,
                        course: 0,
                        waiterId: this.$store.state.waiter.id,
                        tableId: this.$store.state.currentTable,
                        guestId: this.$store.state.currentGuest,
                        ts: Date.now()
                    };
                    console.log(payload.guestId);
                    this.$store.dispatch('ADD_POSITION_TO_ORDER', payload);
                }
            }
        },
        mounted(){
            this.currentList = this.CurrentPositionsList;
        }
    }

</script>