<template>
    <div>
        {{getPositionName}}
        <br/>
        <div class="buttons-panel">
            <!-- <f7-grid>
                 <f7-col>Количество</f7-col>
                 <f7-col>Курс</f7-col>
                 &lt;!&ndash; <f7-col>Мод-ры</f7-col>&ndash;&gt;
                 <f7-col>Удалить</f7-col>
             </f7-grid>-->
            <f7-grid>
                <f7-col>
                    <f7-buttons color="gray">
                        <!-- <f7-button @click="minus()">-1</f7-button>-->
                        <!--<f7-button @click="calc()" class="btn-calc"></f7-button>-->
                        <f7-button class="btn-calc" open-popover data-popover=".popover-count"
                                   @click="openCount()"></f7-button>
                        <!-- <f7-button @click="plus()">+1</f7-button>-->
                    </f7-buttons>
                </f7-col>
                <f7-col>
                    <f7-button color="gray" open-popover data-popover=".popover-course" @click="openCourse()">
                        {{getPositionCourse}}
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button color="gray" open-popover class="mods-common-button" data-popover=".popover-mods-common"
                               @click="openModsCommon()"> МО
                    </f7-button>
                </f7-col>
                <template v-if="showModsPositionButton">
                    <f7-col>
                        <f7-button color="gray" open-popover data-popover=".popover-mods-position"
                                   @click="openModsPosition()">M1
                        </f7-button>
                    </f7-col>
                </template>
                <f7-col>
                    <f7-button color="gray" @click="remove()">X</f7-button>
                </f7-col>
            </f7-grid>
            <br/>
        </div>

        <f7-popover class="popover-course">
            <span class="course-title">Выберите курс</span>
            <div class="popover-content">
                <f7-grid class="course">
                    <f7-col>
                        <f7-buttons color="blue">
                            <f7-button @click="setCourse(1)">1</f7-button>
                            <f7-button @click="setCourse(2)">2</f7-button>
                            <f7-button @click="setCourse(3)">3</f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
                <f7-grid class="course">
                    <f7-col>
                        <f7-buttons color="blue">
                            <f7-button @click="setCourse(4)">4</f7-button>
                            <f7-button @click="setCourse(5)">5</f7-button>
                            <f7-button @click="setCourse(6)">6</f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
                <f7-grid class="course">
                    <f7-col>
                        <f7-buttons color="blue">
                            <f7-button @click="setCourse(7)">7</f7-button>
                            <f7-button @click="setCourse(8)">8</f7-button>
                            <f7-button @click="setCourse(9)">9</f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
            </div>
        </f7-popover>
        <f7-popover class="popover-mods-common">
            <div class="popover-content">
                <f7-list>
                    <f7-list-item v-for="item in getModsCommon" :key="item.code">
                        <f7-link href="#" class="close-popover list-of-mods-common" :data-id="item.code"
                                 @click="updateModsCommon(item.code)">{{item.name}}

                        </f7-link>
                    </f7-list-item>
                </f7-list>
            </div>
        </f7-popover>
        <f7-popover class="popover-mods-position">
            <div class="popover-content">
                <f7-list>
                    <f7-list-item v-for="item in getModsPosition()" :key="item.code">
                        <f7-link href="#" class="close-popover list-of-mods-common" :data-id="item.code"
                                 @click="updateModsPosition(item.code)">{{item.name}}

                        </f7-link>
                    </f7-list-item>
                </f7-list>
            </div>
        </f7-popover>

        <f7-popover class="popover-count">
            <span class="course-title">Выберите количество</span>
            <div class="popover-content">
                <f7-grid class="count">
                    <f7-col>
                        <f7-buttons color="blue">
                            <f7-button @click="setCount(n)" v-for="n in 5">{{n}}</f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
                <f7-grid class="count">
                    <f7-col>
                        <f7-buttons color="blue">
                            <f7-button @click="setCount(n+5)" v-for="n in 5">{{n+5}}</f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
                <f7-grid class="count">
                    <f7-col>
                        <f7-buttons color="blue">
                            <f7-button @click="setCount(0.25)">0.25</f7-button>
                            <f7-button @click="setCount(0.5)">0.5</f7-button>
                            <f7-button @click="setCount(0.75)">0.75</f7-button>
                        </f7-buttons>
                    </f7-col>
                </f7-grid>
            </div>
        </f7-popover>
    </div>
