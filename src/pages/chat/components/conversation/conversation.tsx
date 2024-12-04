import { Contact } from '../../../../classes/contact';
import './conversation.css';

function Conversation(currentContact : Contact) : JSX.Element {
    return (
        <div className='conversationCss'>
            <div key = {currentContact.id} className='conversation'>
                <img src={currentContact.avatar} alt={currentContact.name} className="contactAvatar"/>
                <div className="contactName">
                    {currentContact.name}
                </div>
            </div>
        </div>
    );
}

export default Conversation;
