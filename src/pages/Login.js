import { Button, Container, Form } from "react-bootstrap";
import { useEffect, useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/login.css";

export default function Login(){
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    password: ""
  });

  const showConfirmation = (message, icon) => {
    Swal.fire({
      icon: icon,
      text: message
    })
  }

  useEffect(() => {  
    if(localStorage.getItem('user')){
      navigate("/");
    }
  }, []);

  function login(event){
    event.preventDefault();
    const { userName, password } = values;
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userName: userName,
        password: password
      })
    })
    .then(response => response.json())
    .then(result => {    
      if(result.status === true){
        localStorage.setItem("user", JSON.stringify(result.user));
        showConfirmation(result.message, "success");
        navigate("/");
      }

      if(result.status === false)
      showConfirmation(result.message, "error")
    })
  };

  function handleChange(event) {
    setValues({...values,[event.target.name]:event.target.value})
  };
  
  return(

    <Container className="d-flex justify-content-center pt-5"> 
      <Form className="col-12 col-md-7 col-lg-5" onSubmit={(event)=> login(event)}>
      
      <Form.Group className="mb-3">
        <Form.Label className="">Username</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter you username"
        required
        name="userName"
        onChange={(event) => handleChange(event)}
          />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Enter you password"
        required
        name="password"
        onChange={(event) => handleChange(event)}
          />
      </Form.Group>

      <div className="d-flex justify-content-center"> 
        <Button className="mb-3" variant="primary" type="submit">
          Login
        </Button>
      </div>
      <div className="d-flex justify-content-center"> 
        <span>Not yet registered? <Link to="/register">Register</Link></span>
      </div>


      </Form>
    </Container>
  );
}

