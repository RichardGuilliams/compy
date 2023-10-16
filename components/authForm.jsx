import { useEffect, useState} from 'react';
import style from '../styles/authForm.module.css';
import axios from 'axios'
import Compy from './Compy';

const AuthForm = () => {
    setStyles();
    return (
        <>
            <Compy.Form submit={submitForm} className={style.Main}>
                <Compy.H2 className={style.Header} content={'Mern Mart'}/>
                <Compy.P className={style.P} content={`Login`}/>
                <Compy.FormInput className={style.Element} labelClass={style.Label} inputClass={style.Input} inputName={'email'} placeholder={'please enter your email'}/>
                <Compy.FormInput className={style.Element} labelClass={style.Label} inputClass={style.Input} inputName={'password'} placeholder={'please enter your password'}/>
                <Compy.Div className={style.Section}>
                    <Compy.FormCheckBox name={'remember-me'} className={style.CheckBoxDiv} labelClass={style.Label} inputClass={style.Checkbox} inputName={'password'} text={'Remember Me'}/>
                    <Compy.A  className={style.CheckBoxDiv} link={'/'} content={'Forgot Password?'}/>
                </Compy.Div>
                <Compy.Div className={style.NavSection}>
                    <Compy.P className={style.P} content={'Or sign in with'}/>
                    <Compy.NavBar ulClass={style.Nav} links={[<Compy.getIcons list={['IconHome', 'IconHome']} className={style.SVGIcon}/>]}/>
                </Compy.Div>
            </Compy.Form>
        </>
    )
}

const setStyles = () => {
    Compy.setStyles({
        pageClass: style.Page,
        sectionClass: style.Section,
        divClass: style.Div,
        containerClass: style.Container,
        inputClass: style.Input,
        inputCheckboxClass: style.InputCheckbox,
    })
}

const submitForm = async(event) => {
    event.preventDefault();
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:8000/api/v1/users/login',
            data: {
                email,
                password
            }
        });

        console.log(res.data.status);
        if(res.data.status === 'success') {
            localStorage.setItem('authToken', res.data.token);
            localStorage.setItem('userRole', res.data.data.user.role);
            if(res.data.data.user.role === 'admin') return window.location.assign('/admin-panel');
            if(res.data.data.user.role === 'user') return window.location.assign('/user-panel');
        }
    }
    catch(err){
        window.location.assign('/signup');
    }
    email = null;
    password = null;
}

export default AuthForm;