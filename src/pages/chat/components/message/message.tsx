import './message.css';

function Message(id : number, message : string) : JSX.Element {
    return (
        <div key = {id} className = 'message'>
            <h3 className = "userMessage">Você:</h3>
            <p className = "messages">{message}</p>
        </div>
    );
}

export default Message;
