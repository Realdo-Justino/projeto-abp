import { useState } from 'react'

function Chat() {
const []} =;

function Chat() {
const [mensagem, setMensagem] = useState('');
const [mensagens, setMensagens] = useState([]);

const adicionaItem = () => {
    if (mensagem.trim()) {
    setMensagens([...mensagens, mensagem]);
      setMensagem('');}};

const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    adicionaItem();};

return (
    <div className="chat-container">
    <div className="lista">
        {mensagens.map((msg, index) => (
        <div key={index} className="mensagem">
            <h3 className="voce">Você:</h3>
            <p className="mensagens">{msg}</p>
        </div>
        ))}
    </div>

    <form id="formItem" onSubmit={handleSubmit}>
        <input
        className="Digitavel"
        placeholder="Digite sua mensagem..."
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        />
        <button className="botao" type="submit">Enviar</button>
    </form>
    </div>);}

export default Chat;