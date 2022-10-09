import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Profile({logout, user, appointments}){
    return (
        <div>
            <Container>
                <Row>
                    <Col>
            <h3>Welcome, {user}!</h3>
            <h6>We look forward to tasting Melons with you on:</h6>
            {appointments ? 
            <ul>
                {(appointments.map(booked => {return (<li>{booked}</li>)}))}
            </ul> 
            : <div>Book your appointment below!</div>}
            <button style={{textAlign:"center"}} onClick={logout}>Logout</button>
            </Col>
            </Row>
            </Container>
        </div>

    )
}