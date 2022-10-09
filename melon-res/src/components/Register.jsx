import {useState} from "react";

export default function Register({onClick}) {

    const [username, setUsername] = useState('')

    function handleOnChange(e){
        setUsername(e.target.value)
    }

    function onClickWrapper(e){
        const value = "register"
        onClick(e, username, value)
    }


    return (
        <div>
            <input 
            type="text" 
            value={username} 
            placeholder="Enter Username..." 
            onChange={handleOnChange}/>
            <button
            onClick={onClickWrapper}>
            Register
            </button>
        </div>
    )
}