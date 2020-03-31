export default function ScriptLoaderFunction(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.addEventListener('load', () => {
            return resolve();
        });
        script.addEventListener('error', (error) => {
            return reject(error);
        });
        document.body.appendChild(script);
    });
}
