import React, { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Login from './components/Login'
import Book from "./components/BookAppointment";
import Profile from "./components/Profile";
import Messages from "./components/Messages";


export default function App(){

  const [username, setUsername] = useState('')
  const [newaccount, setNewAccount] = useState('')
  const [user, setUser] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [message, setMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [appointments, setAppointments] = useState([])

  function onRegister(e) {
    setNewAccount(e.target.value)
  }

  function hideModal(){
    setIsOpen(false)
  }

  function handleOnChange(e) {
    setUsername(e.target.value)
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

  function handleLogOut(){

    fetch('/logout')
    .then(res => res.json)
    .then(data => {
      setUser('')
      setLoggedIn(false)
      setUsername('')
    })

  }
  
  return (
    <Container className="main">
       <Messages message={message} isOpen={isOpen} hideModal={hideModal}/>
       <Row className="main">
      {user ? <Profile user={user} appointments={appointments} logout={handleLogOut} /> : <Login onChange={handleOnChange} onRegister={onRegister} newaccount={newaccount} username={username} onClick={handleOnClick}/>}
      {loggedIn ? <Book loggedIn={user}/> : null }
      </Row>
    </Container>
  )
}

