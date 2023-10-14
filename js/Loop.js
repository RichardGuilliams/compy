function Loop(){
    // if(this._callBack) this._callBack();
    // requestAnimationFrame(Loop.prototype.update);
};

Loop.prototype.update = function(callback){
    function Update(){
        callback();
        requestAnimationFrame(Update);
    }
    requestAnimationFrame(Update);
}

export default Loop;


