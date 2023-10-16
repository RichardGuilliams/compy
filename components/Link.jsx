import icon from './Icon';
const Icon = new icon();

function Link(){
    // console.log('This is a static class');
}

Link.params = (options) =>{
    Link.liClass = options.liClass;
    Link.linkClass = options.linkClass;
    Link.divClass = options.divClass;
    Link.textClass = options.textClass;
}

Link.URL = ({link, className}) => {
    return(
        <li className={Link.liClass}>
            <a className={className} href={`/${link}`}>{convertLinkToText(link)}</a>
        </li>
    )
}

Link.Phone = ({link, className, phoneNumber}) => {
    return(
        <li className={Link.liClass}>
            <a href={`tel:${phoneNumber}`}>{convertLinkToText(link)}</a>
        </li>
    )
}

Link.Email = ({link, email}) => {
    return(
        <li className={Link.liClass}>
            <a className={Link.linkClass} href={`mailto:${email}`}>{convertLinkToText(link)}</a>
        </li>
    )
}

Link.Messenger = ({link}) => {
    return(
        <li className={link.liClass}>
            <a className={Link.linkClass} id="facebook" href="https://www.facebook.com/richardguilliamswebdevelopement/">{convertLinkToText(link)}</a>
        </li>
    )
}

Link.IconWithText = ({link, icon}) => {
    return(
        <li className={link.liClass}>
            <Icon.Get IconName={icon} className={Link.iconClass}/>
            <a className={Link.linkClass} href={link}>{convertLinkToText(link)}</a>
        </li>
    )
}

Link.Icon = ({link, icon}) => {
    return(
            <a className={Link.linkClass} href={link}>
                <Icon.Get IconName={icon}/>
            </a>
    )
}

Link.URLWithText = ({link, text, linkText, keyId}) => {
    return(
        <div key={keyId} className={Link.divClass}>
            <p className={Link.textClass}>{text}</p>
            <a className={Link.linkClass} href={link}>{linkText}</a>
        </div>
    )
}

Link.Get = ({ LinkName, link, icon, phoneNumber, email, text, linkText, keyId}) => {
    return Link[LinkName]({link, icon, phoneNumber, email, text, linkText, keyId});
}

function convertLinkToText(link){
    let letters = link.split('');
    const firstLetter = letters.splice(0, 1)[0].toUpperCase();
    const followingLetters = letters.join('', ',');
    return firstLetter + followingLetters
}

export default Link