</template>
<style scoped lang="less">
    .buttons-panel {
        text-align: center;
        padding-top: 10px;
        .btn-calc {
            background-image: url(http://10.10.182.11/ept/waiter-tablet/images/calc-new.png);
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
        .button {
            width: 60px;
            height: 60px;
            line-height: 60px;
            margin: 0 auto;
            font-size: 17pt;
        }
    }

    .popover-content {
        /*width: 50%;*/
        margin: 0 auto;

        .list-of-guests {
            text-align: center;
            margin: 0 auto;
        }

        .course {
            padding: 1px;
            .button {
                height: 60px;
                line-height: 60px;
                font-size: 17pt;
            }
        }
        .count {
            .button {
                height: 60px;
                line-height: 60px;
                font-size: 17pt;
                padding: 1px;
            }
        }

    }

    .course-title {
        font-size: x-large;
        height: 100px;
        display: block;
        line-height: 100px;
    }

    .mods-common-button {
        max-width: 250px;
        margin: 0 auto;
    }
</style>
<script>
    export default{
        data(){
            return {
                name: 'this component',
                currentDishCount: 1,
                showModsPositionButton: false
            }
        },
        computed: {
            getPositionName: function () {
                let positionString = this.items.item.name;
                if (this.items.modsCommon && this.items.modsCommon !== '' && this.items.modsCommon !== ' '){
                    positionString +=  ' / ' + this.getModsCommonName;
                }
                let res = _.find(this.$store.state.modsPosition, (mod) => {
                    return mod.code === this.items.modsPosition
                });
                if (res && res.name){
                    positionString += ' / ' + res.name;
                }
                if (this.items.course){
                    positionString += ' / К.' + this.items.course;
                }
                return positionString;
            },
            getModsCommon: function () {
                return this.$store.state.modsCommon;
            },
            getPositionIndex: function () {
                const self = this;
                return _.findIndex(this.$store.state.orders.current, function (items) {
                    return self.items.item.code === items.item.code;
                });
            },
            getPositionCourse: function () {
                if (this.$store.state.orders.current[this.getPositionIndex].course) {
                    return 'К.' + this.$store.state.orders.current[this.getPositionIndex].course;
                }
                else {
                    return 'К.0';
                }
            },
            getGuestsCount: function () {
                return this.$store.state.guestsCount;
            },
            getCurrentDishCount: function () {
                return this.currentDishCount;
            },
            getModsCommonName: function () {
                let res = _.find(this.$store.state.modsCommon, (item) => {
                    return item.code === ' '
                });
                if (this.items && (this.items.modsCommon === '' || this.items.modsCommon === ' ')) {
                    if (res && res.code) {
                        return res.name;
                    }
                } else {
                    res = _.find(this.$store.state.modsCommon, (item) => {
                        return item.code === this.items.modsCommon
                    });
                    if (res && res.code) {
                        return res.name;
                    }
                }
            },
            getModsPositionName: function () {
                let src = 'Без модификатора';
                let res = {};
                res = _.find(this.$store.state.modsPosition, (mod) => {
                    return mod.code === this.items.modsPosition
                });
                return res && res.name ? res.name : src;//this.items.modsPosition && this.items.modsPosition !== '' ? this.items.modsPosition : res;
            }
        },
        props: ['items', 'count', 'it'],
        watched: {
            getPositionIndex: function () {
                console.log('change');
            },
            items: function () {
                console.log('Изменился контекст');
            }
        },
        mounted(){

        },
        methods: {
            getModsPosition(){
                let res = _.filter(this.$store.state.modsPosition, (mods) => {
                    return mods.code.substring(0, 2) === this.$store.state.currentPayload.item.mod
                });
                this.showModsPositionButton = !(res.length === 0);
                return res;
            },

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
                    modsCommon: this.items.modsCommon,
                    currentCount: this.items.currentCount
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
                this.$f7.alert('Здесь будет калькулятор для ' + payload.item.name, 'Пользовательский ввод количества', () => {
                    this.$f7.alert('Выбрано значение ' + '%nnn%', 'Результат');
                });
            },
            remove(){
                let payload = this.getPayload();
                this.$store.dispatch('REMOVE_POSITION_STRING_FROM_ORDER', payload);
            },
            setCourse(course){
                const payload = {
                    params: this.$store.state.currentPayload,
                    newValue: course
                };
                console.log(payload);
                this.$store.commit('UPDATE_STRING_COURSE', payload);
                this.$f7.closeModal('.popover-course');
            },
            eraseCountDish(){
                this.currentDishCount = 1;
            },
            guestCountDish(type){
                console.log('Текущее значение: ' + this.currentDishCount);
                switch (type) {
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

                    default:
                        break;
                }
            },
            openModsCommon(){
                this.$store.commit('SET_CURRENT_PAYLOAD', this.getPayload());

            },
            openModsPosition(){
                this.$store.commit('SET_CURRENT_PAYLOAD', this.getPayload());
            },
            openCourse(){
                console.log(this.getPayload());
                this.$store.commit('SET_CURRENT_PAYLOAD', this.getPayload());
            },
            openCount(){
                this.$store.commit('SET_CURRENT_PAYLOAD', this.getPayload());
            },
            updateModsCommon(newValue){
                const payload = {
                    params: this.$store.state.currentPayload,
                    newValue: newValue
                };
                this.$store.commit('UPDATE_COMMON_MODS', payload)
            },
            updateModsPosition(newValue){
                const payload = {
                    params: this.$store.state.currentPayload,
                    newValue: newValue
                };
                this.$store.commit('UPDATE_POSITIONS_MODS', payload)
            },
            setCount(newCount){
                let payload = this.$store.state.currentPayload;
                let currentCount = this.getCurrentCount();
                let difference = currentCount - newCount;
                if (newCount > 0 && newCount < 1){
                    console.log('Добавляем строку с неполным блюдом');
                    payload.currentCount = newCount;
                    this.$store.commit('ADD_NEW_ORDER_STRING', payload);
                }
                else if (difference > 0){
                    console.log(`Удаляем ${difference} строк`);
                    this.deleteStrings(difference, payload);
                }
                else if (difference < 0) {
                    console.log(`Добавляем ${-difference} строк`);
                    this.addStrings(-difference, payload);
                }
                this.$f7.closeModal('.popover-count');
            },

            /**
                Удаление и добавление заданного количества строк из заказа с текущими выбранными параметрами
            */
            deleteStrings(count, payload){
                console.log(`Удаление ${count} строк`);
                console.log(payload);
                for (let i = 0; i < count; i++){
                    this.$store.dispatch('REMOVE_POSITION_FROM_ORDER', payload);
                }
            },

            addStrings(count, payload){
                console.log('Количество: ' + count);
                console.log(payload);
                for (let i = 0; i < count; i++){
                    this.$store.commit('ADD_NEW_ORDER_STRING', payload);
                    this.$store.dispatch('CALCULATE_ORDER_SUMMARY', payload.tableId);
                }
            },
            /************************************************

            */

            getCurrentCount(callback){
                let payload = this.$store.state.currentPayload;
                console.log(this.$store.state.orders.current);
                let currentOrdersString = _.filter(this.$store.state.orders.current, (item) => {
                    return (item.course === payload.course &&
                            item.item.code === payload.item.code &&
                            item.waiterId === payload.waiterId &&
                            item.tableId === payload.tableId &&
                            item.modsCommon === payload.modsCommon &&
                            item.currentCount === payload.currentCount &&
                            item.modsPosition === payload.modsPosition &&
                            item.guestId === payload.guestId
                    )
                });
                console.log(currentOrdersString);
                console.log('Текущее количество: ' + currentOrdersString.length);
                return currentOrdersString.length;
                /*if (callback && typeof(callback) === "function") {
                    callback();
                }*/
            }
        }
    }





</script>