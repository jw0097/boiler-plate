import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/hello').then(res => console.log(res))
    }, [])

    const onClickHandler = function(){
        axios.get('/api/users/logout').then(res => {
            if (res.data.success) navigate('/login');
            else alert('Logout Failed.')
        })
    }

    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh', flexDirection: 'column'
        }}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>Logout</button>
        </div>
    )
}

export default LandingPage
