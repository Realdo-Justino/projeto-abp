import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemoryContext } from '../../memory/memory';
import './Contato.css';
import Methods from '../../const/methods';
import { Contact } from '../../classes/contact';

function Contato(): JSX.Element {
  const navigate = useNavigate();

  const inputNameRef = useRef<HTMLInputElement|null>(null);
  const contactsRef = useRef<HTMLDivElement|null>(null);
  const [busca, setBusca] = useState<string>('');
  const [menuAberto, setMenuAberto] = useState<number | null>(null);

  const { contacts, addContact, removeContact, editContact } = useMemoryContext();
  const { conversations, createConversation, addMessage } = useMemoryContext();


  const contactSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let contactName : string|undefined = inputNameRef.current?.value;
    let newId : number = contacts.length+1;
    let gender : string = 'men';

    if(Methods.isEmpthyText(contactName)) {return}

    if((Math.floor(Math.random() * (0 - 2) + 2)) == 1) {gender = 'women'}

    addContact(new Contact({id: newId, name: contactName!, avatar: `https://randomuser.me/api/portraits/${gender}/${newId}.jpg`}))
    createConversation(newId);

    inputNameRef.current!.value = '';
  }

  const handleBuscarContato = () => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(busca.toLowerCase()));
  };

  const handleEditarContato = (id: number) => {
    const novoNome = prompt('Digite o novo nome do contato:');
    if (novoNome) {editContact(id,novoNome)}

    setMenuAberto(null);
  };


  useEffect(() => {
      if (contactsRef.current) {
        contactsRef.current!.scrollTop = contactsRef.current!.scrollHeight;
      }
  }, [contacts]);

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
          {handleBuscarContato().map((contato) => (
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
                    <button onClick={() => removeContact(contato.id)}>Deletar</button>
                  </div>
                )}
              </div>
              <img src={contato.avatar} alt={contato.name} className="contato-avatar" />
              <div className="contato-nome">{contato.name}</div>
            </div>
          ))}
        </div>

        <div className="userInputForm">
          <form onSubmit={contactSubmit}>
            <input
              ref = {inputNameRef}
              type="text"
              placeholder="Adicionar novo contato"
              className="userInput"
            />
            <button className="inputMessage">
              Adicionar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contato;
