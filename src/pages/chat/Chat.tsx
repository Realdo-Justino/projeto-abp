import React, { useEffect, useRef } from 'react';
import Methods from '../../const/methods';
import Message from './components/message/message';
import { useNavigate } from 'react-router-dom';
import { useMemoryContext } from '../../memory/memory';
import './Chat.css';
import Conversation from './components/conversation/conversation';
import ContactTitle from './components/title/title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';

function Chat() : JSX.Element {
    const navigate = useNavigate();

    const inputMessageRef = useRef<HTMLInputElement|null>(null);
    const chatRef = useRef<HTMLDivElement|null>(null);

    const { contacts } = useMemoryContext();
    const { focusedContact, focusOnContact} = useMemoryContext();
    const { conversations, addMessage } = useMemoryContext();

    const messageSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let messageText : string|undefined = inputMessageRef.current?.value;

        if(Methods.isEmpthyText(messageText)) return;

        addMessage(focusedContact.id, messageText!);
        inputMessageRef.current!.value = '';
    }

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
        }
    }, [conversations]);

    const focusOnContactById = (e: React.MouseEvent<HTMLDivElement>, contactId: number) => {
        for(let currentContact of contacts) {
           if(currentContact.id === contactId)  {
                focusOnContact(currentContact)
           }
        }
    }

    const goToContatos = () => {
        navigate('/contato');
    }

    const goToGrupo = () => {
        navigate('/grupo');
    }


    return (
        <div className='container'>
            <div className="side-bar">
                <h1>Conversas</h1>
                {contacts.map((currentContact) => (
                    Conversation(currentContact, focusOnContactById)
                ))}
                <div className='empthyBox' />
                <div className="button-row">
                    <button className='floating-button' onClick={goToContatos}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                    <button className='floating-button' onClick={goToGrupo}>
                        <FontAwesomeIcon icon={faUserGroup} />
                    </button>
                </div>
            </div>
            <div className="chat-container">
                <div className='title'>
                    {ContactTitle(focusedContact)}
                </div>

                <div ref={chatRef} className="list">
                    {conversations.get(focusedContact.id)!.map((message, id) => (Message(id, message)))}
                </div>

                <form id="userInputForm" onSubmit={messageSubmit}>
                    <input
                        ref={inputMessageRef}
                        className="userInput"
                        placeholder="Digite sua mensagem..."
                        />
                    <button className="inputMessage" type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
