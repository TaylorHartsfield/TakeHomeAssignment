import {useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Login({onClick, toggle}){

    const [username, setUsername] = useState('')

    function handleOnChange(e) {
        setUsername(e.target.value);
    }

    function onClickWrapper(e) {
        const value = "login"
        onClick(e, username, value)
    }

    return (
        <div>
            <Container>
            <Row>
                <Col>
                    <h3>Login</h3>
                    <input 
                    type="text" 
                    placeholder="Enter Username..." 
                    name="username" 
                    value={username}
                    onChange={handleOnChange}/>
                    <button 
                    onClick={onClickWrapper}>Enter
                    </button>
                </Col>
                <Col>
                    <h6>No account? <button onClick={toggle}>Register Here</button></h6>
                </Col>
            </Row>
            </Container>
        </div>
    )
}