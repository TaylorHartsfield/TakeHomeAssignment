import {useState} from "react";

export default function Login({onClick}){

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
            <h3>Login</h3>
            <input 
            type="text" 
            placeholder="Enter Username..." 
            name="username" 
            value={username}
            onChange={handleOnChange}/>
            <button 
            onClick={onClickWrapper}>Enter</button>
        </div>
    )
}