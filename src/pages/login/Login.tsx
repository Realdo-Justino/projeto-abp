import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Methods from '../../const/methods';
import './Login.css';

function LoginPage() {
    const navigate = useNavigate();
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

        let loginText : string|undefined = inputLoginRef.current?.value;
        let passwordText : string|undefined = inputPasswordRef.current?.value;


        if(Methods.isEmpthyText(inputLoginRef.current?.value)) {
            alert('Campo de login Vazio');
            return;
        }
        if(Methods.isEmpthyText(passwordText)) {
            alert('Campo de Senha Vazio');
            return;
        }


        if((loginText  === 'test')||(passwordText === '1234')) {
            navigate('/chat');
        } else {
            alert('Login/Senha Invalidos');
            return;
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
