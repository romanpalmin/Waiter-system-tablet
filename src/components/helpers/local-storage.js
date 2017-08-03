export default {
    /** Загрузка данных в локалсторадж
     * @param data: {key, value}
     */
    lsPut: (data) => {
        console.log(`Добавление данных ${data.key} : ${data.value} в локалсторадж`);
        localStorage.setItem(data.key, data.value);
    },

    /**
     * Получение данных из локалстораджа
     * @param key: string
     */
    lsGet: (key) => {
        let result = '';
        console.log(`Добавление данных по ключу ${key} из локалстораджа`);
        result = localStorage.getItem(key);
        return result;
    },

    /**
     * Удаление данных из локалстораджа по ключу
     * @param key
     */
    lsRemove: (key) => {
        localStorage.removeItem(key);
    },

    /**
     * Очистка всего хранения
     */
    lsClear: () => {
        localStorage.clear();
    }
}