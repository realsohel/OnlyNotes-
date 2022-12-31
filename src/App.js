import { useState } from 'react';
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';

function App() {
  const [mode , setmode] = useState('light');
    const [textmode , settextmode] = useState('dark');

    const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 3000);
  }


    
  
    const togglemode = ()=>{
      if(mode==='light'){
        setmode('dark');
        settextmode('light');
        document.body.style.backgroundColor='#171717';
        // console.log(mode);
      }
      else{
          setmode('light');
          settextmode('dark');
          document.body.style.backgroundColor='white';
          // console.log(mode);
        }
    }
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar mode={mode} text={textmode} togglemode={togglemode}/>
      <Alert alert={alert} showAlert={showAlert}/>
      
      <div className="container my-3">
      <Routes>
        <Route  exact path = "/home" element={<Home mode={mode} text={textmode} showAlert={showAlert}/>}/> 
        <Route  exact path = "/about" element={<About/>}/> 
        <Route  exact path = "/login" element={<Login showAlert={showAlert} mode={mode} text={textmode}/>}/> 
        <Route  exact path = "/signup" element={<SignUp showAlert={showAlert} mode={mode} text={textmode}/>}/> 
      </Routes>
      </div>

      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
