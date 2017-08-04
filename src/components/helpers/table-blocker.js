/**
 * Методы для блокировки/разблокировки столов
 **/
import store from './../../store/index';
import axios from 'axios';



export default {
    blockTable: (options) => {
        options.cmd_garson = 'block';
        console.log('Блокировка');
        ajax(options);
    },
    unblockTable: (options) => {
        options.cmd_garson = 'unblock';
        console.log('Блокировка');
        ajax(options);
    }
}

function ajax(options) {
    const url = store.getters.apiUrl;
    let {cmd_garson, tableId: table, usrID = store.state.waiter.id, zakNo, uuid, callback} = options;
    let currentOptions = {
        cmd_garson, table, usrID, zakNo, uuid
    };

    console.log(currentOptions);
    axios.get(url, {params:currentOptions})
        .then(function (response) {
            console.log(response);
            console.log(response.data);
            console.log(response.data.status);
            if (callback && typeof(callback) === "function") {
                callback();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}