import style from '../styles/components.module.css';
import element from './Element';
import Component from './Component';

const Element = new element();

function Section(){
    this.initialize.apply(this, arguments);
}

Section.prototype = Object.create(Component.prototype);
Section.prototype.constructor = Section;

Section.prototype.initialize = function(options){
    Component.prototype.initialize.call(this, arguments);
    this.cardCount = 0;
    this.className = '';
    this.cards = [];
    this.Elements = [];

    if(!options) return;
    this.imgClass = options.imgClass || '';
    this.sectionClass = options.sectionClass || '';
    this.cardClass = options.cardClass || style.Card;
}

Section.prototype.params = function(options){
    this.cardCount = 0;
    this.imgClass = this.imgClass ? this.imgClass : options.imgClass;
    this.sectionClass = this.sectionClass ? this.sectionClass : options.sectionClass;
    this.cardClass = this.cardClass ? this.cardClass : options.cardClass;
}

Section.prototype.elements = new Map([]);
    
Section.prototype.addStyle = function(id, propertyName, style){
    document.getElementById(id).style[propertyName] = style;
    let element = document.getElementById(id)
    return element;
}

Section.prototype.card = function(){
    const args = arguments.length === 1 ? arguments[0] : arguments;
    const id = args[0] ||`card-${this.cardCount}`;
    this.cardCount += 1;
    this.setStyle(id, args[3]);

    return this.createElement(
        <div style={this.getStyle(id)} id={id} className={args[1] ? args[1] : this.cardClass}>
            <Element.A link='home' content={'Link To Something'}/>
            {Element.a()}
            {args[2]}
        </div>
    , id);
}

Section.prototype.createElement = function(element, id){
    this.elements[id] = element;
    return element;
};

Section.prototype.Card = function({ id, divClass, content, style}) {
    return Section.prototype.card([id, divClass, content, style]);
}

Section.prototype.get = function( type, ...args ){
    return this[type](args);
}

Section.prototype.renderElements = function(){
    return <div className={this.className}>
        {this.Elements.map((el, i) => {
            return <div key={i}>
                {el}
            </div>
        })}
    </div>
}

Section.prototype.addElement = function(element, name){
    console.log(element.props.id);
    this.elements.set(name, element);
    this.Elements.push(element);
    return this;
};

Section.prototype.addChild = function(child, id){
    // debugger;
    console.log(this.Elements[this.Elements.length - 1])
    return this
}

Section.prototype.getChild = function(){

}

Section.prototype.Get = function({type, id, divClass, text}){
    return this[type]();
}

export default Section;