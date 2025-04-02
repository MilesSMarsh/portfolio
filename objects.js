export class Object{
    dawnColor;
    dayColor;
    duskColor;
    nightColor;
    constructor(dwn, day, dsk, ngt){
        this.dawnColor = dwn;
        this.dayColor = day;
        this.duskColor = dsk;
        this.nightColor = ngt;
    }
    DrawObject(){
        console.log("Draw me!");
    }
}

export class Clouds extends Object{
    constructor(dwn, day, dsk, ngt){
        super(dwn, day, dsk, ngt);
    }
    DrawObject(x, y, size, cloudSize, color){
        for(let i = 1; i < cloudSize; i++){
            let xOffset = random(-10, -10);
            let yOffset = random(-5, -5);
            fill(color("#333333"));
            circle(x+xOffset, y+yOffset, size);
            fill(color(color));
            circle(x+xOffset + 4, y+yOffset + 4, size*0.8);
        }
    }
}