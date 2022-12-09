import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import UserContext from '../UserContext';
import "../styles/contacts.css";

export default function Contacts({contact}){

    const [ activeContact, setActiveContact] = useContext(UserContext);
    const [ _id , setId ] = useState("");

    useEffect(()=> {
        setId(contact._id);
    })

    function handleEvent(event){
        setActiveContact({
            _id: _id,
            nickName: contact.nickName
        });
    }
    return (
        <div className="navlink-container">
            <Nav.Link onClick={(event) => handleEvent(event)}>{contact.nickName}</Nav.Link>
        </div>

    )
}