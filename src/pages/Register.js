import { Button, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/register.css"


function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    nickName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const showConfirmation = (message, icon) => {
    Swal.fire({
      icon: icon,
      text: message
    })
  }

  useEffect(() => {  
    if(localStorage.getItem('userName')){
      navigate("/");
    }
  }, []);

  function submit(event){
    event.preventDefault();

    if(validate()){
      const { userName, nickName, email, password } = values;

      fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          userName: userName,
          nickName: nickName,
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(result => {
        if(result.status === true){
          showConfirmation(result.message, "success")
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("nickName", JSON.stringify(result.nickName));
          navigate("/");
        }
        
        if(result.satus === false) {
          showConfirmation(result.message, "error")
        }
      });
    };
  }

  function validate(){
    const { password, confirmPassword, userName, email, nickName } = values;
   
    if(password !== confirmPassword){
      showConfirmation("Password and confirm password should match", "error")

      return false;
    }
    else if(password.length < 6 ) {
      showConfirmation("Password should be at least 6 characters long", "error")

      return false;
    } 
    else {
      return true;
    }
  }

  function handleChange(event){
    setValues({...values,[event.target.name]:event.target.value});
  }

  return (
      <Container className="d-flex justify-content-center pt-5"> 
          <Form className="col-12 col-md-7 col-lg-5" onSubmit={(event)=> submit(event)}>
          
          <Form.Group className="mb-3">
            <Form.Label className="">Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your username"
              name="userName"
              required
              onChange={(event)=> handleChange(event)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="">Nickname</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your nickname"
                name="nickName"
                required
                onChange={(event)=> handleChange(event)} />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label className="">Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your Email"
                name="email"
                required
                onChange={(event)=> handleChange(event)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="">Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter your password"
                name="password"
                required
                onChange={(event)=> handleChange(event)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="">Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Re-enter Password"
                name="confirmPassword"
                required
                onChange={(event)=> handleChange(event)} />
          </Form.Group>

          <div className="d-flex justify-content-center"> 
            <Button className="mb-3" variant="primary" type="submit">
              Register
            </Button>
          </div>
          <div className="d-flex justify-content-center"> 
            <span>Already have an account? <Link to="/login">Login</Link></span>
          </div>


          </Form>
      </Container>
  );
}

export default Register;