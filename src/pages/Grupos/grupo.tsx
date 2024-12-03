import { useState } from 'react';
import { Member } from '../../classes/member';
import { useNavigate } from 'react-router-dom';
import './grupo.css';

function App() {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState<string>('');
    const [groupDescription, setGroupDescription] = useState<string>('');
    const [groupImage, setGroupImage] = useState<File | null>(null);
    const [selectedMembers, setSelectedMembers] = useState<Array<Member>>([]);

    const members: Array<Member> = [
        new Member({ id: 1, name: 'João Silva' }),
        new Member({ id: 2, name: 'Maria Oliveira' }),
        new Member({ id: 3, name: 'Pedro Souza' }),
        new Member({ id: 4, name: 'Cristiano Ronaldo' }),
    ];

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
        const selectedMember = members.find((m) => m.id === selectedId);
        if (selectedMember && !selectedMembers.some(member => member.id === selectedId)) {
            setSelectedMembers(prev => [...prev, selectedMember]);
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
                        {members.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.name}
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
