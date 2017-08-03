import state from '../../store/currentStates';
import axios from 'axios';
import crypt from './encryption.js';

// выбираем номер планшета

//const tabletName = '01';
const tabletName = '02';
state.settings.server = `http://tab${tabletName}:${tabletName}@${state.settings.ip}/`;
state.settings.userName = `tab${tabletName}`;
state.settings.password = `${tabletName}`;
//-------------------------------

const ip = state.settings.ip;
const server = `${ip}/`;
const user = state.settings.userName;
const password = state.settings.password;
const baseUrl = 'menu/hs/model?';
let ajaxServerUrlShort = `http://${user}:${password}@${server}${baseUrl}`;
let uuid = '';
if (typeof device !== 'undefined') {
    uuid = device.uuid;
    //alert(device.uuid);
} else {
    uuid = '10e00be6a70f0bcc'
}
console.log(ajaxServerUrlShort);

function executeRequest(url, callback) {
    axios.get(ajaxServerUrlShort + url)
        .then(function (response) {
            if (callback && typeof(callback) === "function") {
                callback(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getUrl(operation) {
    let url = '';
    let language = state.settings.language === 'en' ? '&lang=en' : '';
    switch (operation.name) {
        case 'categories':
            url = 'groups=';
            break;
        case 'positions':
            url = `groups=${operation.catId}&category=${operation.catId}`;
            break;
        case 'show':
            url = 'groups=1&shows=1';
            break;
        case 'order':
            url = 'groups=1&korzina=1';
            break;
        case 'clearOrder':
            url = 'groups=342020&delcart=1&tovar=1';
            break;
        case 'deleteFromOrder':
            url = `groups=342020&tovar=${operation.id}&dellcartitem=${operation.stroka}`;
            break;
        case 'addToOrder':
            url = `groups=1&addcart=1&tovar=${operation.positionId}&table=${operation.tableId}`;
            break;
        case 'rebuildTable':
            url = `groups=1&addcart=1&rebuildtable=${operation.stringOfCodes}`;
            break;
        case 'getTabletNumber':
            url = `groups=&usr=1`;
            break;
        case 'getBle':
            url = `groups=&ble=1`;
            break;
        case 'whereTablets':
            url = `tablets=1`;
            break;
        case 'showLamp':
            console.log(operation);
            console.warn('Для работы заменить no_groups на groups');
            url = `no_groups=1&tovar=1&yacheika=${operation.id}`;
            break;
        default:
            url = '';
            break;
    }
    return url !== '' ? url + '&uuid=' + crypt(uuid) + language : '';
}

export default {
    exec: function (operation, callback) {
        let url = getUrl(operation);
        return executeRequest(url, callback);
    }
};