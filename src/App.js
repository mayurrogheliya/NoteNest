import React, { useState } from 'react';
import Home1 from './components/Home1';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


const App = () => {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home1 showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App;