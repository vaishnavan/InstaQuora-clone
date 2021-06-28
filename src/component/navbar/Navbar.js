import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import './navbar.css';

function Navbar(props) {
    // const [show, setShow] = useState(false)
    const [mydata, setMyData] = useState([]);
    

    useEffect(() => {
        setMyData(JSON.parse(localStorage.getItem('auth')))
    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link style={{fontSize:"1.5rem"}} className="navbar-brand" to="/home">WebshineInsta</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/addpost">Create Post</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {mydata !== null ?
                        <>
                            <h5>Logout</h5>
                        </>
                        :
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/signup">SignUp</Link>
                            </li>
                            </ul>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                            </ul>
                        </>
                        }
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
