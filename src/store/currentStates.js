export default {
    settings:{
        server:'',
        ip: '10.100.50.248',
        userName: '',
        password:'',
       /* server:'http://10.10.182.11/',*/
        urlSmallImage:'img/',
        urlBigImage:'images/',
        urlBackImage: 'images',
        images:{
            logo: 'beer-zha.png',
            close: 'close.png'
        },
        testMode:false,
        isTablet: true,
        showButtons: true,
        updateStatePeriod: 1000*60*15,  // время обновления меню секунда * кол-во секунд * кол-во минут
        updateOrderFrequency: 1000*15, // время обновления состояния корзины
        whereTabletFrequency: 1000*60, // определение положения планшета
        cryptoword: '101010',
        language: 'ru'
    },
    appState:{
        TableNumberPrimary: '555',
        TableNumberAdditional:'',
        TabletNumber: '',
        BleLabels: [],
        MenuPoints:[],
        Category:{
            "332020":{
                name: 'Бургеры',
                currentState:[]
            },
            "342020":{
                name: 'СОСИДЖ ФЭКТОРИ',
                currentState:[]
            },
            "352020":{
                name: 'BBQ',
                currentState:[]
            },
            "392020":{
                name: 'БЭЙКС ЭНД СНЭКС',
                currentState:[]
            },
            "412020":{
                name: '4STARTS',
                currentState:[]
            },
            "422020":{
                name: 'АЙСИ-СПАЙСИ',
                currentState:[]
            },
            "432020":{
                name: 'НАПИТКИ',
                currentState:[]
            },
            "462020":{
                name: 'ПИВО',
                currentState:[]
            },
            "472020":{
                name:"ЗАВТРАКИ",
                currentState:[]
            },
            "482020":{
                name:"БИЗНЕС ЛАНЧ",
                currentState:[]
            }

        },
        show: {
            name: 'Развлечения',
            currentState:[]
        },
        orders:{
            name: 'Корзина',
            currentState:[]
        }
    }
}
