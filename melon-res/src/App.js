import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import Register from './components/Register'
import Book from "./components/BookAppointment";
import Profile from "./components/Profile";

export default function App(){

  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [register, setRegister] = useState(false)
 

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
        setAppointments(data.appointments)
    }})
  }
  }
  
  function handleToggle() {
    setRegister(!register)
  }

  function hideModal(){
    setIsOpen(false)
  }

  function Messages({message}){
    return (
      <Modal show={isOpen}>
        <Modal.Header closeButton onClick={hideModal}></Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    )
  }
  return (
    <div>
       <Messages message={message}/>
      {user ? <Profile user={user} appointments={appointments} /> : <Login onClick={handleOnClick} toggle={handleToggle} />}
      {register ? <Register onClick={handleOnClick} /> : null}
     <Book />
    </div>
  )
}

