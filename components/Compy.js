import React from "react";
import * as ReactDOMServer from 'react-dom/server';

//===================================================================
/* Component Manager
Used as a workaround for when the Component.prototype loses the this context due to being called through jsx tag format.
May have useful functionality added to it in the future.
*/
//===================================================================

function ComponentManager(){
    console.log('This is a static class.')
}

ComponentManager.setComponent = function(component){
    this.component = component;   
    // this.component.a = Component.prototype.a.bind(this.component);
}

//===================================================================
/* Component
This is the base class for all components created with Compy. 
It contains important functionality and parameters for component creation with Compy.
*/
//===================================================================

function Component(){
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

Component.prototype.parseJSX = function(string){
    return React.createElement('div', {dangerouslySetInnerHTML: { __html: string}})
}

Component.prototype.replacePlaceholderWithProp = function(jsxString, propsArr){
    const jsx = propsArr.map((prop, i) => {
        const regex = new RegExp(`{.${prop[0]}}`, 'g');
        if(prop[1] instanceof Object){
            return this.processContent(prop[1]);
        } 
        return jsxString = jsxString.replace(regex, prop[1]);
    })
    return jsx.pop();
}

Component.prototype.parse = function(element, args){
    let props = this.getProps(args);
    return <div className={args.mainClass}>
        {this.parseJSX(this.replacePlaceholderWithProp(this.elements[element], props))}
    </div>
    
}

Component.prototype.newComponent = function(componentName, component){
    this.elements[componentName] = component;
    Component.prototype[componentName] = function(){
        return ComponentManager.component.parse(componentName, arguments[0]);
    //     return ComponentManager.component[componentName.toLowerCase()](arguments[0]);
    }
    // Component.prototype[componentName.toLowerCase()] = function(props){
    //     return ComponentManager.component.parse(componentName, arguments[0]);
    // }
}

Component.prototype.createComponent = function(componentName, component, props){
    return Component.prototype[componentName] =  component;
}

Component.prototype.processContent = function(content){
    content = this.convertJSXToString(content)
    if(content.includes('<'))
    return content
// return this.convertJSXToString(content)
}

Component.prototype.convertJSXToString = function(content){
    return ReactDOMServer.renderToStaticMarkup(content)
}

Component.prototype.getProps = function(props){
    let propsArr = [];
    for ( const prop in props) propsArr.push([prop, props[prop]]);
    return propsArr;
}

Component.prototype.capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}
//===================================================================
/* Compy
Compy is the instance of Component and it is used to create components
that are used in react projects. It has the power to allow components to be dynamically created and modified at runtime. And Allows all components to be
currently held with compy to be modified in a variety of useful ways.
*/
//===================================================================

const Compy = new Component();

//================================================================
// Compy Components Simple
//================================================================


Compy.createComponent(`P`, (props) => <p style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</p>);
Compy.createComponent(`Div`, (props) => <div style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</div>);
Compy.createComponent(`A`, (props) => <a style={props.style} id={props.id} name={props.name ? props.name : props.id} href={props.link} className={props.className}>{props.content ? props.content : props.children}</a>);
Compy.createComponent(`Label`, (props) => <label htmlFor={props.for} style={props.style} id={props.name ? props.name : props.id} name={props.name ? props.name : props.id} href={props.link} className={props.className}>{props.content ? props.content : props.children}</label>);
Compy.createComponent(`Input`, (props) => <input id={props.id} name={props.name ? props.name : props.id} href={props.link} className={props.className} placeholder={props.placeholder}>{props.content ? props.content : props.children}</input>);
Compy.createComponent(`Form`, (props) => <form style={props.style} id={props.id} name={props.name ? props.name : props.id} onSubmit={props.submit} className={props.className}>{props.content ? props.content : props.children}</form>);
Compy.createComponent(`H1`, (props) => <h1 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h1>);
Compy.createComponent(`H2`, (props) => <h2 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h2>)
Compy.createComponent(`H2`, (props) => <h3 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h3>)
Compy.createComponent(`H2`, (props) => <h4 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h4>)
Compy.createComponent(`H2`, (props) => <h5 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h5>)
Compy.createComponent(`H2`, (props) => <h6 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h6>)
Compy.createComponent(`Span`, (props) => <span style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</span>)

Compy.createComponent(`FormInput`, (props) => <Compy.Div style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>
    <Compy.Label htmlFor={props.inputName} name={props.inputName} className={props.labelClass} content={Compy.capitalizeFirstLetter(props.inputName)}/>
    <Compy.Input type={props.type} id={props.inputName} name={props.inputName} className={props.inputClass} placeholder={props.placeholder}/>
</Compy.Div>)

export default Compy;