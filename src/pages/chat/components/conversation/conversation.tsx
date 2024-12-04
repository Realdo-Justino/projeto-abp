import { Contact } from '../../../../classes/contact';
import './conversation.css';

type ClickContact = (e: React.MouseEvent<HTMLDivElement>, id: number) => void;

function Conversation(currentContact : Contact, onContactClick: ClickContact) : JSX.Element {
    const onClick = (e : React.MouseEvent<HTMLDivElement>) => {
        onContactClick(e, currentContact.id);
    }

    return (
        <div className='conversationCss'>
            <div key = {currentContact.id} className='conversation' onClick={onClick}>
                <img src={currentContact.avatar} alt={currentContact.name} className="contactAvatar"/>
                <div className="contactName">
                    {currentContact.name}
                </div>
            </div>
        </div>
    );
}

export default Conversation;
