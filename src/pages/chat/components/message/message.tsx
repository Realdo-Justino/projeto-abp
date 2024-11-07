function Message(id : number, message : string) : JSX.Element {
    return (
        <div key={id} className='mensagem'>
            <h3 className="voce">Você:</h3>
            <p className="mensagens">{message}</p>
        </div>
    );
}

export default Message;
