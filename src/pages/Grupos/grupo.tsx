import { useState } from 'react';
import { Member } from '../../classes/member';
import './grupo.css';


function App() {
    const [groupName, setGroupName] = useState<string>('');
    const [groupDescription, setGroupDescription] = useState<string>('');
    const [groupImage, setGroupImage] = useState<File|null>(null);
    const [selectedMembers, setSelectedMembers] = useState<Array<Member>>([]);

    const members : Array<Member> = [
        new Member({id: 1, name:'Usuário 1'}),
        new Member({id: 2, name:'Usuário 2'}),
        new Member({id: 3, name:'Usuário 3'}),
        new Member({id: 4, name:'Usuário 4'}),
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const groupInfo = {
        //     name: groupName,
        //     description: groupDescription,
        //     image: groupImage,
        //     members: selectedMembers,
        // };
        alert('Grupo Criado com sucesso!');

        // Resetar o formulário
        setGroupName('');
        setGroupDescription('');
        setGroupImage(null);
        setSelectedMembers([]);
    };

    const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null) {
            setGroupImage(e.target.files[0]);
        }
    }

    const handleMemberChanger = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId: number = parseInt(e.target.value, 10);
        const temMember: Member|undefined = members.find((m) => m.id === selectedId);

        if (temMember !== undefined) {
            setSelectedMembers([temMember]);
        }
    }

    return (
        <div className="container">
        <h1>Criar Grupo</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="groupName">Nome do Grupo:</label>
            <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="groupDescription">Descrição:</label>
            <textarea
                id="groupDescription"

                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="groupImage">Imagem do Grupo:</label>
            <input
                type="file"
                id="groupImage"
                accept="image/*"
                onChange={changeImage}
            />
            </div>
            <div className="form-group">
            <label>Membros:</label>
            <select id="membersSelect" multiple onChange={handleMemberChanger}>
                {members.map((member) => (
                    <option key={member.id} value={member.name}>
                        {member.name}
                    </option>
                ))}
            </select>
            </div>
            <button type="submit">Criar Grupo</button>
        </form>
        </div>
    );
}

export default App;
