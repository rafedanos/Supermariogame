
// loads the image for the sprire sheet, there is a promise so that the image can load while other code can execute; after the img is downloaded 
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        //activates image downloading
        image.src = url;
    });
}
// this function is used for loading levels from json
export function loadLevel(name) {
    return fetch(`/levels/${name}.json`)
    .then(r => r.json());
}