import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import Register from './components/Register'
import Book from "./components/BookAppointment";
import Profile from "./components/Profile";
import Messages from "./components/Messages";

export default function App(){

  const [user, setUser] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [register, setRegister] = useState(false)
  const blocked = []

  function handleToggle() {
    setRegister(!register)
  }

  function hideModal(){
    setIsOpen(false)
  }

  for (const booked of appointments){
      blocked.push(new Date(booked))
  }

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
        setMessage((data.message),
        setIsOpen(true))
      } else {
        setUser(data.user)
        setLoggedIn(true)
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
        setMessage((data.error),
        setIsOpen(true)
        )
      }
      else {
        setUser(data.user)
        setLoggedIn(true)
        setAppointments(data.appointments)
    }})
  }
  }
  
  return (
    <div>
       <Messages message={message} isOpen={isOpen} hideModal={hideModal}/>
      {user ? <Profile user={user} appointments={appointments} /> : <Login onClick={handleOnClick} toggle={handleToggle} />}
      {register ? <Register onClick={handleOnClick} /> : null}
      {loggedIn ? <Book loggedIn={user}/> : null}
    </div>
  )
}

