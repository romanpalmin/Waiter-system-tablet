<template>
    <div>
        {{getPositionName}}
        <div class="buttons-panel">

            <f7-grid>
                <f7-col>Количество</f7-col>
                <f7-col>Курс</f7-col>
                <!-- <f7-col>Мод-ры</f7-col>-->
                <f7-col>Гости</f7-col>
                <f7-col>Удалить</f7-col>
            </f7-grid>
            <f7-grid>
                <f7-col>
                    <f7-buttons color="gray">
                        <f7-button @click="minus()">-1</f7-button>
                        <f7-button @click="calc()">Калькулятор</f7-button>
                        <f7-button @click="plus()">+1</f7-button>
                    </f7-buttons>
                </f7-col>
                <f7-col>
                    <f7-button color="gray" open-popover data-popover=".popover-course"><!--{{getPositionCourse}-->Курс
                    </f7-button>
                </f7-col>
                <!--  <f7-col>
                      &lt;!&ndash;<f7-button color="gray" open-popover data-popover=".popover-mods">Модификаторы</f7-button>&ndash;&gt;
                      <f7-button color="gray" open-popover data-popover=".popover-mods">Мод-ры</f7-button>
                  </f7-col>-->
                <f7-col>
                    <f7-button color="gray" open-popover data-popover=".popover-guests" @click="eraseCountDish()">
                        Гости
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button color="gray" @click="remove()">X</f7-button>
                </f7-col>
            </f7-grid>
            <hr/>
            <f7-grid>
                <f7-col>Модификаторы</f7-col>
            </f7-grid>
            <f7-grid>
                <f7-col>Общие</f7-col>
                <template v-if="showModsPositionButton">
                    <f7-col>Товарные</f7-col>
                </template>
            </f7-grid>
            <f7-grid>
                <f7-col>
                    <f7-button color="gray" open-popover class="mods-common-button" data-popover=".popover-mods-common" @click="openModsCommon()">
                        {{getModsCommonName}}
                    </f7-button>
                </f7-col>
                <template v-if="showModsPositionButton">
                    <f7-col>
                        <f7-button color="gray" open-popover data-popover=".popover-mods-position"
                                   @click="openModsPosition()">{{getModsPositionName}}
                        </f7-button>
                    </f7-col>
                </template>
            </f7-grid>
            <br/>
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
            <div class="popover-content">
                <f7-list>
                    <f7-list-item>
                        <f7-label>Модификатор товара</f7-label>
                    </f7-list-item>
                    <f7-list-item>
                        <f7-input type="select">
                            <option value="1">Mal11e</option>
                            <option value="1">Fema11le</option>
                        </f7-input>
                    </f7-list-item>
                    <f7-list-item>
                        <f7-label>Общий модификатор</f7-label>
                    </f7-list-item>
                    <f7-list-item>
                        <f7-input type="select">
                            <option value="1">Ma1221le</option>
                            <option value="1">Fe2122male</option>
                        </f7-input>
                    </f7-list-item>
                </f7-list>
            </div>
        </f7-popover>
        <f7-popover class="popover-guests">
            Гости
            <div class="popover-content">
                <f7-block>
                    <f7-buttons color="gray">
                        <f7-button @click="guestCountDish('minus')">-1</f7-button>
                        <f7-button>{{getCurrentDishCount}}</f7-button>
                        <f7-button @click="guestCountDish('plus')">+1</f7-button>
                    </f7-buttons>
                </f7-block>
                <f7-list>
                    <f7-list-item v-for="n in getGuestsCount" :key="n">
                        <f7-link href="#" class="close-popover list-of-guests">Гость {{n}}</f7-link>
                    </f7-list-item>
                </f7-list>
            </div>
        </f7-popover>
        <f7-popover class="popover-mods-common">
            <div class="popover-content">
                <f7-list>
                    <f7-list-item v-for="item in getModsCommon" :key="item.code">
                        <f7-link href="#" class="close-popover list-of-mods-common" :data-id="item.code">{{item.name}}
                        </f7-link>
                    </f7-list-item>
                </f7-list>
            </div>
        </f7-popover>
        <f7-popover class="popover-mods-position">
            <div class="popover-content">
                <f7-list>
                    <f7-list-item v-for="item in getModsPosition" :key="item.code">
                        <f7-link href="#" class="close-popover list-of-mods-common" :data-id="item.code">{{item.name}}
                        </f7-link>
                    </f7-list-item>
                </f7-list>
            </div>
        </f7-popover>

    </div>
</template>
<style scoped lang="less">
    .buttons-panel {
        border-top: 1px solid;
        border-bottom: 1px solid;
        /*height: 70px;*/
        text-align: center;
    }

    .popover-content {
        /*width: 50%;*/
        margin: 0 auto;
        /*padding: 20px;*/
        .list-of-guests {
            text-align: center;
            margin: 0 auto;
        }

    }
    .mods-common-button{
        max-width: 250px;
        margin: 0 auto;
    }
</style>
<script>
    export default{
        data(){
            return{
                name:'this component',
                currentDishCount: 1,
                showModsPositionButton: false
            }
        },
        computed:{
            getPositionName: function(){
                return this.items.item.name;
            },
            getModsCommon: function(){
                return this.$store.state.modsCommon;
            },
            getModsPosition: function(){
                let res =  _.filter(this.$store.state.modsPosition, (mods)=>{return mods.code.substring(0,2) === this.items.item.mod});
                this.showModsPositionButton = !(res.length === 0);
                return res;
            },
            getPositionIndex: function(){
                const self = this;
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
            },
            getGuestsCount: function(){
                return this.$store.state.guestsCount;
            },
            getCurrentDishCount: function(){
                return this.currentDishCount;
            },
            getModsCommonName: function(){
                let res = _.find(this.$store.state.modsCommon,(item)=>{return item.code === ' '});
                if (this.items && (this.items.modsCommon === '' || this.items.modsCommon === ' ')){
                    if (res && res.code){
                        return res.name;
                    }
                } else {
                    res = _.find(this.$store.state.modsCommon,(item)=>{return item.name === this.items.modsCommon});
                     if (res && res.code){
                        return res.name;
                    }
                }
            },
            getModsPositionName: function(){
                let res = 'Без модификатора';
                /*if (this.items.modsPosition && this.items.modsPosition !== ''){
                    // todo в случае хранения кода модификатора делаем поиск по нему и возвращаем name
                    return this.items.modsPosition;
                } else {
                    return res;
                }*/
                return this.items.modsPosition && this.items.modsPosition !== '' ? this.items.modsPosition : res;
            }
        },
        props: ['items', 'count', 'it'],
        watched:{
            getPositionIndex: function(){
                console.log('change');
            }
        },
        mounted(){

        },
        methods:{
            getGuestsDish(){
                return this.currentDishCount;
            },

            getPayload(){
                return {
                    item: this.items.item,
                    course: this.items.course,
                    waiterId: this.items.waiterId,
                    tableId: this.items.tableId,
                    guestId: this.items.guestId,
                    modsPosition: this.items.modsPosition,
                    modsCommon: this.items.modsCommon
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

            calc(){
                let payload = this.getPayload();
                this.$f7.alert('Здесь будет калькулятор для ' + payload.item.name, 'Пользовательский ввод количества', ()=>{
                        this.$f7.alert('Выбрано значение ' + '%nnn%', 'Результат');
                });
            },
            remove(){
                //this.$store.commit('CHANGE_COUNT_ORDER_STRING', {'index': this.getPositionIndex, 'inc': -this.items.count});
                //this.$store.dispatch('CALCULATE_SUMMARY_OF_CURRENT_ORDER');
                let payload = this.getPayload();
                this.$store.dispatch('REMOVE_POSITION_STRING_FROM_ORDER', payload);
            },
            setCourse(course){
                console.log('Устанавливаем курс');
                //console.log(this.getPositionIndex);
                //this.$store.commit('SET_CURRENT_COURSE', {'index': this.getPositionIndex, 'course': course});
            },
            eraseCountDish(){
                console.log('Сбрасываем текущее значение');
                this.currentDishCount = 1;
                console.log('Сбрасываем текущее значение 2 ' + this.getCurrentDishCount);
                console.log('Сбрасываем текущее значение 3 ' + this.currentDishCount);
            },
            guestCountDish(type){
                console.log('Текущее значение: ' + this.currentDishCount);
                switch(type){
                    case 'plus':
                            if (1 === 1) {
                                console.log('Старое значение: ' + this.currentDishCount);
                                this.currentDishCount++;
                                console.log('Новое значение: ' + this.currentDishCount);
                            }
                            break;

                    case 'minus':
                            this.currentDishCount--;
                            break;

                    case 'one':
                            this.currentDishCount = 1;
                            break;

                    default: break;
                }
            },
            openModsCommon(){
                console.log(this.items);
            },
            openModsPosition(){
                console.log(this.items);
            }
        }
    }












</script>