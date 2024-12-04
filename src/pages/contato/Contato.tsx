import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contato.css';

function Contato(): JSX.Element {
  const navigate = useNavigate();

  const [novoContato, setNovoContato] = useState<string>('');
  const [busca, setBusca] = useState<string>('');
  const [menuAberto, setMenuAberto] = useState<number | null>(null);
  const [contatos, setContatos] = useState([
    { id: 1, nome: 'João Silva', avatar: 'https://ui-avatars.com/api/?name=João+Silva' },
    { id: 2, nome: 'Maria Oliveira', avatar: 'https://ui-avatars.com/api/?name=Maria+Oliveira' },
    { id: 3, nome: 'Pedro Souza', avatar: 'https://ui-avatars.com/api/?name=Pedro+Souza' },
  ]);

  const handleAdicionarContato = () => {
    if (novoContato.trim()) {
      const novoContatoObj = {
        id: contatos.length + 1,
        nome: novoContato,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(novoContato)}`,
      };
      setContatos([...contatos, novoContatoObj]);
      setNovoContato('');
    }
  };

  const handleEditarContato = (id: number) => {
    const novoNome = prompt('Digite o novo nome do contato:');
    if (novoNome) {
      setContatos(
        contatos.map((contato) =>
          contato.id === id
            ? { ...contato, nome: novoNome, avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(novoNome)}` }
            : contato
        )
      );
    }
    setMenuAberto(null);
  };

  const handleDeletarContato = (id: number) => {
    setContatos(contatos.filter((contato) => contato.id !== id));
    setMenuAberto(null);
  };

  const handleBuscarContato = () => {
    return contatos.filter((contato) => contato.nome.toLowerCase().includes(busca.toLowerCase()));
  };

  const contatosFiltrados = handleBuscarContato();

  const goToChat = () => {
    navigate('/chat');
  };

  return (
    <div className="background">
      <div className="contatos-container">
        <div className="header">
          <button className="go-back-chat" onClick={goToChat}>
            Voltar para o Chat
          </button>
          <input
            type="text"
            placeholder="Buscar contato por nome"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="busca-input"
          />
        </div>

        <div className="lista">
          {contatosFiltrados.map((contato) => (
            <div key={contato.id} className="contato-item">
              <div className="menu-container">
                <button
                  className="menu-tres-pontinhos"
                  onClick={() => setMenuAberto(menuAberto === contato.id ? null : contato.id)}
                >
                  ...
                </button>
                {menuAberto === contato.id && (
                  <div className="menu-opcoes-dropdown">
                    <button onClick={() => handleEditarContato(contato.id)}>Editar</button>
                    <button onClick={() => handleDeletarContato(contato.id)}>Deletar</button>
                  </div>
                )}
              </div>
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
      </div>
    </div>
  );
}

export default Contato;