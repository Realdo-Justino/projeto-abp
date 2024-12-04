import { createContext, ReactNode, useContext, useState } from "react";
import { Contact } from "../classes/contact";

type MemoryContextType = {
  contacts: Array<Contact>;
  addContact: (newContact: Contact) => void;
  removeContact: (newContact: Contact) => void;
};

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider = ({ children }: { children: ReactNode }) => {
    const [contacts, setContacts] = useState<Array<Contact>>([
        new Contact({ id: 1, name: 'João Silva', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' }),
        new Contact({ id: 2, name: 'Maria Oliveira', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' }),
        new Contact({ id: 3, name: 'Pedro Souza', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' })
    ]);

    const addContact = (newContact: Contact) => {
      setContacts((prevContacts) => [...prevContacts, newContact]);
    };

    const removeContact = (newContact: Contact) => {
      setContacts((prevContacts) => [...prevContacts]);
    };

    return (
      <MemoryContext.Provider value={{ contacts, addContact, removeContact}}>
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
