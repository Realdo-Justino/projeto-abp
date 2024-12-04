import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemoryContext } from '../../memory/memory';
import './Contato.css';
import Methods from '../../const/methods';
import { Contact } from '../../classes/contact';
import ContactItem from './components/contact/contactItem';

function Contato() : JSX.Element {
  const navigate = useNavigate();

  const inputNameRef = useRef<HTMLInputElement|null>(null);
  const contactsRef = useRef<HTMLDivElement|null>(null);

  const { contacts, addContact, removeContact } = useMemoryContext();
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

  useEffect(() => {
      if (contactsRef.current) {
        contactsRef.current!.scrollTop = contactsRef.current!.scrollHeight;
      }
  }, [contacts]);

  const goToChat = () => {
      navigate('/chat')
  }


  return (
    <div className="contatos-container">
      <div ref={contactsRef} className="lista">
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
