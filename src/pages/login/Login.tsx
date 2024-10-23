import React, { useRef } from 'react';
import Methods from '../../const/methods';
import './Login.css';

function LoginPage() {
    const inputLoginRef = useRef<HTMLInputElement|null>(null);
    const inputPasswordRef = useRef<HTMLInputElement|null>(null);

    const finishedEdittingLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            inputPasswordRef.current?.focus();
        }
    }

    const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let loginText : string|undefined = inputLoginRef.current?.value;            alert('Campo de login Vazio');
        let passwordText : string|undefined = inputPasswordRef.current?.value;            alert('Campo de login Vazio');


        if(Methods.isEmpthyText(loginText)) {
            alert('Campo de login Vazio');
            return;
        }
        if(Methods.isEmpthyText(passwordText)) {
            alert('Campo de Senha Vazio');
            return;
        }


        if((loginText  === 'test')||(passwordText === '1234')) {
            console.log('Go to the next the next screen');
        }
    }

    return (
        <div className = 'MainPage'>
            <div className = "LoginForm">
                <header>
                    <h1>Login</h1>
                </header>
                <form id = 'FormLogin' method = 'post' onSubmit = {loginSubmit}>
                    <input
                        ref = {inputLoginRef}
                        className = 'InputField'
                        type = 'Text'
                        placeholder = 'Input your Login'
                        onKeyDown = {finishedEdittingLogin}
                    />
                    <input
                        ref = {inputPasswordRef}
                        className = 'InputField'
                        type = 'password'
                        placeholder = 'Input your Password'
                    />
                    <button id = 'LoginButton'>Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
