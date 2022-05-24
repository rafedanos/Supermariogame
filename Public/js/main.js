import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js'

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y= y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}
// creating objects for canvas, screen comes from index.html, second line defines the rectangle
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([marioSprite, sprites, level]) => {
    level.backgrounds.forEach(background => {
        drawBackground(background, context, sprites);
    });

    marioSprite.draw('idle', context, 64, 64)
});