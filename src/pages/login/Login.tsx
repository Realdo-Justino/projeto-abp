import React, { useRef } from 'react';
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
        console.log(inputLoginRef.current?.value)
        console.log(inputPasswordRef.current?.value)
    }

    return (
        <div className = 'MainPage'>
            <div className = "LoginForm">
                <div className = 'LoginTitle'>
                    <header>
                        <h1>Login</h1>
                    </header>
                </div>
                <div className = 'LoginBody'>
                    <form id = 'InputLogin' method = 'post' onSubmit = {loginSubmit}>
                        <input
                            ref = {inputLoginRef}
                            id = 'inputUser'
                            type = 'Text'
                            placeholder = 'Input your Login'
                            onKeyDown = {finishedEdittingLogin}
                        />
                        <input
                            ref = {inputPasswordRef}
                            id = 'inputPassword'
                            type = 'password'
                            placeholder = 'Input your Password'
                        />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
