import Compositor from './Compositor.js';
import {loadLevel} from './loaders.js'
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';
import { createBackgroundLayer } from './Layers.js';


// creating objects for canvas, screen comes from index.html, second line defines the rectangle
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos){
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 20; ++i) {
            sprite.draw('idle', context, pos.x + i * 16, pos.y);
        }
    };
}



Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([marioSprite, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    //starting to animate mario
    const pos = {
        x: 0,
        y: 0,
    };
    
    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);

    function update() {
    comp.draw(context);
    pos.x += 2;
    pos.y += 2;
    // request animation frame is a built in funcion supported by browsers and it is the best way of displaying animations in a browser
    requestAnimationFrame(update);
    }
    update();
});