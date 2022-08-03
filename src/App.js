import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import TextForm from './components/TextForm';

function App() {
  const [alert, setAlert] = useState(null);
  const handleAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1000);
  }
  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#3F4E4F';
      handleAlert("Dark Mode has been enabled!", "success");
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      handleAlert("Light Mode has been enabled!", "success");
    }
  }
  return (
    <>
    <Router>
      <Navbar title="TextUtils" aboutText="About TextUtils" changeMode={mode} toggleMode={toggleMode} modeText={mode==='light'?"Enable DarkMode":"Disable DarkMode"}/>
      <Alert alert={alert}/>
      <div className="container my-3">
        <Routes>
          <Route exact path="/about" element={<About changeMode={mode}/>} />
          <Route exact path="/" element={<TextForm heading="Enter below the text to analyze" changeMode={mode} handleAlert={handleAlert}/>} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
