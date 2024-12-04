import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemoryContext } from '../../memory/memory';
import './Contato.css';
import Methods from '../../const/methods';
import { Contact } from '../../classes/contact';
import ContactItem from './components/contact/contactItem';

function Contato() : JSX.Element {
  const navigate = useNavigate();

  const inputNameRef = useRef<HTMLInputElement|null>(null);

  const { contacts, addContact, removeContact } = useMemoryContext();


  const contactSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let contactName : string|undefined = inputNameRef.current?.value;
    let newId : number = contacts.length+1;

    if(Methods.isEmpthyText(contactName)) {
      return;
    }

    addContact(new Contact({id: newId, name: contactName!, avatar: `https://randomuser.me/api/portraits/men/${newId}.jpg`}))
    inputNameRef.current!.value = '';
  }

  const goToChat = () => {
      navigate('/chat')
  }


  return (
    <div className="contatos-container">
      <div className="lista">
        {contacts.map((contato) => (ContactItem(contato)))}
      </div>

      <div className="userInputForm">
        <form id='contactInputForm' onSubmit={contactSubmit}>
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

      <button className="go-back-chat" onClick={goToChat}>
        Voltar para o Chat
      </button>
    </div>
  );
};

export default Contato;
