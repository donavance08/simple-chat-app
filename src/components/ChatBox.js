import UserContext from '../UserContext';
import { useEffect, useContext, useState} from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ChatHistory from "./ChatHistory";

import "../styles/chatbox.css";

export default function ChatBox(){
    const [ activeContact, setActiveContact, updatedMessage, setUpdatedMessage ] = useContext(UserContext);
    const [ message, setMessage] = useState("");
    const navigate = useNavigate();

    function handleLogout(event){
        localStorage.clear();
        navigate("/login");
    };

    async function handleSendMessage(event){        
        fetch(`${process.env.REACT_APP_API_URL}/message/send`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify( {
                message: message,
                to: activeContact._id,
                from: await JSON.parse(localStorage.getItem("user"))._id
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.status){
                setUpdatedMessage(true);
                document.getElementById("text-box").value="";
            }
        })
    };

    function handleChange(event){
        setMessage(event.target.value);
    };

    return (
        <Container className="fluid">
            <div className="row">   
                <Stack className="mt-3 ps-3  mb-auto" direction="horizontal" gap={3}>
                    <div className="d-flex justify-content-center align-items-center me-auto">   
                    <h2 className="chat-header m-0">{activeContact? activeContact.nickName : ""}</h2>
                    </div>
                    
                    <Button className="m-1"variant="outline-danger" onClick={(event) => handleLogout(event)}>Logout</Button>
                </Stack>
                <div className="chat-history">
                    <ChatHistory></ChatHistory>
                </div>  
                
                {
                activeContact?
                    <>
                        <div className="compose-message-box d-flex mt-auto align-bottom">
                            <InputGroup className="mb-3">
                                <Form.Control
                                id="text-box"
                                placeholder="Write message"
                                name="message"
                                type="text"
                                onChange={(event) => handleChange(event)}
                                />
                                <InputGroup.Text id="submitbtn"onClick={(event) => handleSendMessage(event)}>Send</InputGroup.Text>  
                            </InputGroup>
                        </div>
                    </>
                : 
                    <>
                    </>
                }
            </div>

        </Container>
    )
};