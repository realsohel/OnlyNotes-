
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

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar/>
      <div className="container my-3">
      
      <Routes>
        <Route  exact path = "/home" element={<Home/>}/> 
        <Route  exact path = "/about" element={<About/>}/> 
      </Routes>
      </div>

      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
