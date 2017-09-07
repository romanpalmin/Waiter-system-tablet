import store from './../../store/index';
import axios from 'axios';

export default {
    getData: async (options, url = store.getters.apiUrl) => {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        async function getDataStr(uuid) {
            const optionsUuid = {'ReqUuid': uuid};
            try {
                const preloadAns = await axios.get(store.getters.apiUrl, {params: optionsUuid});
                const answer = preloadAns.data[0];
                if (!answer || answer.status !== 1) {
                    console.log('Следующая попытка через 2 секунды');
                    await delay(1200);
                    return getDataStr(optionsUuid.ReqUuid);
                } else {
                    return new Promise((resolve) => {
                        const res = JSON.parse(answer.answerADM)[0];
                        resolve(res);
                    });
                }
            }
            catch (err){
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            }
        }
        try {
            const preloadUuid = await axios.get(url, {params: options});
            const recUuid = preloadUuid.data;
            return getDataStr(recUuid);
        }
        catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
}