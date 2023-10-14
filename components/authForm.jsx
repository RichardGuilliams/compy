import { useEffect, useState} from 'react';
import style from '../styles/authForm.module.css';
import Form from './Form';
import AuthFormSocialMedia from './authFormSocialMedia';
import axios from 'axios'
import section from './Section';
import Loop from '../js/Loop';
import Icon from './Icon';

import Component from './Component';

const AuthForm = () => {
    const component = new Component();
    component.addPart(`<div>{.value}  {.hi}</div>`)
    component.createComponent('MyDiv', {value: 'd'});
    const Section  = new section();
    const ItemCard1 = new section();
    ItemCard1.addElement(<h1>{}</h1>, 'header')
        .addElement(<p>It was dynamically built with js</p>, 'p1')
        .addChild(<p>This was added as well</p>)
        .addElement(<p>Because of this we have an additional way to create cards</p>, 'p2');

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
            <component.MyDiv hi={'this is the hi value'} value={'This is the new value'}/>
            {ItemCard1.renderElements()}
            {Section.card('card-0', style.Card, 'Hello this is a card')}
            {Section.card('card-1',  style.Main, 'Card 2')}
            {Section.get('card', 'card-2', style.Card, 'Hi')}
            <Section.Card id={'card-2'} divClass={style.Card} content={<Icon.Apple/>}/>
            <div>
                <form onSubmit={submitForm}  className={style.Main}>
                    <h1 className={style.Header}>Mern Mart</h1>
                    <Form.Get type={'Input'} name={'email'} text={'Email:'} placeholder={'Enter email...'}/>
                    <Form.Get type={'Input'} name={'password'} text={'Password:'} placeholder={'Enter password...'}/>
                    <div className={style.Section}>
                        <Form.Checkbox name={'remember-me'} text='Remember Me'/>
                        <Form.A name={'remember-me'} link={'/forgotPassword'} text='Forgot Password?'/>
                    </div>
                    <button className={style.Button}>Sign In</button>
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