// sprite sheets allow for use of one picture for many different characters so that an img does not need to be loaded for every new character
 export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width =width;
        this. height= height;
        this.tiles = new Map();
    }
    // buffers allow for the browser to keep the img , this buffer is for the tiles 
    define(name, x, y, width, height) {
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x,
                y,
                width,
                height,
                0,
                0,
                height,
                width);
        this.tiles.set(name, buffer)
    }

    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    // this actually draws out the tile
    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }
    // this is for multiplying the size of the tile so that it can fit the whole screen and doesn't need to be multiplied every time 
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}