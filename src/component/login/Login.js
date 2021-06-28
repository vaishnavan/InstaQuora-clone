import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
        }
        axios.post('https://myinsta5.herokuapp.com/signin', user)
        .then((res) => {
            // console.log(res.data)
            localStorage.setItem('auth', JSON.stringify(res.data))
            props.history.push('/home')
            toast.success("logged successfully")
        })
        .catch(err => {
            // toast.error(err.response.data)
            toast.error("email or password incorrect");
        })
    }
    
    return (
        <div className="container mt-5">
        <div className="register_header">
            <h3 style={{textAlign:"center"}}>Sign In</h3>
        </div>
        <form>
            <div class="mb-3">
                <label  class="form-label">Email address</label>
                <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control"  onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
            </div>
            <button onClick={handleLogin} type="submit" class="btn btn-primary">Login</button>
            <p className="mt-3">Don't have account ? <Link to="/signup">Register</Link></p>
        </form>
    </div>
    )
}

export default Login
