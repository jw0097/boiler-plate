import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";


function RegisterPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = function(event) {
        setEmail(event.currentTarget.value);
    }

    const onNameHandler = function(event) {
        setName(event.currentTarget.value);
    }

    const onPasswordHandler = function(event) {
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = function(event) {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = function(event){
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('Check Password.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        };

        dispatch(registerUser(body)).then(res => {
            if (res.payload.registerSuccess) navigate('/login');
            else alert('Nav Error');
        })
    }

    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <label >Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label >Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label >Password</label>
                <input type="Password" value={Password} onChange={onPasswordHandler} />
                <label >Comfirm Password</label>
                <input type="Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>Sign up</button>
            </form>
        </div>
    )
}

export default RegisterPage
