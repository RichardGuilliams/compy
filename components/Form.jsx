import Link from './Link';

function Form(){};

Form.params = function(options){
    Form.divClass = Form.divClass || options.divClass;
    Form.labelClass = Form.labelClass || options.labelClass;
    Form.inputClass = Form.inputClass || options.inputClass;
    Form.checkboxClass = Form.checkboxClass || options.checkboxClass;
    Form.checkboxDivClass = Form.checkboxDivClass || options.checkboxDivClass;
    Form.linkClass = Form.linkClass || options.linkClass;
    Form.navClass = Form.navClass || options.navClass;
}

Form.Input = ({name, inputType, placeholder, text}) => {
    return(
        <div className={Form.divClass}>
            <label className={Form.labelClass} htmlFor={name}>{text}</label>
            <input type={inputType} className={Form.inputClass} id={name} name={name} placeholder={placeholder}/>
        </div>
    )
}

Form.Checkbox = ({name, text}) => {
    return(
        <div className={Form.checkboxDivClass}>
            <input className={Form.checkboxClass} id={name} name={name} type='checkBox'/>
            <label className={Form.labelClass} htmlFor={name}>{text}</label>
        </div>
    )
}

Form.A = ({text, link}) => {
    return(
        <div className={Form.divClass}>
            <a className={Form.linkClass} href={link}>{text}</a>
        </div>
    )
}

Form.Get = ({type, inputType, name, text, placeholder}) =>{
    return Form[type]({inputType, name, text, placeholder});
}

Form.Nav = (params) => {
    return(
        <nav>
            <ul className={params.className}>
                {params.links.map((link, i) => {
                    return <li key={i}>
                        {link}
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Form;