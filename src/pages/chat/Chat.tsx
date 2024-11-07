import React, { useRef } from 'react';
import Methods from '../../const/methods';

function Chat() {
    const inputMessageRef = useRef<HTMLInputElement|null>(null);

    const messageSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        let messageText : string|undefined = inputMessageRef.current?.value;

        if(Methods.isEmpthyText(messageText)) {
            return;
        }

        console.log(messageText);
    }
// const [mensagem, setMensagem] = useState('');
// const [mensagens, setMensagens] = useState([]);

// const adicionaItem = () => {
//     if (mensagem.trim()) {
//         setMensagens([...mensagens, mensagem]);
//         setMensagem('');
//     }
// }

// const handleSubmit = (event : {
//         preventDefault: () => void
//         }) =>{
//                 event.preventDefault();
//                 adicionaItem()
//                 }

    return (
        <div className="chat-container">
            <div className="lista">
                {/* {
                    mensagens.map((msg, index) => (
                        <div key={index} className="mensagem">
                            <h3 className="voce">Você:</h3>
                            <p className="mensagens">{msg}</p>
                        </div>
                    ))
                } */}
            </div>

            <form id="formItem" onSubmit={messageSubmit}>
                <input
                    ref = {inputMessageRef}
                    className="Digitavel"
                    placeholder="Digite sua mensagem..."
                />
                <button className="botao" type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Chat;
