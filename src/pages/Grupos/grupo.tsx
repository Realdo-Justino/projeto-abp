import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './grupo.css';
import { useMemoryContext } from '../../memory/memory';
import { Contact } from '../../classes/contact';

function App() {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState<string>('');
    const [groupDescription, setGroupDescription] = useState<string>('');
    const [groupImage, setGroupImage] = useState<File | null>(null);
    const [selectedMembers, setSelectedMembers] = useState<Array<Contact>>([]);

    const { contacts } = useMemoryContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Grupo Criado com sucesso!');
        setGroupName('');
        setGroupDescription('');
        setGroupImage(null);
        setSelectedMembers([]);
    };

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setGroupImage(file);
    };

    const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId: number = parseInt(e.target.value, 10);
        let selectedMember : Contact|null = null;

        for(let currentContact of contacts) {
            if(currentContact.id === selectedId) {
                selectedMember = currentContact;
            }
        }

        if(selectedMember !== null) {
            setSelectedMembers(prev => {
                let members : Array<Contact> = [...prev];

                if(!members.includes(selectedMember!)) {
                    members = [...prev, selectedMember!];
                }

                return members;
            });
        }
    };

    const handleBackToChat = () => {
        navigate('/chat');
    };

    return (
        <div className="body-page">
            <h1>Criar Grupo</h1>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label >Nome do Grupo:</label>
                    <input
                        type="text"
                        id="groupName"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required={true}
                    />
                </div>

                <div className="form-group">
                    <label>Descrição:</label>
                    <textarea
                        id="groupDescription"
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Imagem do Grupo:</label>
                    <input
                        type="file"
                        id="groupImage"
                        accept="image/*"
                        onChange={changeImage}
                    />
                </div>

                <div className="form-group">
                    <label>Membros:</label>
                    <select id="membersSelect" onChange={handleMemberChange}>
                        {contacts.map((currentContact) => (
                            <option key={currentContact.id} value={currentContact.id}>
                                {currentContact.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="button group-button">Criar Grupo</button>
            </form>

            <button className="button back-chat" onClick={handleBackToChat}>Voltar para Chat</button>
        </div>
    );
}

export default App;
