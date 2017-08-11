import store from './../../store/index';
import axios from 'axios';
import ajax from './ajax';

export default {
    addStringsToOrder: () => {
        const currentOrder = getCurrentOrder();
    }
}

function getCurrentOrder(){
    console.log('Текущее состояние заказа');
    console.log(store.state.orders.current);
    let filtered = _.filter(store.state.orders.current, (item) => {
        return item.tableId === store.state.currentTable
    });
    if (filtered.length === 0) return;
    if (filtered.length > 1) {
        let groupByProps = [];
        groupByProps.push({el: filtered[0], count: 1});
        for (let idx = 1; idx < filtered.length; idx++) {
            for (let innerIdx = 0; innerIdx < groupByProps.length; innerIdx++) {
                if (
                    filtered[idx].item.code === groupByProps[innerIdx].el.item.code &&
                    filtered[idx].item.code2 === groupByProps[innerIdx].el.item.code2 &&
                    filtered[idx].course === groupByProps[innerIdx].el.course &&
                    //filtered[idx].guestId === groupByProps[innerIdx].el.guestId &&
                    filtered[idx].tableId === groupByProps[innerIdx].el.tableId &&
                    filtered[idx].waiterId === groupByProps[innerIdx].el.waiterId &&
                    filtered[idx].modsPosition === groupByProps[innerIdx].el.modsPosition &&
                    filtered[idx].modsCommon === groupByProps[innerIdx].el.modsCommon
                ) {
                    groupByProps[innerIdx].count++;
                    break;
                } else {
                    if (innerIdx === groupByProps.length - 1) {
                        groupByProps.push({el: filtered[idx], count: 1});
                        break;
                    }
                }
            }
            if (idx === filtered.length - 1) {
                return groupByProps;
            }
        }
    }
    else {
        return [{el: filtered[0], count: 1}];
    }
}