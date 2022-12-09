import { Container } from "react-bootstrap";
import { useEffect, useContext, useState } from "react";
import UserContext from '../UserContext';
import "../styles/chatHistory.css";

export default function ChatHistory(){
    const [ activeContact, setActiveContact, updatedMessage, setUpdatedMessage ] = useContext(UserContext);
    const [ messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([]);
        if(activeContact){
            fetch(`${process.env.REACT_APP_API_URL}/message/retrieve-message`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    from: JSON.parse(localStorage.getItem("user"))._id,
                    to: activeContact._id
                })
            })
            .then(response => response.json())
            .then(result => {
                if(result)
                    setMessages(result);
                    setUpdatedMessage(false);
            })
        }

    }, [activeContact, updatedMessage]);

    return(
        <div className="message-container">   
            {messages.map(message => {
                return(
                    <div className={`${message.ownMessage? "sent" : "recieved"}`}>
                        <div className="line-container">  
                            <div className="ms-auto me-0">
                                <p>{message.message}</p>
                            </div>
                        </div> 
                    </div>
                )
            })}
        </div>
    )
}