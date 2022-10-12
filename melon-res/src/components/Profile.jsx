import { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


export default function Profile({logout, user, appointments}){

    return (
        <div>
            <Container className='main'>
                <Row className="main">
                   
            <h3 style={{textDecoration:"underline"}}>Welcome, {user}!</h3>
            <button  onClick={logout}>Logout</button>
            <h6><em>We look forward to tasting Melons with you on:</em></h6>
            {appointments ? 
            <ul>
                {(appointments.map(booked => {return (<li>{booked}</li>)}))}
            </ul> 
            : <div>Book your appointment below!</div>}
       
            </Row>
            </Container>
     
        </div>

    )
}