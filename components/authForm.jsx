import { useEffect, useState} from 'react';
import style from '../styles/authForm.module.css';
import Form from './Form';
import AuthFormSocialMedia from './authFormSocialMedia';
import axios from 'axios'
import section from './Section';
import icon from './Icon';

import Component from './Component';
import Compy from './Compy';

const AuthForm = () => {
    const Icon = new icon();
    const component = new Component();
    const Section  = new section();
    Section.params({
        cardClass: style.Card
    });
    
    Form.params({
        divClass: style.Element,
        labelClass: style.Label,
        inputClass: style.Input,
        checkboxClass: style.Checkbox,
        checkboxDivClass: style.checkBoxDiv,
        linkClass: style.Link,
        navClass: style.Nav
    });
    return (
        <>
            <div>
                {/* <Compy.Form submit={`submitForm`} mainClass={style.Main} content={<>
                    <Compy.H1 mainClass={style.Header} className={style.Header} content={'Mern Mart'}/>
                    <Compy.p mainClass={style.Card2} content={'d'} className={style.Card2} string={true}/>
                    <Compy.p mainClass={style.Card2} className={style.Card2} string={true} content={
                        <Compy.p mainClass={style.Link} className={style.link} content={<>
                            Now we can insert our custom tags into the content prop of our other custom tags  
                            <Icon.Apple/></>
                        }/>
                    }/>
                </>}/> */}
                <Compy.Form submit={`submitForm`} className={style.Main}>
                    <Compy.H2 className={style.Header} content={'Mern Mart'}/>
                    <Compy.P className={style.P} content={`Login`}/>
                    <Compy.FormInput className={style.Element} labelClass={style.Label} inputClass={style.Input} inputName={'email'} placeholder={'please enter your email'}/>
                    <Compy.FormInput className={style.Element} labelClass={style.Label} inputClass={style.Input} inputName={'password'} placeholder={'please enter your password'}/>
                </Compy.Form>
                <form onSubmit={submitForm} className={style.Main}>
                    <h1 className={style.Header}>Mern Mart</h1>
                    <Form.Get type={'Input'} name={'email'} text={'Email:'} placeholder={'Enter email...'}/>
                    <Form.Get type={'Input'} name={'password'} text={'Password:'} placeholder={'Enter password...'}/>
                    <div className={style.Section}>
                        <Form.Checkbox name={'remember-me'} text='Remember Me'/>
                        <Form.A name={'remember-me'} link={'/forgotPassword'} text='Forgot Password?'/>
                    </div>
                    <AuthFormSocialMedia/>
                </form>
            </div>
        </>
    )
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