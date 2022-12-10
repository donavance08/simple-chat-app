import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { UserProvider } from '../UserContext';
import Contacts from "../components/Contacts";
import ChatBox from "../components/ChatBox";
import "../styles/chat.css";


export default function Chat(){
    const [contacts, setContacts ] = useState([]);
    const [ currentUser, setCurrentUser ] = useState("");
    const [ activeContact, setActiveContact ] = useState(undefined);
    const [ updatedMessage, setUpdatedMessage] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=> {
        if(localStorage.getItem("user") === null){
            navigate("/login")
        } else {
            setCurrentUser( JSON.parse(localStorage.getItem("user")));
        }

    }, []);

    useEffect(() => {
        if(localStorage.getItem("user" !== null)){
            fetch(`${process.env.REACT_APP_API_URL}/users/getAllUsers/${JSON.parse(localStorage.getItem("user"))._id}`, {
                headers:{
                    "Content-type": "application/json"
                }
            })
            .then(response => response.json())
            .then(result => {
                setContacts([
                    result.map(contact => {
                        return <Contacts key={contact._id} contact={contact}>  </Contacts>
                    })
                ]);
            })
        }
    }, []);

    return(
        <UserProvider value={[activeContact, setActiveContact, updatedMessage, setUpdatedMessage]}>   
            <Container className="d-flex m-0 p-0 min-vh-100"> 
                <div className="contacts-area col-3"> 
                    <h1 className="px-5 mt-3 d-flex justify-content-center">Contacts</h1>  
                    <Nav className="flex-column">
                        {contacts}
                    </Nav>
                </div>
                <div className="chat-box-area col-md-9">   
                    <ChatBox></ChatBox>
                </div> 


            </Container>
        </UserProvider>
    )
}

