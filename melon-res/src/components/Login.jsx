import {useState} from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';


export default function Login({onClick, username, newaccount, onChange, onRegister}){

    function onClickWrapper(e) {
        const value = "login"
        onClick(e, username, value);
    }
    
    function onClickRegisterWrapper(e) {
        const value="register"
        onClick(e,newaccount,value);
    }


    return (
        <div>
            <Container> 
                <Card>
                <h3>Login</h3>
                                <input 
                                    type="text" 
                                    placeholder="Enter Username..." 
                                    name="username" 
                                    value={username}
                                    onChange={onChange}/>
                            <button onClick={onClickWrapper}> Enter </button>
                            
                       
                            <h3>Register</h3>
                                <input 
                                type="text" 
                                value={newaccount} 
                                placeholder="Enter Username..." 
                                onChange={onRegister}/>
                            <button onClick={onClickRegisterWrapper}> Register </button>
                </Card>
            </Container>
        </div>
    )
}