// Functions
import ScriptLoaderFunction from './Functions/ScriptLoaderFunction/ScriptLoaderFunction';

// Services
import {WebFontService} from './Services/WebFontService/WebFontService';
import {ViewportHeightService} from './Services/ViewportHeightService/ViewportHeightService';

// Run
Promise.all([
    new WebFontService().register(),
    new ViewportHeightService().register()
])
.then(() => {
    return ScriptLoaderFunction(`${window.themeDir}/_assets/js/additional.js`);
})
.catch((error) => {
    console.error(error);
});
