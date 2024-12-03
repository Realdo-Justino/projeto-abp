import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contato.css';

function Contato() : JSX.Element {
  const navigate = useNavigate();

  const [novoContato, setNovoContato] = useState<string>('');

  // Lista de contatos fictícios
  const [contatos, setContatos] = useState([
    { id: 1, nome: 'João Silva', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, nome: 'Maria Oliveira', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, nome: 'Pedro Souza', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ]);

  // Função para adicionar um novo contato
  const handleAdicionarContato = () => {
    if (novoContato.trim()) {
      const novoContatoObj = {
        id: contatos.length + 1,
        nome: novoContato,
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      };
      // Atualizando a lista de contatos de forma imutável
      setContatos([...contatos, novoContatoObj]);
      setNovoContato('');  // Limpar o campo de entrada após adicionar
    }
  }

  const goToChat = () => {
      navigate('/chat')
  }

  return (
    <div className="contatos-container">
      <div className="lista">
        {contatos.map((contato) => (
          <div key={contato.id} className="contato-item">
            <img src={contato.avatar} alt={contato.nome} className="contato-avatar" />
            <div className="contato-nome">{contato.nome}</div>
          </div>
        ))}
      </div>

      <div className="userInputForm">
        <input
          type="text"
          placeholder="Adicionar novo contato"
          value={novoContato}
          onChange={(e) => setNovoContato(e.target.value)}
          className="userInput"
        />
        <button onClick={handleAdicionarContato} className="inputMessage">
          Adicionar
        </button>
      </div>

      {/* Botão para voltar para o Chat */}
      <button className="go-back-chat" onClick={goToChat}>
        Voltar para o Chat
      </button>
    </div>
  );
};

export default Contato;
