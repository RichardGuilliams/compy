function Nav(){
    this.initialize.apply(this, arguments);
}

Nav.prototype.initialize = function(count){
    this.count = count;
}