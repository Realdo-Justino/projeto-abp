import { Contact } from "../../../../classes/contact";
import './title.css';

function ContactTitle(focusedContact: Contact) : JSX.Element {
    return (
        <div key = {focusedContact.id} className='title' >
            <img src={focusedContact.avatar} alt={focusedContact.name} className="titleAvatar"/>
            <div className="titleName">
                {focusedContact.name}
            </div>
        </div>
    );
}

export default ContactTitle;
