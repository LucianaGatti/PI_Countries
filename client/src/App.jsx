
import { Route, Routes, useLocation } from 'react-router-dom';
import {Detail, Form, Home, Landing} from "../src/views/index"
import './App.css'
import NavBar from './components/Nav/Nav';

function App() {

const location = useLocation();

  return (
    <div>
      {location.pathname !== "/"  &&   <NavBar/>}

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/home/:id" element={<Detail />} />
        <Route exact path="/activities" element={<Form/>} />
      </Routes>
    </div>

  )
}

export default App
