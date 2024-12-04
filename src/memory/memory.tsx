import { createContext, ReactNode, useContext, useState } from "react";
import { Contact } from '../classes/contact';

type MemoryContactType = {
  contacts: Array<Contact>;
  addContact: (newContact: Contact) => void;
  removeContact: (contactId: number) => void;
  editContact: (contactId: number, name : string) => void;
};

type MemoryFocusedContact = {
  id: number;
  focusOnId: (newId: number) => void;
}

type MemoryConversationsType = {
  conversations: Map<number, Array<string>>;
  createConversation: (contactId: number) => void;
  addMessage: (contactId: number, message: string) => void;
}

type MemoryContextType = MemoryContactType &
  MemoryFocusedContact & MemoryConversationsType;


const MemoryContext = createContext<MemoryContextType| undefined>(undefined);

export const MemoryProvider = ({ children }: { children: ReactNode }) => {
    const [contacts, setContacts] = useState<Array<Contact>>([
        new Contact({ id: 1, name: 'João Silva', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' }),
        new Contact({ id: 2, name: 'Maria Oliveira', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' }),
        new Contact({ id: 3, name: 'Pedro Souza', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' })
    ]);

    const addContact = (newContact: Contact) => {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    };

    const removeContact = (contactId: number) => {
      setContacts((prevContacts) => {
        const newContacts: Array<Contact> = [];

        for(let currentContact of prevContacts) {
          if(currentContact.id !== contactId) {
            newContacts.push(currentContact);
          }
        }

        return newContacts;
      });
    };

    const editContact = (contactId: number, name : string) => {
      setContacts((prevContacts) => {
        const newContacts: Array<Contact> = [];

        for(let currentContact of prevContacts) {
          if(currentContact.id !== contactId) {
            newContacts.push(currentContact);
          } else {
            newContacts.push(new Contact({id: contactId, name: name, avatar: currentContact.avatar}));
          }
        }

        return newContacts;
      });
    };

    const [conversations, setConversations] = useState<Map<number, Array<string>>>(new Map<number, Array<string>>([
      [1,[]],
      [2,[]],
      [3,[]]
    ]));

    const createConversation = (contactId: number) => {
      setConversations((prevConversations) => {
        const newConversations = new Map(prevConversations); // Copy the Map
        newConversations.set(contactId, []);

        return newConversations;
      });
    }

    const addMessage = (contactId: number, message: string) => {
      setConversations((prevConversations) => {
        const newConversations = new Map(prevConversations); // Copy the Map
        newConversations.set(contactId, [...(newConversations.get(contactId)!),message])

        return newConversations;
      });
    }


    const [id, setId] = useState<number>(1);

    const focusOnId = (newId: number) => {
      setId((_) => newId)
    }

    return (
      <MemoryContext.Provider value={{
        contacts, addContact, removeContact, editContact,
        id, focusOnId,
        conversations, createConversation, addMessage
      }}>
        {children}
      </MemoryContext.Provider>
    );
}

export const useMemoryContext = () => {
    const context = useContext(MemoryContext);

    if (!context) {
      throw new Error('useMyContext must be used within a MyProvider');
    }

    return context;
}
