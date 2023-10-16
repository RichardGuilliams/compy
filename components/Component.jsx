import React from 'react';

export default function Component(){
    this.initialize.apply(this, arguments);
}

Component.prototype.initialize = function(){
    ComponentManager.setComponent(this);
    // this.component
    this.elements = {};
    this.parts = [];
    this.styles = new Map([]);
    this.components = new Map([]);
}

Component.prototype.setStyle = function(name, style){
    this.styles.set(name, style);
}

Component.prototype.getStyle = function(name){
    return this.styles.get(name);
};

Component.prototype.addStyle = function(name, style){
    this.styles.get(name)[style.name] = style.value;
}
// Component.prototype.components = new Map([]);

Component.prototype.setComponent = function(name, component){
    this.components.set(name, component);
}

Component.prototype.getComponent = function(name){
    return this.components.get(name);
}

Component.prototype.createComponent = function(name){
    this.setStyle(name, {});
    this.setComponent(name, this);
    const elements = this.components.get(name).parts.map((element, i) => element)
    Component.prototype[name] = function(props){
        var propsArr = []
        for (const prop in props) propsArr.push([prop, props[prop]]);
        return (<div className={props.mainClass}>
            {elements.map((element, i) => <div key={i}>{parseJSX(replacePlaceholderWithProp(element, propsArr))}</div>)}
        </div>)
    }
    Component.prototype[name.toLowerCase()] = function(props){
        return Component.prototype[name](props);
    }
    Component.prototype[`_${name}`] = function(props){
        return `${Component.prototype[name](props)}`;
    }
    this.parts = [];
}

function parseJSX(string){
    return React.createElement('div', {dangerouslySetInnerHTML: { __html: string}})
}

function replacePlaceholderWithProp(jsxString, propsArr) {
    const jsx = propsArr.map((prop, i) => {
        const regex = new RegExp(`{.${prop[0]}}`, 'g');
        // if(prop[1].includes == '/>') prop[1] = parseJSX(prop[1]);
        return jsxString = jsxString.replace(regex, prop[1]);
    })
    return jsx.pop();
}

Component.prototype.renderComponent = function(name){
    this[name]();
}

Component.prototype.addPart = function(component, props){
    this.parts.push(component);
    return this
};

Component.prototype.addStyle = function(property, ){
    console.log(this.parts[this.parts.length - 1]);
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
        requestAnimationFrame(Update);
    }
    requestAnimationFrame(Update);
}

Component.prototype.addStyle = function(id, propertyName, style){
    document.getElementById(id).style[propertyName] = style;
    let element = document.getElementById(id)
    return element;
}

Component.prototype.parse = function(element, args){
    let props = this.getProps(args);
    return <div className={args.mainClass}>
        {parseJSX(replacePlaceholderWithProp(this.elements[element], props))}
    </div>
    
}

Component.prototype.newComponent = function(componentName, component){
    Component.prototype['log'] = (string) => console.log(string);
    Component.prototype[componentName] = function(){
        return ComponentManager.component[componentName.toLowerCase()](arguments[0]);
    }
    Component.prototype[componentName.toLowerCase()] = function(props){
        this.elements[componentName] = component;
        return ComponentManager.component.parse(componentName, arguments[0]);
    }
}

//============================================================================================================
// Elements
//============================================================================================================

//component, link, className, id, name, content
Component.prototype.A = function(){
    return ComponentManager.component.a(arguments[0]);
};

Component.prototype.a = function(){
    this.elements['a'] = '<a href={.link} className={.className}>{.content}</a>'
    return this.parse('a', arguments[0]);
}

Component.prototype.Div = function(){
    return ComponentManager.component.div(arguments[0]);
}
    
Component.prototype.div = function(){
    this.elements['div'] = '<div className={.className}>{.content}</div>'
    return this.parse('div', arguments[0])
}

Component.prototype.getProps = function(props){
    let propsArr = [];
    for ( const prop in props) propsArr.push([prop, props[prop]]);
    return propsArr;
}
//============================================================================================================
// Elements
//============================================================================================================

function ComponentManager(){
    console.log('This is a static class.')
}

ComponentManager.setComponent = function(component){
    this.component = component;   
    // this.component.a = Component.prototype.a.bind(this.component);
}