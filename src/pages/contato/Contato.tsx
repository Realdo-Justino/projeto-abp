import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemoryContext } from '../../memory/memory';
import './Contato.css';
import Methods from '../../const/methods';
import { Contact } from '../../classes/contact';

function Contato() : JSX.Element {
  const navigate = useNavigate();

  const { contacts, addContact, removeContact } = useMemoryContext();

  const inputNameRef = useRef<HTMLInputElement|null>(null);

  const contactSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    let contactName : string|undefined = inputNameRef.current?.value;
    let newId : number = contacts.length+1;

    if(Methods.isEmpthyText(contactName)) {
      return;
    }

    addContact(new Contact({id: newId, name: contactName!, avatar: `https://randomuser.me/api/portraits/men/${newId}.jpg`}))
  }
  // const [novoContato, setNovoContato] = useState<string>('');

  // Lista de contatos fictícios
  // const [contatos, setContatos] = useState([
  //   { id: 1, nome: 'João Silva', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  //   { id: 2, nome: 'Maria Oliveira', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  //   { id: 3, nome: 'Pedro Souza', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  // ]);

  // Função para adicionar um novo contato
  // const handleAdicionarContato = () => {
  //   if (novoContato.trim()) {
  //     const novoContatoObj = {
  //       id: contatos.length + 1,
  //       nome: novoContato,
  //       avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  //     };
  //     // Atualizando a lista de contatos de forma imutável
  //     setContatos([...contatos, novoContatoObj]);
  //     setNovoContato('');  // Limpar o campo de entrada após adicionar
  //   }
  // }

  const goToChat = () => {
      navigate('/chat')
  }

  return (
    <div className="contatos-container">
      <div className="lista">
        {contacts.map((contato) => (
          <div key={contato.id} className="contato-item">
            <img src={contato.avatar} alt={contato.name} className="contato-avatar" />
            <div className="contato-nome">{contato.name}</div>
          </div>
        ))}
      </div>

      <div className="userInputForm">
        <input
          ref = {inputNameRef}
          type="text"
          placeholder="Adicionar novo contato"
          className="userInput"
        />
        <button onClick={contactSubmit} className="inputMessage">
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
