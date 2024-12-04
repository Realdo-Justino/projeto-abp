import React, { useEffect, useRef, useState } from 'react';
import Methods from '../../const/methods';
import Message from './components/message/message';
import { useNavigate } from 'react-router-dom';
import { useMemoryContext } from '../../memory/memory';
import './Chat.css';

function Chat() : JSX.Element {
    const navigate = useNavigate();

    const inputMessageRef = useRef<HTMLInputElement|null>(null);
    const chatRef = useRef<HTMLDivElement|null>(null);

    const [messages, setMessages] = useState<string[]>([]);

    const { contacts, addContact, removeContact } = useMemoryContext();

    const messageSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let messageText : string|undefined = inputMessageRef.current?.value;

        if(Methods.isEmpthyText(messageText)) return;

        setMessages(prevMessages => [...prevMessages, messageText!]);
        inputMessageRef.current!.value = '';
    }

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
        }
    }, [messages]);

    const goToContatos = () => {
        navigate('/contato');
    }

    const goToGrupo = () => {
        navigate('/grupo');
    }

    return (
        <div className='container'>
            <div className="side-bar">
                {contacts.map((currentContact) => (
                    <label>{currentContact.name}</label>
                ))}
            </div>
            <div className="chat-container">
                <div ref={chatRef} className="list">
                    {messages.map((message, id) => (Message(id, message)))}
                </div>

                <form id="userInputForm" onSubmit={messageSubmit}>
                    <input
                        ref={inputMessageRef}
                        className="userInput"
                        placeholder="Digite sua mensagem..."
                        />
                    <button className="inputMessage" type="submit">Enviar</button>
                </form>

                <button className="go-to-contatos" onClick={goToContatos}>
                    Ver Contatos
                </button>

                <button className="go-to-grupo" onClick={goToGrupo}>
                    Criar Grupo
                </button>
            </div>
        </div>
    );
}

export default Chat;
