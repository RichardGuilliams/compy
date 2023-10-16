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
    }
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

Component.prototype.setStyles = function(styles){
    this.styles = styles;
}
//===================================================================
/* Compy
Compy is the instance of Component and it is used to create components
that are used in react projects. It has the power to allow components to be dynamically created and modified at runtime. And Allows all components to be
currently held with compy to be modified in a variety of useful ways.
*/
//===================================================================

const Compy = new Component();

//===================================================================
// Compy Components Simple
//===================================================================

// Compy Icons // ===================================================

Component.prototype.getIcons = function(props){
    const elements = [];
    for(let i = 0; i < props.list.length; i++){
        elements.push(Component.prototype[props.list[i]](props))}
        return elements.map((element, i) => <li key={i} >{element}</li>)
};


Compy.createComponent(`HomeIcon`, (props) => <svg className={props.className}  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>)

Compy.createComponent(`P`, (props) => <p style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</p>);
Compy.createComponent(`Div`, (props) => <div style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</div>);
Compy.createComponent(`Nav`, (props) => <nav style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</nav>);
Compy.createComponent(`A`, (props) => <a style={props.style} id={props.id} name={props.name ? props.name : props.id} href={props.link} className={props.className}>{props.content ? props.content : props.children}</a>);
Compy.createComponent(`Label`, (props) => <label htmlFor={props.for} style={props.style} id={props.name ? props.name : props.id} name={props.name ? props.name : props.id} href={props.link} className={props.className}>{props.content ? props.content : props.children}</label>);
Compy.createComponent(`Input`, (props) => <input type={props.type} id={props.id} name={props.name ? props.name : props.id} href={props.link} className={props.className} placeholder={props.placeholder}>{props.content ? props.content : props.children}</input>);
Compy.createComponent(`Form`, (props) => <form style={props.style} id={props.id} name={props.name ? props.name : props.id} onSubmit={props.submit} className={props.className}>{props.content ? props.content : props.children}</form>);
Compy.createComponent(`H1`, (props) => <h1 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h1>);
Compy.createComponent(`H2`, (props) => <h2 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h2>)
Compy.createComponent(`H2`, (props) => <h3 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h3>)
Compy.createComponent(`H2`, (props) => <h4 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h4>)
Compy.createComponent(`H2`, (props) => <h5 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h5>)
Compy.createComponent(`H2`, (props) => <h6 style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</h6>)
Compy.createComponent(`Span`, (props) => <span style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</span>)
Compy.createComponent(`Li`, (props) => <li style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{props.content ? props.content : props.children}</li>)

Compy.createComponent(`Ul`, (props) =>{
    return <ul style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>{
        props.content ? props.content : props.children ? props.children :
        !props.links instanceof Object ? props.links.map((link, i) => <li key={i}>{link}</li>) : props.links}
    </ul>
})



Compy.createComponent(`FormInput`, (props) => <Compy.Div style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>
    <Compy.Label htmlFor={props.inputName} name={props.inputName} className={props.labelClass} content={Compy.capitalizeFirstLetter(props.inputName)}/>
    <Compy.Input type={props.type} id={props.inputName} name={props.inputName} className={props.inputClass} placeholder={props.placeholder}/>
</Compy.Div>)

Compy.createComponent('FormCheckBox', (props) => <Compy.Div style={props.style} id={props.id} name={props.name ? props.name : props.id} className={props.className}>
    <Compy.Input type={'checkBox'} id={props.inputName} name={props.inputName} className={props.inputClass}/>
    <Compy.Label htmlFor={props.inputName} name={props.inputName} className={props.labelClass} content={props.text}/>
</Compy.Div>)

Compy.createComponent('NavBar', (props) => <Compy.Nav className={props.className} name={props.name} id={props.id}>
    <Compy.Ul className={props.ulClass} links={props.links}/>
</Compy.Nav>);

export default Compy;