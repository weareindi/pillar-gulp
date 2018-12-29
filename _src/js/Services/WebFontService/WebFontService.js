import WebFontLoader from 'webfontloader';

export class WebFontService {
    constructor() {
        WebFontLoader.load({
            custom: {
                families: ['Roboto:n4'],
                urls: ['https://fonts.googleapis.com/css?family=Roboto:400&display=swap']
            },
            timeout: 30000
        });
    }
}
