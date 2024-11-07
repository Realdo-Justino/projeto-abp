import React, { useEffect, useRef, useState } from 'react';
import Methods from '../../const/methods';
import Message from './components/message/message';
import './Chat.css';

function Chat() : JSX.Element {
    const inputMessageRef = useRef<HTMLInputElement|null>(null);
    const chatRef = useRef<HTMLDivElement|null>(null);

    const [messages, setMessages] = useState<string[]>([]);

    const messageSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let messageText : string|undefined = inputMessageRef.current?.value;

        if(Methods.isEmpthyText(messageText)) return;

        setMessages(prevMessages => [...prevMessages, messageText!]);
        inputMessageRef.current!.value = '';
        chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
    }

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
        }
      }, [messages]
    );

    return (
        <div className = "chat-container">
            <div ref = {chatRef} className = "list">
                {messages.map((message, id) => (Message(id, message)))}
            </div>
            <form id = "userInputForm" onSubmit = {messageSubmit}>
                <input
                    ref = {inputMessageRef}
                    className = "userInput"
                    placeholder = "Digite sua mensagem..."
                />
                <button className = "inputMessage" type = "submit">Enviar</button>
            </form>
        </div>
    );
}

export default Chat;
