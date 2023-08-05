
import { Route, Routes, useLocation } from 'react-router-dom';
import Landing from './views/landingPage/Landing';
import Home from './views/HomePage/Home';
import './App.css'
import NavBar from './components/Nav/Nav';
import Detail from './views/DetailPage/Detail';
import Form from './views/FormPage/Form';

function App() {

const location = useLocation();

  return (
    <div>
      {location.pathname !== "/"  &&   <NavBar/>}

      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/home/:id" element={<Detail props />} />
        <Route exact path="/activities" element={<Form/>} />
      </Routes>
    </div>

  )
}

export default App
