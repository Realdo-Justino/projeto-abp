import './contactItem.css';
import { Contact } from '../../../../classes/contact';

function ContactItem(currentContact: Contact) : JSX.Element {
    return (
        <div key={currentContact.id} className="contato-item">
            <img src={currentContact.avatar} alt={currentContact.name} className="contato-avatar"/>
            <div className="contato-nome">
                {currentContact.name}
            </div>
        </div>
    );
}

export default ContactItem;
