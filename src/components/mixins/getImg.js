export default {
    methods: {
        getImages(imgName) {
            let src = '';
            switch (imgName) {
                case 'spinner':
                    src = 'http://10.10.182.11/ept/waiter-tablet/images/spinner.gif';
                    break;
                default:
                    src = '';

            }
            return src;
        }
    }
}