export function Element(){
    this.initialize.apply(this, arguments);
}

Element.prototype.initialize = function(){

}

Element.prototype._styles = new Map([]);

Element.prototype.AddStyle = function(id, style){
    this._styles.set(id, style);
}

Element.prototype.getStyle = function(id){
    return this._styles;
}

Element.prototype.A = ({link, className, id, name, content}) => {
    return Element.prototype.a(link, className, id, name, content);
}

Element.prototype.a = (link, className, id, name, content) => {
    return <a href={link} className={className}>{content}</a>
}

Element.prototype.get = function( type, ...args ){
    return this[type](args);
}

Element.prototype.Get = ({type, id, divClass, text}) => {
    return this[type](type, id, divClass, text);
}

export default Element;