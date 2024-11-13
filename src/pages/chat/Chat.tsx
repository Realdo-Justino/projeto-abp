import React, { useEffect, useRef, useState } from 'react';
import Methods from '../../const/methods';
import Message from './components/message/message';
import './Chat.css';
import ContatosPage from '../contato/Contato'; // Importe a tela de Contatos

function Chat() : JSX.Element {

    const [isChat, setIsChat] = useState(true);  // Estado para alternar entre Chat e Contatos

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
    }, [messages]);

    // Função para alternar para a tela de Contatos
    const goToContatos = () => {
        setIsChat(false);
    };

    // Função para voltar para a tela de Chat
    const goBackToChat = () => {
        setIsChat(true);
    };

    return (
        <div>
            {isChat ? (
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
                    {/* Botão para ir para a tela de Contatos */}
                    <button className="go-to-contatos" onClick={goToContatos}>
                        Ver Contatos
                    </button>
                </div>
            ) : (
                <ContatosPage onBack={goBackToChat} />  // Passa a função para voltar para o chat
            )}
        </div>
    );
}

export default Chat;
