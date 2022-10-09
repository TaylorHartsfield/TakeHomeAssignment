import { useEffect, useState } from "react"
import {format} from 'date-fns';

export default function Time({date}){

    const [available, setAvailable] = useState([])
    const [bookedTime, setBookedTime] = useState(null)
    const [booked, setBooked] = useState(false)

    useEffect(() => {
        const new_date = format(date, 'yyyyMMdd')
        console.log(new_date)
        fetch(`/api/available/${new_date}`)
        .then((res) => res.json())
        .then((available)=>{
            setAvailable(available.times)
        })
    })
    function handleOnClick(e) {
        setBooked(true)
        setBookedTime(e.target.innerText)
    }

    return(
        <div className="times">
            {available.map(time => {
                return(
                    <div>
                        <button onClick={handleOnClick}>{time}</button>
                    </div>
                )
            })}
            <div className="bookMessage">
                {booked ? `Your appointment is set for ${bookedTime} on ${date.toDateString()}` : null}
            </div>

        </div>
    )

}