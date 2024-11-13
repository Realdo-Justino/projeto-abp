import './message.css';

function Message(id : number, message : string) : JSX.Element {
    return (
        <div className='messagesscss'>
            <div key = {id} className = 'message'>
                <h3 className = "userMessage">Você:</h3>
                <p className = "messages">{message}</p>
            </div>
        </div>
    );
}

export default Message;
