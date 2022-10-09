import {useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import Time from "./Time";
import {format} from 'date-fns';
// onClickDay={() => setShowTimes(true)}
export default function Book(){

    const[date, setDate] = useState(new Date())
    const[showTimes, setShowTimes] = useState(false)
    const[appointment, setAppointment] = useState(null)

    function handleBooking() {
        console.log(date)
        const booking = format(date, 'yyyy-MM-dd')


        const new_booking = {
            "date": booking
        }

        fetch(`/book/${booking}`, {
            method: 'POST',
            body: JSON.stringify(new_booking),
            headers: {
                'Content-Type': 'application/json'
                    },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setAppointment(data.appointment)
            })
    }


    return(
        <div>
            <Calendar onChange={setDate} value={date} onClickDay={handleBooking}/>
            <div>
                {showTimes ? <Time date={date}/> : null}
            </div>
            <div>
                {appointment ? <h4>You're appointment is set for {appointment}</h4> : null}
            </div>
        </div>
    )
}