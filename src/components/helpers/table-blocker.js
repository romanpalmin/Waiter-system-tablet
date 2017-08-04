/**
 * Методы для блокировки/разблокировки столов
 **/
import store from './../../store/index';
import axios from 'axios';
const url = store.state.settings.url;
const usrId = store.state.waiter;
console.log(usrId);
export default {
    blockTable: (options) => {
        let {cmd_garson = 'block', tableId: table, usrId, zakNo, uuid, callback} = options;

        let blockOptions = {
            cmd_garson, table, usrId, zakNo, uuid
        };
        console.log('Блокировка');
        console.log(blockOptions);
        console.log(url);
        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    unblockTable: (options) => {
        let {cmd_garson = 'unblock', tableId, usrId, zakNo, uuid, callback} = options;
        let unblockOptions = {
            cmd_garson, tableId, usrId, zakNo, uuid
        };
        console.log('Разблокировка');
        console.log(unblockOptions);
        console.log(url);
        if (callback && typeof(callback) === "function") {
            callback();
        }
    }
}
