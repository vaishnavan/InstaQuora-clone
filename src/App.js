import React from 'react'
import Register from './component/register/Register';
import Login from './component/login/Login';
import Navbar from './component/navbar/Navbar';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Producted from './component/Producted';
import Home from './component/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Addpost from './component/CreatePost/Addpost';
import Footer from './component/footer/Footer';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
          <Producted path="/home" component={Home} />
          <Producted path="/addpost" component={Addpost} />
        </Switch>
        <ToastContainer />
        <Footer />
      </Router>
    </div>
  )
}

export default App
