import style from '../styles/authForm.module.css';
import Link from './Link';
import Form from './Form';

const AuthFormSocialMedia = () => {
    Link.params({
        liClass: style.Element,
        textClass: style.Label,
        divClass: style.SignUp,
        linkClass: style.Link
    })

    return (
        <>
            <div className={style.NavSection}>
                <p className={style.Text}>Or Sign In With:</p>
                <Form.Nav links={[
                    <Link.Icon link={"/"} keyId={0} icon={'FacebookCircle'} divClass={style.SVGIcon}/>,
                    <Link.Icon link={"/"} keyId={1} icon={'InstagramThin'} divClass={style.Icon}/>,
                    <Link.Icon link={"/"} keyId={2} icon={'TwitterBird'} divClass={style.Icon}/>,
                    <Link.Icon link={"/"} keyId={3} icon={'Google'} divClass={style.Icon}/>
                ]}>
                </Form.Nav>
                <Link.URLWithText link={'signup'} text={`Don't have an account?`} linkText={'Sign Up'}/>
            </div>
        </>
    )
}

export default AuthFormSocialMedia;