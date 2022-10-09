import React, { useState, useEffect } from "react";
import Login from './components/Login'
import Register from './components/Register'
import Book from "./components/BookAppointment";

export default function App(){

  const [user, setUser] = useState({})
  const [message, setMessage] = useState('')
  const [appointments, setAppointments] = useState([])
 
  function handleOnClick(e, username, value) {

    const data = {
      username: {username}
    }

    if (value === "login") {

    fetch(`/login/${username}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.message){
        setMessage((data.message))
      } else {
        setUser(data.user)
        setAppointments(data.appointments)
    }})
  } 
  else if (value ==="register") {

    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      if (data.message){
        setMessage((data.error))
      } else {
        setUser(data.user)
    }})
  }
  }
  

  return (
    <div>
      {message}
     <Login onClick={handleOnClick}/>
     <Register onClick={handleOnClick} />
     <Book />
    </div>
  )
}

