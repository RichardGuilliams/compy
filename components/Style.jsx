function Style(){
    this.initialize.apply(this, arguments);
}

Style.prototype.initialize = function(){
    this.rgb = { r: 0, g: 0, b: 0, a: 0 };
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.fontSize = '0px';
    this.color;
}