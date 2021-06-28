import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Register(props) {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSignup = (e) => {
        e.preventDefault();
        const user = {
            username,
            email,
            password,
        }
        axios.post('https://myinsta5.herokuapp.com/signup', user)
        .then((res) => {
            console.log(res.data)
            props.history.push('/login')
            toast.success("Registered successfully")
        })
        .catch(err => {
            toast.error("Try again");

        })
    }
    
    return (
        <div className="container mt-5">
            <div className="register_header">
                <h3 style={{textAlign:"center"}}>Sign Up</h3>
            </div>
            <form>
                <div class="mb-3">
                    <label  class="form-label">UserName</label>
                    <input type="text" class="form-control" onChange={(e) => setUserName(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label  class="form-label">Email address</label>
                    <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control"  onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" />
                </div>
                <button onClick={handleSignup} type="submit" class="btn btn-primary">Sign Up</button>
                <p className="mt-3">Already signup? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}

export default Register
