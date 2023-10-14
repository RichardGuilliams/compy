import React from 'react';

function Component(){
    this.initialize.apply(this, arguments);
}

Component.prototype.initialize = function(){
    this.parts = [];
    this.components = new Map([]);
}

// Component.prototype.components = new Map([]);

Component.prototype.setComponent = function(component, id){
    return this.components.set(id, component);
}

Component.prototype.getComponent = function(id){
    return this.components.get(id);
}

Component.prototype.createComponent = function(name, props){
    this.setComponent(this, name, this.parts);
    const elements = this.components.get(name).parts.map((element, i) => element)
    Component.prototype[name] = function(props){
        let propsArr = []
        for (const prop in props){
            propsArr.push([prop, props[prop]]);
        }
        function parseJSX(string){
            return React.createElement('div', {dangerouslySetInnerHTML: { __html: string}})
        }
        function replacePlaceholderWithProp(jsxString) {
            const jsx = propsArr.map((prop, i) => {
                const regex = new RegExp(`{.${prop[0]}}`, 'g');
                return jsxString = jsxString.replace(regex, prop[1]);
            })
            return jsx.pop();
        }
        console.log(props);
        return <>
            {elements.map((element, i) => <div key={i}>{parseJSX(replacePlaceholderWithProp(element))}</div>)}
        </>
    }
    this.parts = [];
}

Component.prototype.renderComponent = function(name){
    this[name]();
}

Component.prototype.addPart = function(component, props){
    console.log(component);
    // props.map(prop => component.props[prop] = null);
    this.parts.push(component);
    return this
};

Component.prototype._elements = new Map([]);

Component.prototype.setElement = function(element, id){
    return this._elements.set(id, element);
}

Component.prototype.getElement = function(id){
    return this._elements.get(id);
}

Component.prototype._styles = new Map([]);

Component.prototype.setStyle = function(id, style){
    return this._styles.set(id, style);
}

Component.prototype.getStyle = function(id){
    return this._styles.get(id);
}

Component.prototype.addStyle = function(id, propertyName, style){
    document.getElementById(id).style[propertyName] = style;
    let element = document.getElementById(id)
    return console.log(element);
}

Component.prototype.update = function(){
    function Update() {
        console.log('updating this element')
        requestAnimationFrame(Update);
    }
    requestAnimationFrame(Update);
}

Component.prototype.addStyle = function(id, propertyName, style){
    document.getElementById(id).style[propertyName] = style;
    let element = document.getElementById(id)
    return element;
}

export default Component;