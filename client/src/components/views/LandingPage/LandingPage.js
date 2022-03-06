import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LandingPage() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    var cookie = document.cookie;
    var startIndexOf = cookie.indexOf('x_auth');
    var endIndexOf = cookie.indexOf(';',startIndexOf);
    if(endIndexOf == -1) endIndexOf = cookie.length; //맨끝일경우;가 없으므로 맨마지막자리를 가져온다.
    var xAuth = cookie.substring(startIndexOf+'x_auth'.length, endIndexOf);

    useEffect(() => {
        // axios.get('/api/hello').then(res => console.log(res))
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
            {user.userData && user.userData.isAuth
            ? <button onClick={onClickHandler}>Logout</button>
            : <a href="/login"><button>LogIn</button></a>}
            
        </div>
    )
}

export default LandingPage
