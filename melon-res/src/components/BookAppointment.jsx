import {useEffect, useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import {format} from 'date-fns';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Book(){

    let   [date, setDate] = useState(null)
    const [available, setAvailable] = useState([])
    const [time, setTime] = useState (null)
    const [message, setMessage] = useState('')
  
    useEffect(()=>{
        // Abandon effect if no date selected
        if(!date) return;

        // format date to correct databse format
        date = format(date, 'yyyy-MM-dd')

        // fetch available appointment times
        // set available times 'available' state variable
        fetch(`/api/available/${date}`)
        .then((res) =>res.json())
        .then((data) =>{
            if (data.message){
                setMessage(data.message)
            } else {
            setAvailable(data.available)}
        })
    
    }, [date])

    useEffect(() => {

        if(!time) return;

        date = format(date, 'yyyy-MM-dd')
    
        const new_booking ={
            'date' : `${date}`,
            'time' : `${time}`
        }

        fetch('/api/book', {
            method: "POST",
            body: JSON.stringify(new_booking),
            headers :{
                'Content-Type' : 'application/json'
            }
        })
        .then((res) => res.json())
        .then((message) =>
        setMessage(message.message),
        setAvailable([]))

    }, [time])


    return(
        <div>
            <Container>
            {message}
            <Row>
            <Calendar onChange={e => setDate(e)} value={date}/>
            </Row>
            <div className="selected">Selected date: {date?.toDateString()}</div>
            <div className="times">
            {available.map(time => {
                return(
                    <div>
                        <button value={time} onClick={(e) => setTime(e.target.value)}>{time}</button>
                    </div>
                )
            })}
            </div>
            </Container>
        </div>
    )
}