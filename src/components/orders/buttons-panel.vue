<template>
    <div>
        {{getPositionName}}
        <div class="buttons-panel">

            <f7-grid>
                <f7-col>Количество</f7-col>
                <f7-col>Курс</f7-col>
                <f7-col>Модификаторы</f7-col>
                <f7-col>Гости</f7-col>
            </f7-grid>
            <f7-grid>
                <f7-col>
                    <f7-buttons color="gray">
                        <f7-button @click="minus()">-1</f7-button>
                        <f7-button @click="remove()">X</f7-button>
                        <f7-button @click="plus()">+1</f7-button>
                    </f7-buttons>
                </f7-col>
                <f7-col>
                    <f7-button color="gray" open-popover data-popover=".popover-course">{{getPositionCourse}}
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button color="gray" open-popover data-popover=".popover-mods">Модификаторы</f7-button>
                </f7-col>
                <f7-col>
                    <f7-button color="gray">Гости</f7-button>
                </f7-col>
            </f7-grid>
        </div>

        <f7-popover class="popover-course">
            Выберите курс
            <div class="popover-content">
                <f7-grid>
                    <f7-col>
                        <f7-buttons color="gray">
                            <f7-button @click="setCourse(1)">1</f7-button>
                            <f7-button @click="setCourse(2)">2</f7-button>
                            <f7-button @click="setCourse(3)">3</f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
                <f7-grid>
                    <f7-col>
                        <f7-buttons color="gray">
                            <f7-button @click="setCourse(4)">4</f7-button>
                            <f7-button @click="setCourse(5)">5</f7-button>
                            <f7-button @click="setCourse(6)">6</f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
                <f7-grid>
                    <f7-col>
                        <f7-buttons color="gray">
                            <f7-button @click="setCourse(7)">7</f7-button>
                            <f7-button @click="setCourse(8)">8</f7-button>
                            <f7-button @click="setCourse(9)">9</f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
            </div>
        </f7-popover>
        <f7-popover class="popover-mods">
            Модификаторы
            <div class="popover-content">666</div>
        </f7-popover>
    </div>
</template>
<style scoped lang="less">
    .buttons-panel {
        border-top: 1px solid;
        border-bottom: 1px solid;
        height: 70px;
        text-align: center;
    }

    .popover-content {
        width: 50%;
        margin: 0 auto;
        padding: 20px;
    }
</style>
<script>
    export default{
        data(){
            return{
                name:'this component'
            }
        },
        computed:{
            getPositionName: function(){
                return this.items.item.name;
            },
            getPositionIndex: function(){
                const self = this;
                //console.log('rebuild index');
                return _.findIndex(this.$store.state.orders.current, function(items){
                    return self.items.item.code === items.item.code;
                });
            },
            getPositionCourse: function(){
                if (this.$store.state.orders.current[this.getPositionIndex].course){
                    return this.$store.state.orders.current[this.getPositionIndex].course;
                }
                else {
                    return 'Курс';
                }
            }
        },
        props: ['items'],
        watched:{
            getPositionIndex: function(){
                console.log('change');
            }
        },
        mounted(){
        },
        methods:{
            getPayload(){
                return {
                    item: this.items.item,
                    course: this.items.course,
                    waiterId: this.items.waiterId,
                    tableId: this.items.tableId,
                    guestId: this.items.guestId
                };
            },
            plus(){
                let payload = this.getPayload();
                this.$store.dispatch('ADD_POSITION_TO_ORDER', payload);
            },
            minus(){
                let payload = this.getPayload();
                this.$store.dispatch('REMOVE_POSITION_FROM_ORDER', payload);
            },
            remove(){
                //this.$store.commit('CHANGE_COUNT_ORDER_STRING', {'index': this.getPositionIndex, 'inc': -this.items.count});
                //this.$store.dispatch('CALCULATE_SUMMARY_OF_CURRENT_ORDER');
                let payload = this.getPayload();
                this.$store.dispatch('REMOVE_POSITION_STRING_FROM_ORDER', payload);
            },
            setCourse(course){
                console.log(this.getPositionIndex);
                this.$store.commit('SET_CURRENT_COURSE', {'index': this.getPositionIndex, 'course': course});
            }
        }
    }





</script>